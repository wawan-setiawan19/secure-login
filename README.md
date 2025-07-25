# 🔐 Secure Login System with Express & Next.js

This project is a simple fullstack authentication system built with:

- **Backend**: Express.js + JWT Authentication
- **Frontend**: Next.js (App Router) + TailwindCSS

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   └── index.js
│
└── frontend/
    ├── src/
    │   └── app/
    │       ├── login/
    │       │   └── page.js
    │       ├── register/
    │       │   └── page.js
    │       └── profile/
    │           └── page.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 🚀 Getting Started

### 🛠️ Backend Setup (Express)

1. Go to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. Run the server:

   ```bash
   nodemon index.js
   ```

5. API Endpoints:

   - `POST /api/auth/register` – register a new user
   - `POST /api/auth/login` – login and receive a JWT token
   - `GET /api/auth/profile` – protected route that requires JWT

---

### 🎨 Frontend Setup (Next.js)

1. Go to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend dev server:

   ```bash
   npm run dev
   ```

4. App Routes:

   - `http://localhost:3000/register`
   - `http://localhost:3000/login`
   - `http://localhost:3000/profile` (protected route)

---

## 🔐 Auth Flow

1. **Register** – POST to `/api/auth/register`
2. **Login** – POST to `/api/auth/login`
   - Returns JWT token
   - Token saved to `localStorage`
3. **Access profile** – GET `/api/auth/profile` using Authorization header

---

## 🧪 Example Token Request

```js
const res = await fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## ✅ Features

- JWT-based Authentication
- Register, Login, and Protected Profile Page
- CORS enabled for frontend-backend communication
- Styled using TailwindCSS
- Built on Next.js App Router (not legacy Pages directory)

---

## 📌 Notes

- Ensure `.env` is created with correct `JWT_SECRET` and `PORT`
- Add `"use client"` on frontend pages using hooks (`useState`, `useRouter`, etc.)
- If using **Turbopack**, make sure `app/` structure is complete (no need for `pages/`)
- If deployed, add production domains to CORS whitelist

---

## ✨ Example `.env` File

```env
JWT_SECRET=mySecretKey
PORT=5000
```

---

## 🧼 TODO (optional improvements)

- Add persistent login using cookies
- Add logout functionality (remove token)
- Add form validation (frontend/backend)
- Hash passwords (using bcrypt)
- Connect to MongoDB or other database

---

## 📄 License

MIT License