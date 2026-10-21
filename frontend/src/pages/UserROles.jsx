import React, { useMemo, useState } from 'react';

// Frontend demo: replace sample data and local actions with authenticated API calls in production.
const INITIAL_ROLES = ['System Admin', 'Warehouse Manager', 'Inventory Controller', 'Procurement Specialist', 'QA Auditor', 'Logistics Dispatcher'];
const HUBS = ['All Facilities', 'Central Distribution Hub', 'North Distribution Hub', 'South Distribution Hub', 'East Distribution Hub'];
const INITIAL_USERS = [
  { name: 'Stephanie Fernando', email: 's.fernando@stockpulse.internal', role: 'System Admin', hub: 'All Facilities', scope: 'Unrestricted Full Control (Read/Write/Delete)', detail: 'Audit trail bypass prohibited • Policy override', activity: 'Active Now', mfa: 'MFA Hardware Key', root: true },
  { name: 'Marcus Thorne', email: 'm.thorne@stockpulse.internal', role: 'Warehouse Manager', hub: 'Central Distribution Hub', scope: 'Full Inventory, Dispatch, RMA Acceptance', detail: 'PO creation up to Rs. 100k • Floor supervisor', activity: 'Active 18m ago', mfa: 'TOTP Authenticator' },
  { name: 'Amelia Perera', email: 'a.perera@stockpulse.internal', role: 'Inventory Controller', hub: 'North Distribution Hub', scope: 'Inventory adjustments and transfers', detail: 'GRN verification • Read-only purchase orders', activity: 'Active 1h ago', mfa: 'TOTP Authenticator' },
  { name: 'Nimal Silva', email: 'n.silva@stockpulse.internal', role: 'Procurement Specialist', hub: 'South Distribution Hub', scope: 'Purchase order creation and review', detail: 'Approval thresholds enforced', activity: 'Active 2h ago', mfa: 'TOTP Authenticator' },
  { name: 'Tomasz Jankowski', email: 't.jankowski@stockpulse.internal', role: 'QA Auditor', hub: 'East Distribution Hub', scope: 'QA quarantine, inspection and audit', detail: 'No stock write-off permission', activity: 'Active yesterday', mfa: 'MFA Hardware Key' },
  { name: 'Priya Fernando', email: 'p.fernando@stockpulse.internal', role: 'Logistics Dispatcher', hub: 'Central Distribution Hub', scope: 'Dispatch and route management', detail: 'Delivery operations only', activity: 'Active 3h ago', mfa: 'TOTP Authenticator' },
];
const DEFAULT_MATRIX = {
  'System Admin': ['ALL', 'ALL (Rs. Unlimited)', 'ALL', 'ALL', 'EXPORT / READ', 'FULL'],
  'Warehouse Manager': ['READ / WRITE', 'APPROVE (≤ Rs. 100K)', 'APPROVE', 'CREATE / CLOSE', 'READ', '— None —'],
  'Inventory Controller': ['ADJUST / TRANSFER', 'READ ONLY', 'RECEIVE ONLY', 'VERIFY', 'READ', '— None —'],
  'Procurement Specialist': ['READ', 'CREATE / EDIT', 'READ', 'READ', 'READ', '— None —'],
  'QA Auditor': ['QUARANTINE / FLAG', 'READ ONLY', 'REJECT / APPROVE', 'INSPECT', 'AUDIT READ / SIGN', '— None —'],
  'Logistics Dispatcher': ['READ / PICK', 'READ ONLY', 'READ', 'DISPATCH', 'READ', '— None —'],
};
const INITIAL_EVENTS = [
  { type: 'TOKEN_REFRESH_SUCCESS', time: '10:42 AM', message: 'User Stephanie Fernando refreshed SSO JWT bearer via Okta Hayleys Central proxy.', error: false },
  { type: 'ROLE_POLICY_MODIFIED', time: '09:15 AM', message: 'Adjusted PO ceiling bounds for role Procurement Specialist.', error: false },
  { type: 'PERMISSION_DENIED', time: '08:52 AM', message: 'User Tomasz Jankowski attempted unauthorized stock write off on SKU-9940.', error: true },
];
const PERMISSIONS = ['Inventory (Stock)', 'Purchase Orders', 'Returns & RMA', 'GRN Inbound', 'Audit Logs', 'User Management'];
const cx = (...values) => values.filter(Boolean).join(' ');
const money = (n) => new Intl.NumberFormat('en-LK').format(n);

export default function UserROles() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [tab, setTab] = useState('members');
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [hubFilter, setHubFilter] = useState('All Facilities');
  const [modal, setModal] = useState(null);
  const [email, setEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Warehouse Manager');
  const [customName, setCustomName] = useState('');
  const [customPermissions, setCustomPermissions] = useState([]);
  const [notice, setNotice] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [newHub, setNewHub] = useState('Central Distribution Hub');
  const [pending, setPending] = useState(2);

  const filtered = useMemo(() => users.filter(u =>
    `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase()) &&
    (roleFilter === 'All Roles' || u.role === roleFilter) &&
    (hubFilter === 'All Facilities' || u.hub === hubFilter)
  ), [users, query, roleFilter, hubFilter]);

  function addEvent(type, message, error = false) {
    setEvents(prev => [{ type, message, error, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev]);
  }
  function exportAudit() {
    const csv = [['Event', 'Time', 'Description'], ...events.map(e => [e.type, e.time, e.message])]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'hayleys-security-audit-demo.csv'; a.click();
    URL.revokeObjectURL(url);
  }
  function sendInvite(e) {
    e.preventDefault();
    if (!email.trim()) return;
    addEvent('INVITE_PREPARED_DEMO', `Demo invitation prepared for ${email} as ${inviteRole}. No email was sent.`);
    setNotice(`Demo invitation prepared for ${email}. No email was sent.`);
    setEmail(''); setModal(null);
  }
  function createRole(e) {
    e.preventDefault();
    const name = customName.trim();
    if (!name || roles.some(r => r.toLowerCase() === name.toLowerCase())) { setNotice('Enter a unique role name.'); return; }
    setRoles(prev => [...prev, name]);
    setMatrix(prev => ({ ...prev, [name]: PERMISSIONS.map(p => customPermissions.includes(p) ? 'READ' : '— None —') }));
    addEvent('CUSTOM_ROLE_CREATED_DEMO', `Custom role ${name} created in the local demo.`);
    setCustomName(''); setCustomPermissions([]); setModal(null); setNotice(`Custom role “${name}” created in this demo.`);
  }
  function saveAssignment(e) {
    e.preventDefault();
    if (!editUser) return;
    if (editUser.root && newRole !== 'System Admin') { setNotice('The root administrator role cannot be changed in this demo.'); return; }
    setUsers(prev => prev.map(u => u.email === editUser.email ? { ...u, role: newRole, hub: newHub } : u));
    addEvent('ROLE_ASSIGNMENT_CHANGED_DEMO', `Updated ${editUser.name}: ${newRole} at ${newHub}.`);
    setModal(null); setNotice('Demo role assignment updated.');
  }
  const field = 'w-full rounded-xl border border-emerald-100 bg-[#effcf4] px-4 py-3 text-[#10271e] outline-none focus:border-emerald-500';
  const btn = 'rounded-xl border border-emerald-100 bg-white px-4 py-3 font-semibold text-[#064c34] hover:bg-emerald-50';
  const primary = 'rounded-xl bg-[#005b3d] px-5 py-3 font-semibold text-white hover:bg-[#007c55]';
  const card = 'rounded-2xl border border-[#d5eadf] bg-white shadow-sm';

  return (
    <div className="min-h-screen bg-[#f3faf6] px-4 pb-4 pt-24 text-[#0b251c] sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-[#4e786a]">SECURITY &amp; GOVERNANCE <span className="mx-2">/</span> <span className="text-[#005c40]">ACCESS MATRIX</span></p>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">User Roles &amp; Permissions</h1>
            <p className="mt-2 max-w-[650px] text-lg leading-relaxed text-[#376b5b]">Manage warehouse staff roles, access privileges, security policies, and team assignments across Hayleys distribution hubs.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2 lg:w-[235px] lg:flex-col">
            <button className={btn} onClick={() => setModal('audit')}>◴ &nbsp; Security Audit Trail</button>
            <button className={btn} onClick={() => setModal('invite')}>♙ &nbsp; Invite User</button>
            <button className={primary} onClick={() => setModal('create')}>♧ &nbsp; Create Custom Role</button>
          </div>
        </div>
        {notice && <div role="status" className="mb-5 flex justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss notification">✕</button></div>}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className={cx(card, 'p-6')}><div className="flex justify-between"><div><p className="text-sm font-bold tracking-wide text-[#567e70]">TOTAL ACTIVE USERS</p><p className="mt-3 text-4xl font-extrabold">28 <span className="text-base font-normal text-slate-500">Members</span></p></div><span className="rounded-xl bg-emerald-50 p-4 text-2xl">♧</span></div><div className="mt-8 flex justify-between text-sm text-emerald-700"><b>▦ &nbsp; 4 Global Facilities</b><span className="rounded-full bg-emerald-50 px-3 py-1">+3 this month</span></div></div>
          <div className={cx(card, 'p-6')}><div className="flex justify-between"><div><p className="text-sm font-bold tracking-wide text-[#567e70]">DEFINED SECURITY ROLES</p><p className="mt-3 text-4xl font-extrabold">{roles.length} <span className="text-base font-normal text-slate-500">Configured</span></p></div><span className="rounded-xl bg-emerald-50 p-4 text-2xl">♢</span></div><div className="mt-8 flex justify-between text-sm text-slate-500"><span>5 Standard • {Math.max(1, roles.length - 5)} Custom</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">RBAC v3.4</span></div></div>
          <div className={cx(card, 'p-6')}><div className="flex justify-between"><div><p className="text-sm font-bold tracking-wide text-[#567e70]">2FA ENFORCEMENT</p><p className="mt-3 text-4xl font-extrabold text-emerald-700">100% <span className="text-base font-normal">Compliant</span></p></div><span className="rounded-xl bg-emerald-50 p-4 text-2xl">♙</span></div><div className="mt-8 flex justify-between text-sm"><span>🟢 FIDO2 / TOTP Mandate</span><span className="text-[#567e70]">Zero Bypass</span></div></div>
          <div className={cx(card, 'p-6')}><div className="flex justify-between"><div><p className="text-sm font-bold tracking-wide text-[#567e70]">PENDING APPROVALS</p><p className="mt-3 text-4xl font-extrabold text-red-600">{pending} <span className="text-base font-normal text-slate-500">Requests</span></p></div><span className="rounded-xl bg-red-50 p-4 text-2xl">♧</span></div><div className="mt-8 flex justify-between gap-3 text-sm"><span className="text-slate-500">Elevated PO Limit &amp; QA Admin</span><button onClick={() => setModal('approvals')} className="shrink-0 rounded-full bg-red-50 px-3 py-1 font-semibold text-red-700">Review Queue</button></div></div>
        </div>
        <div className={cx(card, 'my-6 flex flex-col gap-3 p-2 lg:flex-row lg:items-center')}>
          <button onClick={() => setTab('members')} className={cx('flex-1 rounded-xl px-4 py-4 font-semibold', tab === 'members' ? 'bg-[#005b3d] text-white' : 'text-[#345d50] hover:bg-emerald-50')}>♧ &nbsp; Team Members &amp; Role Assignments <span className="ml-2 rounded-full bg-white/20 px-2 text-sm">{users.length}</span></button>
          <button onClick={() => setTab('matrix')} className={cx('flex-1 rounded-xl px-4 py-4 font-semibold', tab === 'matrix' ? 'bg-[#005b3d] text-white' : 'text-[#345d50] hover:bg-emerald-50')}>▦ &nbsp; Role Permission Matrix <span className="ml-2 rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800">Interactive</span></button>
          <div className="px-3 text-xs text-[#527d6c]">RBAC Policy: <b className="ml-2 inline-block rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-[#005b3d]">Strict Least Privilege (v4.1)</b></div>
        </div>
        {tab === 'members' ? <>
          <div className={cx(card, 'mb-5 grid grid-cols-1 items-center gap-3 p-5 md:grid-cols-[1.3fr_1fr_1fr_auto]')}>
            <input aria-label="Filter members" className={field} placeholder="⌕  Filter by name, email, or role" value={query} onChange={e => setQuery(e.target.value)} />
            <label className="flex items-center gap-2 text-sm font-semibold text-[#527d6c]">Role: <select className={field} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}><option>All Roles</option>{roles.map(r => <option key={r}>{r}</option>)}</select></label>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#527d6c]">Hub: <select className={field} value={hubFilter} onChange={e => setHubFilter(e.target.value)}>{HUBS.map(h => <option key={h}>{h}</option>)}</select></label>
            <button className={btn} onClick={() => { setQuery(''); setRoleFilter('All Roles'); setHubFilter('All Facilities'); }}>Reset</button>
          </div>
          <div className={cx(card, 'overflow-x-auto')}><table className="w-full min-w-[1020px] text-left text-sm"><thead className="bg-[#effcf4] text-xs font-bold tracking-wide text-[#325f51]"><tr>{['USER PROFILE', 'ASSIGNED ROLE', 'FACILITY / HUB', 'ACCESS SCOPE SUMMARY', 'SECURITY & ACTIVITY', 'ACTIONS'].map(h => <th key={h} className="px-5 py-5">{h}</th>)}</tr></thead><tbody>{filtered.map(u => <tr key={u.email} className="border-t border-[#e1eee7] align-middle"><td className="px-5 py-6"><div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-lg font-bold text-emerald-700">{u.name.split(' ').map(n => n[0]).join('')}</div><div><div className="font-bold">{u.name} {u.root && <span className="rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-800">ROOT</span>}</div><div className="mt-1 text-xs text-[#527d6c]">{u.email}</div></div></div></td><td className="px-5"><span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 font-semibold text-[#00623e]">♙ &nbsp; {u.role}</span></td><td className="px-5">♧ &nbsp; {u.hub === 'All Facilities' ? 'All Facilities (Global)' : u.hub}</td><td className="max-w-[250px] px-5 py-5"><div className="font-medium">{u.scope}</div><div className="mt-1 text-xs leading-relaxed text-[#527d6c]">{u.detail}</div></td><td className="px-5"><div className="text-emerald-700">● {u.activity}</div><div className="mt-2 text-xs text-[#527d6c]">✓ {u.mfa}</div></td><td className="px-5"><button title="Edit role assignment" className={btn} onClick={() => { setEditUser(u); setNewRole(u.role); setNewHub(u.hub); setModal('edit'); }}>✎ Edit</button></td></tr>)}{filtered.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-500">No matching team members.</td></tr>}</tbody></table></div>
        </> : <div className={cx(card, 'p-5 sm:p-7')}><h2 className="text-2xl font-bold">Role-Based Access Control (RBAC) Entitlement Matrix</h2><p className="mt-1 text-[#527d6c]">Global operational privilege mapping for system modules, automated transactions, and approval chains across Hayleys facilities.</p><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[860px] text-left text-sm"><thead className="bg-[#effcf4] text-xs font-bold text-[#325f51]"><tr><th className="px-4 py-5">SECURITY ROLE</th>{PERMISSIONS.map(p => <th className="px-3 py-5 text-center" key={p}>{p.toUpperCase()}</th>)}</tr></thead><tbody>{roles.map(r => <tr className="border-t border-[#e1eee7]" key={r}><th className="px-4 py-6 font-semibold">{r}</th>{(matrix[r] || []).map((permission, i) => <td key={i} className="px-3 py-5 text-center"><span className={cx('inline-block rounded px-2 py-1 font-semibold', permission.includes('None') ? 'text-slate-400' : permission.includes('QUARANTINE') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')}>{permission}</span></td>)}</tr>)}</tbody></table></div><p className="mt-5 text-xs text-[#527d6c]">Reference matrix only. Actual access must be enforced on the server, not through this UI.</p></div>}
      </div>
      {modal && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001d13]/55 p-4" onMouseDown={e => { if (e.target === e.currentTarget) setModal(null); }}>
        {modal === 'audit' ? <div role="dialog" aria-modal="true" aria-label="Security audit trail" className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-emerald-100 bg-[#effcf4] px-5 py-6"><h2 className="text-xl font-bold">◴ &nbsp; Hayleys IAM Security Audit Trail</h2><button aria-label="Close" onClick={() => setModal(null)}>✕</button></div><div className="flex-1 space-y-4 overflow-y-auto p-5">{events.map((ev, i) => <div key={i} className={cx('rounded-xl border p-4', ev.error ? 'border-red-200 bg-red-50' : 'border-emerald-100 bg-emerald-50')}><div className="flex justify-between gap-3 text-sm"><b className={ev.error ? 'text-red-700' : 'text-emerald-700'}>{ev.type}</b><span className="shrink-0 text-slate-500">{ev.time}</span></div><p className="mt-2 text-sm leading-relaxed">{ev.message}</p></div>)}</div><div className="flex justify-end border-t bg-[#effcf4] p-5"><button className={primary} onClick={exportAudit}>Export Audit Log</button></div></div> :
        <div role="dialog" aria-modal="true" aria-label={modal === 'invite' ? 'Invite warehouse personnel' : modal === 'create' ? 'Create custom role' : modal === 'edit' ? 'Edit user role' : 'Review approvals'} className="w-full max-w-[560px] rounded-2xl bg-white p-7 shadow-2xl"><div className="mb-6 flex items-center justify-between border-b border-emerald-100 pb-5"><h2 className="text-xl font-bold">{modal === 'invite' ? 'Invite Warehouse Personnel' : modal === 'create' ? 'Create Custom Security Role' : modal === 'edit' ? 'Edit Role Assignment' : 'Pending Approval Requests'}</h2><button onClick={() => setModal(null)} aria-label="Close">✕</button></div>
          {modal === 'invite' && <form onSubmit={sendInvite} className="space-y-5"><label className="block text-xs font-bold text-[#527d6c]">WORK EMAIL ADDRESS<input required type="email" className={cx(field, 'mt-2')} placeholder="colleague@hayleys.com" value={email} onChange={e => setEmail(e.target.value)} /></label><label className="block text-xs font-bold text-[#527d6c]">TARGET SECURITY ROLE<select className={cx(field, 'mt-2')} value={inviteRole} onChange={e => setInviteRole(e.target.value)}>{roles.map(r => <option key={r}>{r}</option>)}</select></label><p className="text-xs text-slate-500">Demo only: Send Invite records a local event but does not send email.</p><div className="flex justify-end gap-2 border-t pt-4"><button type="button" className={btn} onClick={() => setModal(null)}>Cancel</button><button type="submit" className={primary}>Send Invite</button></div></form>}
          {modal === 'create' && <form onSubmit={createRole} className="space-y-5"><label className="block text-xs font-bold text-[#527d6c]">ROLE NAME<input required className={cx(field, 'mt-2')} placeholder="e.g. Regional Operations Lead" value={customName} onChange={e => setCustomName(e.target.value)} /></label><div><p className="mb-3 text-xs font-bold text-[#527d6c]">ALLOWED MODULES (DEMO READ ACCESS)</p><div className="grid gap-3 sm:grid-cols-2">{PERMISSIONS.map(p => <label key={p} className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm"><input type="checkbox" checked={customPermissions.includes(p)} onChange={e => setCustomPermissions(prev => e.target.checked ? [...prev, p] : prev.filter(x => x !== p))} />{p}</label>)}</div></div><div className="flex justify-end gap-2 border-t pt-4"><button type="button" className={btn} onClick={() => setModal(null)}>Cancel</button><button type="submit" className={primary}>Create Role</button></div></form>}
          {modal === 'edit' && <form onSubmit={saveAssignment} className="space-y-5"><p className="font-semibold">{editUser?.name}</p><label className="block text-xs font-bold text-[#527d6c]">ASSIGNED ROLE<select className={cx(field, 'mt-2')} value={newRole} onChange={e => setNewRole(e.target.value)} disabled={editUser?.root}>{roles.map(r => <option key={r}>{r}</option>)}</select></label><label className="block text-xs font-bold text-[#527d6c]">FACILITY / HUB<select className={cx(field, 'mt-2')} value={newHub} onChange={e => setNewHub(e.target.value)}>{HUBS.map(h => <option key={h}>{h}</option>)}</select></label><div className="flex justify-end gap-2 border-t pt-4"><button type="button" className={btn} onClick={() => setModal(null)}>Cancel</button><button type="submit" className={primary}>Save Changes</button></div></form>}
          {modal === 'approvals' && <div className="space-y-4"><p className="text-sm text-slate-500">Demo requests — approvals do not change backend permissions.</p>{['Elevated Purchase Order Limit', 'QA Administrator Access'].slice(0, pending).map(item => <div key={item} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"><b>{item}</b><div className="flex gap-2"><button className={btn} onClick={() => { setPending(p => Math.max(0, p - 1)); addEvent('APPROVAL_REJECTED_DEMO', `${item} rejected in demo.`); setModal(null); }}>Reject</button><button className={primary} onClick={() => { setPending(p => Math.max(0, p - 1)); addEvent('APPROVAL_ACCEPTED_DEMO', `${item} approved in demo.`); setModal(null); }}>Approve</button></div></div>)}{pending === 0 && <p>No pending requests.</p>}</div>}
        </div>}
      </div>}
    </div>
  );
}
