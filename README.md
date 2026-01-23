# 🔐 Auth REST API (JWT + Refresh Token + RBAC)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%7C%20Local-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Security](https://img.shields.io/badge/Security-Refresh%20Tokens-red)

A **production-grade authentication & authorization API** built with **Node.js, Express, and MongoDB**, implementing **JWT access tokens, refresh tokens, and role-based access control (RBAC)**.

---

## ✨ Features

- Secure **user signup & login**
- **JWT access tokens** (short-lived)
- **Refresh tokens** stored hashed in DB
- Refresh tokens sent via **httpOnly cookies**
- `/refresh` endpoint for session continuation
- Proper **logout** with refresh token revocation
- **Role-Based Access Control (RBAC)** (`student`, `teacher`)
- Clean **controller–service architecture**

---

## 🔁 Auth Flow (High Level)


---

## 🛡️ Authorization (RBAC)

| Route | Access |
|------|-------|
| `/studentdetails` | Student |
| `/teacherdetails` | Teacher |
| `/courses` | Student & Teacher |

---

## 🧠 Security Highlights

- Passwords hashed with **bcrypt**
- Refresh tokens **never stored in plaintext**
- Access tokens are **stateless & short-lived**
- Logout invalidates **refresh tokens**, not access tokens
- RBAC is **stateless** (no DB lookup per request)

---


---

## 🚀 API Endpoints

### Auth
- `POST /api/signup`
- `POST /api/login`
- `POST /api/refresh`
- `POST /api/logout`

### Protected
- `GET /api/studentdetails`
- `GET /api/teacherdetails`
- `GET /api/courses`

