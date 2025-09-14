# 🛍️ Shopping E-Commerce Website

A full-featured **shopping e-commerce website** built with **React.js** and **Tailwind CSS**, designed from **Figma**, and powered by modern libraries and tools for state management, data fetching, authentication, and admin management.

---

## 🚀 Features

### 👤 User Features
- 🔐 **Authentication** using JWT tokens (Sign Up, Log In, Protected Routes)
- 🛒 **Shopping Cart** – Add, update, and remove products
- 🔎 **Search & Filter** – Easily find products by name or category
- ✨ **Product Display** – Browse new arrivals, product details, and more
- 📦 **Order Management** – Place and view your orders
- 📱 **Responsive Design** with Tailwind CSS
- 🎨 **Animations** powered by AOS
- 📢 **Toast Notifications** with React-Toastify

### 🛠️ Admin Dashboard
- 📊 **Dashboard** with charts (ApexCharts & Recharts) to track products and orders
- 🗂️ **Product Management** – CRUD (Create, Read, Update, Delete) operations
- 📦 **Order Tracking** – View and manage customer orders
- 🔐 **Protected Routes** for admin features

---

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **HTTP Requests**: [Axios](https://axios-http.com/)
- **Backend (Mock API)**: [JSON Server](https://github.com/typicode/json-server)
- **UI/UX Enhancements**:
    - [React Icons](https://react-icons.github.io/react-icons/)
    - [React-Toastify](https://fkhadra.github.io/react-toastify/)
    - [AOS Animations](https://michalsnik.github.io/aos/)
- **Charts & Data Visualization**:
    - [ApexCharts](https://apexcharts.com/)
    - [Recharts](https://recharts.org/)

---

## 📸 Design

- The design was inspired and implemented based on a **Figma template**

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate into the project folder:
   ```bash
   cd your-repo-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the mock API server (JSON Server):
   ```bash
   npx json-server --watch db.json --port 3000
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Authentication

- Authentication is handled using **JWT tokens**
- Protected routes are implemented so only authenticated users can access specific pages (like Dashboard, Cart, etc)

---

## 📂 Project Structure

```
/src
  /components   # Reusable UI components
  /features     # Redux slices (auth, products, cart, etc.)
  /pages        # Page components (Home, Dashboard, Login, etc.)
  /assets       # Images, icons, animations
```

---

## 📊 Admin Dashboard Preview

- Manage Products (CRUD)
- Track Orders
- Interactive charts for analytics

---



### 🏠 Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)

### 🛒 Product Listing
![Product Listing](https://via.placeholder.com/800x400?text=Product+Listing+Screenshot)

### 📦 Cart & Checkout
![Cart](https://via.placeholder.com/800x400?text=Cart+Screenshot)

### 🛠️ Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard+Screenshot)

---

## 📌 Future Improvements

- Payment integration (Stripe / PayPal)
- Wishlist feature
- Real backend with Node.js or Django REST Framework

---

## 🙌 Acknowledgements

- Figma designers for the UI inspiration
- Open-source community for amazing libraries


