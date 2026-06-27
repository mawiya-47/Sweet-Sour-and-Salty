<div align="center">

# 🍬🍋🧂 Sweet, Sour & Salty

### A full-stack food ordering web app — order your cravings, one bite at a time.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PocketBase](https://img.shields.io/badge/PocketBase-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=black)

</div>

---

## 📖 About

**Sweet, Sour & Salty** is a modern food ordering platform where customers can browse the menu, add items to cart, and place orders — while admins manage everything from a dedicated dashboard.

Built with a lightweight but powerful stack: **React + Vite** on the frontend and **PocketBase** as the backend — no heavy server setup needed.

---

## ✨ Features

### 👤 Customer Side
- 🏠 **Home Page** — Eye-catching landing page
- 📋 **Menu Page** — Browse all available food items
- 🛒 **Shopping Cart** — Add, remove & manage items
- 💳 **Checkout Page** — Place your order seamlessly
- 🔐 **Auth** — Sign up & Login with secure sessions
- 👤 **Profile Page** — View and manage your account

### 🛠️ Admin Side
- 🔑 **Admin Login** — Separate secure admin portal
- 📊 **Admin Dashboard** — Manage menu items & orders

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | PocketBase |
| State Management | React Context API |
| UI Components | shadcn/ui (Radix UI) |
| Notifications | Custom Toast System |

---

## 📁 Project Structure

```
Sweet-Sour-and-Salty/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   │   └── ui/          # shadcn/ui components
│       │   ├── contexts/
│       │   │   ├── AuthContext.jsx
│       │   │   └── CartContext.jsx
│       │   ├── hooks/
│       │   │   ├── use-mobile.jsx
│       │   │   └── use-toast.js
│       │   ├── lib/
│       │   │   ├── pocketbaseClient.js
│       │   │   └── utils.js
│       │   └── pages/
│       │       ├── homepage.jsx
│       │       ├── menupage.jsx
│       │       ├── shoppingcartpage.jsx
│       │       ├── checkoutpage.jsx
│       │       ├── loginpage.jsx
│       │       ├── signuppage.jsx
│       │       ├── profilepage.jsx
│       │       ├── Admindashboard.jsx
│       │       └── Adminloginpage.jsx
│       ├── vite.config.js
│       └── tailwind.config.js
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- PocketBase (included as `.zip`)

### 1. Clone the repo
```bash
git clone https://github.com/mawiya-47/Sweet-Sour-and-Salty.git
cd Sweet-Sour-and-Salty
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start PocketBase backend
```bash
# Extract the zip and run:
./pocketbase serve
```
PocketBase will run at `http://127.0.0.1:8090`

### 4. Start the frontend
```bash
cd apps/web
npm run dev
```
App will be live at `http://localhost:5173` 🎉

---

## 🔧 Environment Setup

Create a `.env` file in `apps/web/`:
```env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

---

## 👨‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **GPL-3.0 License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/mawiya-47">mawiya-47</a>
</div>
