# 🧭 Suivi du développement - CMS Dashboard

Voici une **décomposition complète** de ce que tu vas devoir créer pour implémenter un dashboard utilisateur professionnel, modulaire, et réutilisable pour d'autres projets.

---

## 🧱 1. Pages principales (`/app`)

| Page                    | Description                                                                   |
| ----------------------- | ----------------------------------------------------------------------------- |
| `/dashboard`            | Vue d’ensemble avec les statistiques clés, résumé rapide des sites/pages      |
| `/dashboard/profile`    | Édition des informations personnelles (nom, email, mot de passe, photo)       |
| `/dashboard/sites`      | Liste des sites créés avec actions (ajout, édition, suppression, déploiement) |
| `/dashboard/sites/[id]` | Page de gestion d’un site (pages internes, statuts, etc.)                     |
| `/dashboard/billing`    | Détails des plans, paiements, changement d’abonnement                         |
| `/dashboard/settings`   | Préférences globales utilisateur (thème, notifications, etc.)                 |

---

## 🧩 2. Composants réutilisables

| Composant                | Rôle                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| `Sidebar.tsx`            | Menu latéral avec navigation et responsive                           |
| `Topbar.tsx`             | Barre du haut avec avatar, notifications, bouton logout              |
| `StatCard.tsx`           | Petit encart avec une statistique clé (nombre de sites, pages, etc.) |
| `SiteCard.tsx`           | Affichage d’un site (image/logo, titre, statut, actions)             |
| `PageCard.tsx`           | Idem pour une page individuelle                                      |
| `PlanCard.tsx`           | Cartes des différents plans disponibles                              |
| `PaymentHistoryItem.tsx` | Ligne pour l’historique des paiements                                |
| `ProfileForm.tsx`        | Formulaire de modification de profil                                 |
| `ChangePasswordForm.tsx` | Pour changer le mot de passe                                         |
| `ThemeSwitcher.tsx`      | Commutateur clair/sombre                                             |
| `SettingsForm.tsx`       | Préférences utilisateur                                              |

---

## 🧠 3. Hooks personnalisés

| Hook                 | Usage                                                         |
| -------------------- | ------------------------------------------------------------- |
| `useDashboardData()` | Fetch des stats globales (sites, pages, etc.)                 |
| `useSites()`         | Récupération, ajout, édition, suppression de sites            |
| `usePages(siteId)`   | Gestion des pages d’un site                                   |
| `useBilling()`       | Abonnement actif, plans disponibles, factures                 |
| `useSettings()`      | Lecture / écriture des préférences                            |
| `useUpload()`        | Pour uploader des logos, images de site                       |
| `useConfirmModal()`  | Hook centralisé pour les actions sensibles (ex : suppression) |

---

## 🗂️ 4. Contextes globaux

| Contexte                       | Usage                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `UserContext` ✅                | Géré                                                                                                    |
| `ThemeContext` ✅               | Géré                                                                                                    |
| `ErrorContext` ✅               | Géré (à travers `useAlert`)                                                                             |
| `DashboardContext` (optionnel) | Pour partager certaines données globales entre les sections du dashboard (filtrage, vue actuelle, etc.) |

---

## 🛠️ 5. Utilitaires / fichiers annexes

| Fichier                        | Rôle                                                  |
| ------------------------------ | ----------------------------------------------------- |
| `lib/dashboard/api.ts`         | Tous les appels liés aux données du dashboard         |
| `lib/billing/api.ts`           | Appels aux endpoints Stripe (ou simulateur si local)  |
| `lib/sites/api.ts`             | CRUD des sites                                        |
| `lib/pages/api.ts`             | CRUD des pages                                        |
| `types/dashboard.ts`           | Types pour les statistiques, plans, abonnements, etc. |
| `components/common/Modal.tsx`  | Base réutilisable de modale                           |
| `components/common/Loader.tsx` | Loader global (déjà géré ?)                           |
| `components/common/Table.tsx`  | Table responsive simple (paiements, pages, etc.)      |

---

## 🧭 Navigation de base

```tsx
// Sidebar.tsx
- Dashboard (/dashboard)
- My Sites (/dashboard/sites)
- Billing (/dashboard/billing)
- Settings (/dashboard/settings)