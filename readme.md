<h1 align="center">✨ Connectify - Fullstack Chat & Video Calling App ✨</h1>

<p align="center">
A modern fullstack social platform with real-time chat, secure video calls, and email verification — built using MERN, Stream, and Resend.
</p>

---

## 🚀 Features

- 🌐 Real-time 1-on-1 Messaging (Typing Indicators, Reactions)
- 📹 Video Calling with Screen Sharing (Powered by Stream)
- ✉️ **Email Verification & Forgot Passwrod, Password Reset using Resend**
- 🔐 JWT Authentication with Secure Cookies
- 👤 User Onboarding with Avatar & Theme Setup
- 🧑‍🤝‍🧑 Friends System (Your Friends Page)
- 🔔 Notifications Page
- 🎨 32 Beautiful UI Themes (Light/Dark + Variants)
- 🌍 Fully Responsive Design + Mobile Hamburger Menu
- 🛡️ Protected Routes (Frontend & Backend)
- 💾 Persistent Auth using React Query + Zustand
- ⚠️ Robust Error Handling

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- React.js (Vite)
- Tailwind CSS + DaisyUI
- Zustand (Global State)
- TanStack React Query
- Stream Chat & Stream Video SDK
- React Router

### 🔙 Backend

- Node.js + Express.js
- MongoDB + Mongoose
- **Stream API** for messaging/video tokens
- **Resend** for transactional emails
- JWT + Cookie Parser
- CORS, dotenv, Express middlewares

---

## 🧪 Environment Variables

### Backend (`/backend/.env`)

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
RESEND_DOMAIN=your_verified_domain
NODE_ENV=production
```

Frontend (/frontend/.env)

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

🌐 Deployment
✅ Fully deployable on Render
🗂️ Supports both frontend + backend deployment
📨 Emails work via Resend API

👤 Author
Abhishek Kumar

🌐 LinkedIn(<www.linkedin.com/in/abhishek-kumar-a391a422a>)

📧 <abhishekkumar617559@gmail.com>
