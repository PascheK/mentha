# Mentha CMS

## 🧩 Project Overview
Mentha is a full-stack CMS project with an Express/MongoDB backend and a Next.js dashboard frontend. It aims to provide a simple site and page management solution with user authentication and a modern UI.

## ⚙️ Tech Stack
- **Frontend:** Next.js 15 (React 19, TypeScript, Tailwind CSS)
- **Backend:** Express.js, TypeScript, Mongoose, JWT, Nodemailer
- **Database:** MongoDB
- **Tools:** Docker, Docker Compose, ESLint, Prettier

## 🚀 Getting Started
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd mentha
   ```
2. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Environment variables**
   - Copy `.env.example` (if provided) or create `.env` files in `backend/` and `frontend/` with the required variables.
   - Example variables include `MONGO_URI`, `JWT_SECRET`, `MAIL_*` for the backend and `NEXT_PUBLIC_API_URL` for the frontend.
4. **Run locally**
   ```bash
   # In one terminal
   cd backend && npm run dev

   # In another terminal
   cd frontend && npm run dev
   ```
   The frontend will be available at `http://localhost:3000` and the API at `http://localhost:5000`.

## 🧪 Testing
No automated tests are provided yet.

## 🛡️ Security Notes
Sensitive files such as `.env` and `.env.*` are listed in `.gitignore` to prevent accidental commits:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
/frontend/.env
/frontend/.env.local
/backend/.env
/backend/.env.local
```
Ensure these files remain private and never commit them.

## 🗂️ Project Structure
```
backend/   Express API (TypeScript)
frontend/  Next.js dashboard
mentha/    Docker compose and nginx files
```

## 🧠 Features
- User registration, login and JWT authentication
- Email verification via Nodemailer
- Dashboard layout with sidebar and topbar
- Theme management (light/dark)
- Global contexts for user, theme, loader, alerts and errors
- Basic site and page CRUD endpoints
- Image upload endpoint

## 📦 Deployment
Both the frontend and backend include Dockerfiles. A `docker-compose.yml` is provided in `mentha/` to run the stack together (backend, frontend and optional nginx).

## 🤝 ToDo
The `TODO.md` file lists outstanding tasks, including dashboard pages, main components, custom hooks and Docker deployment steps. Key next steps are:
- Implement dashboard pages (`/dashboard`, `/dashboard/profile`, ...)
- Create main components like `StatCard`, `SiteCard`, `ProfileForm`
- Implement hooks `useSites()` and `useDashboardData()`

## 📄 License
The backend package.json specifies the **MIT License**.
