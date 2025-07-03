export type SiteStatus = "draft" | "published" | "archived";

export interface Site {
  _id: string;
  name: string;
  domain: string;
  status: SiteStatus;
  user: string; // ID utilisateur propriétaire
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
