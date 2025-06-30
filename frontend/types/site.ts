export interface Site {
  _id: string;
  title: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  collaborators: string[]; // User ID
}
