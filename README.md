# Next.js Secure Product Management App

A secure web application built with **Next.js** (App Router), **Express.js**, and **Prisma**, allowing users to register, log in, and manage their own products (CRUD). Each user can only see and manage the products they created.

## ✨ Features

- 🔐 Authentication with JWT (Login & Protected Routes)
- 👤 Profile Page
- 📦 CRUD Product (Create, Read, Update, Delete)
- 📛 User-specific access (each user only sees their own products)
- 🎨 TailwindCSS for styling

## 📦 Tech Stack

- Frontend: [Next.js](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com)
- Backend: [Express.js](https://expressjs.com/), [Prisma](https://www.prisma.io/)
- Database: SQLite / PostgreSQL / MySQL (configurable via Prisma)
- Auth: JWT-based Authentication

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
# or
yarn
```

#### Backend

```bash
cd backend
npm install
# or
yarn
```

---

### 3. Run the development servers

#### Backend

```bash
cd backend
npx prisma migrate dev --name init
npm run dev
```

> Backend will run on: `http://localhost:5500`

#### Frontend

```bash
cd frontend
npm run dev
```

> Frontend will run on: `http://localhost:3000`

---

## 🔑 API Endpoints (Protected with JWT)

| Method | Endpoint                | Description           |
|--------|-------------------------|-----------------------|
| POST   | `/api/auth/register`    | Register new user     |
| POST   | `/api/auth/login`       | Login user            |
| GET    | `/api/auth/profile`     | Get user profile      |
| GET    | `/api/products`         | Get all user products |
| GET    | `/api/products/:id`     | Get single product    |
| POST   | `/api/products`         | Create new product    |
| PUT    | `/api/products/:id`     | Update a product      |
| DELETE | `/api/products/:id`     | Delete a product      |

> ⚠️ All product endpoints require a valid `Authorization: Bearer <token>` header.

---

## 📁 Folder Structure

```
frontend/
  └── app/
      ├── login/
      ├── profile/
      └── products/
          ├── page.tsx (list)
          ├── create/
          └── edit/[id]/
backend/
  └── src/
      ├── controllers/
      ├── repositories/
      ├── routes/
      └── middlewares/
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).