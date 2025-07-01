export type AlertType = "success" | "error" | "info" | "warning";

export type AlertOptions = {
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  actions?: {
    label: string;
    onClick?: () => void;
  }[];
};

export type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
};
