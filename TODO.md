# 🧭 Dashboard Project – Remaining Tasks Overview

This document outlines all remaining steps for the dashboard project, organized by category.

---

## ✅ Completed Tasks

- [x] Global Dashboard Layout (Sidebar, Topbar, responsive)
- [x] Theme management with `ThemeToggle`
- [x] User dropdown (`UserDropdown`)
- [x] Notification bell (`NotificationBell`)
- [x] UserContext with LoaderContext integration
- [x] Global Contexts (User, Theme, Error, Loader, Alert)
- [x] Backend `verifyToken` middleware working
- [x] JWT-based authentication functional

---

## 🛠️ Remaining Tasks

### 1. Dashboard Pages

| Page                      | Status | Description |
|---------------------------|--------|-------------|
| `/dashboard`              | ❌ To Do | Overview with stats |
| `/dashboard/profile`      | ❌ To Do | Profile form and avatar |
| `/dashboard/sites`        | ❌ To Do | List of user-created sites |
| `/dashboard/sites/[id]`   | ❌ To Do | Single site management |
| `/dashboard/billing`      | ❌ To Do | Subscription and payments |
| `/dashboard/settings`     | ❌ To Do | User preferences |

### 2. Main Components

| Component                 | Status | Used In |
|---------------------------|--------|---------|
| `StatCard`                | ❌ To Do | Dashboard |
| `SiteCard`                | ❌ To Do | Sites page |
| `PageCard`                | ❌ To Do | Site details |
| `PlanCard`                | ❌ To Do | Billing |
| `PaymentHistoryItem`      | ❌ To Do | Billing |
| `ProfileForm`             | ⏳ WIP  | Profile |
| `ChangePasswordForm`      | ❌ To Do | Profile |
| `SettingsForm`            | ❌ To Do | Settings |
| `Table.tsx`               | ❌ To Do | Table display |

### 3. Custom Hooks

| Hook                  | Status | Purpose |
|-----------------------|--------|---------|
| `useDashboardData()`  | ❌ To Do | Global stats |
| `useSites()`          | ❌ To Do | Site CRUD |
| `usePages(siteId)`    | ❌ To Do | Page CRUD |
| `useBilling()`        | ❌ To Do | Subscriptions |
| `useSettings()`       | ❌ To Do | Preferences |
| `useUpload()`         | ✅ Done | Upload handler |
| `useConfirmModal()`   | ✅ Done | Modal confirmation |

### 4. Backend / API

| Feature                 | Status | Notes |
|-------------------------|--------|-------|
| Site CRUD               | ❌ To Do | Via Express/Mongo |
| Page CRUD               | ❌ To Do | Via Express/Mongo |
| Billing integration     | ❌ To Do | Stripe or local mock |
| Upload handler          | ✅ Done | Avatar upload |
| JWT Authentication      | ✅ Done | Works |
| Middleware auth         | ✅ Done | `verifyToken` OK |

### 5. Docker Deployment

| Task                | Status |
|---------------------|--------|
| Dockerfile (frontend) | ❌ To Do |
| Dockerfile (backend)  | ❌ To Do |
| docker-compose        | ❌ To Do |
| Nginx reverse proxy   | ✅ Setup |

### 6. UX / UI Enhancements

| Idea                         | Status | Description |
|------------------------------|--------|-------------|
| Animations & Transitions     | 🔄 Prompt done | Professional transitions |
| Loading skeletons            | ❌ To Do | During fetch/load |
| Mobile sidebar               | ✅ Done | Smooth collapsible sidebar |
| Avatar upload                | ✅ Done | In progress and working |

---

## 📌 Next Steps

You can start with:

- `/dashboard/profile` with `ProfileForm` & `ChangePasswordForm`
- `/dashboard` with `StatCard` components
- Write `useSites()` and `useDashboardData()`