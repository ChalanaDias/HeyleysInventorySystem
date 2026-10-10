import './Header.css'

function Header() {
  return (
    /* The header is positioned beside the fixed sidebar, matching the dashboard prototype. */
    <header className="app-header">
      {/* Global search field; its label supplies an accessible name in addition to the placeholder.
          Search submission is not connected to app data yet. */}
      <label className="header-search">
        {/* Decorative search icon; the input itself remains the interactive control. */}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m16 16 4.2 4.2" />
        </svg>
        <input type="search" placeholder="Search Hayleys IMS" aria-label="Search Hayleys IMS" />
      </label>

      <div className="header-actions">
        {/* The badge communicates the unread count visually and through the button's accessible name.
            Its count is sample UI until a notifications source is connected. */}
        <button
          className="header-icon-button notification-button"
          type="button"
          aria-label="Notifications, 3 unread"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
          </svg>
          <span className="notification-count" aria-hidden="true">3</span>
        </button>

        {/* Account identity area. Replace these prototype values with the signed-in user's data
            when profile and role data are connected to the User Roles workflow. */}
        <div className="header-user">
          <div className="header-user-details">
            <strong>Stephanie Fernando</strong>
            <span>System Admin</span>
            <small>All Facilities (Global)</small>
          </div>

          {/* Neutral placeholder keeps the profile-photo position visible before a user uploads
              an image. When an image URL is available, render the image here in the same frame. */}
          <span className="header-avatar-placeholder" role="img" aria-label="User profile image placeholder">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20a7 7 0 0 1 14 0" />
            </svg>
          </span>

          {/* Sign-out affordance shown beside the account details on larger screens.
              Connect an authentication action here when sign-out behavior is implemented. */}
          <button className="header-icon-button sign-out-button" type="button" aria-label="Sign out">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 17l5-5-5-5M15 12H3M13 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
