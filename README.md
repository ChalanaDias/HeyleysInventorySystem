# 📦 Hayleys Inventory Management System

### StockPulse IMS — Smart Inventory Management & AI Demand Forecasting

A web-based Inventory Management System developed for the **Hayleys Consumer Supply Chain & Distribution** environment.

The project aims to improve inventory visibility, stock monitoring, purchase order management, and demand forecasting through a centralized digital platform.

## 🎯 Project Objectives

- Centralize inventory and stock information.
- Improve warehouse and distribution operations.
- Reduce manual inventory management tasks.
- Support inventory decisions using AI-based demand forecasting.
- Provide a user-friendly interface for different system users.

## 🚀 System Modules

| Module | Description |
|---|---|
| 🔐 Login & Registration | User authentication interface and registration workflow |
| 📊 Dashboard | Inventory overview and operational statistics |
| 📦 Inventory Management | Product, SKU, and stock information |
| 🛒 POS Order Entry | Point-of-sale order management |
| 🤖 AI Forecasting | Demand forecasting and inventory planning |
| 📋 Purchase Orders | Purchase order management |
| 🔄 Returns Management | Product returns and stock adjustments |
| 👥 User Roles | Role-based user management |
| ⚙️ Settings | System configuration |

**Development note:** These modules represent the project scope. Some interfaces are under development, and backend integrations are not yet complete.

## 🛠️ Technology Stack

**Frontend**
- React.js
- JavaScript (JSX)
- Tailwind CSS
- Vite
- React Router

**Backend**
- Python-based backend (integration in progress)

**Version Control**
- Git
- GitHub

## 📁 Project Structure

```text
HayleysInventorySystem/
├── backend/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── AiForecast.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ChalanaDias/HeyleysInventorySystem.git
```

### 2. Navigate to the frontend

```bash
cd HeyleysInventorySystem/frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173/login`

## 🔐 Login Page

The Login interface includes:

- Corporate email and password fields
- Sign In and Sign Up tabs
- Password visibility toggle
- Responsive layout
- Hayleys-inspired branding
- Navigation to the Inventory interface

**Current status:** The Login page is a frontend demonstration. Real credential verification, account creation, password recovery, and protected routes require backend integration.

## 🌿 Development Workflow

This project uses Git feature branches for collaborative development.

Developers implement individual modules in separate branches and submit Pull Requests for review before merging into the main branch.

## 📌 Project Status

**Under Active Development**

Frontend components and system modules are being developed and integrated.

## 👨‍💻 Development Team

Developed as a collaborative software development project for the Hayleys Inventory Management System.

## 📄 Disclaimer

This repository is a development project. References to Hayleys, enterprise integrations, AI capabilities, and operational workflows describe the intended system design and do not imply that all functionality is currently deployed or officially integrated.
