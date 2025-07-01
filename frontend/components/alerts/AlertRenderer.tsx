import React from "react";
import { AlertOptions } from "@/types/alerts";
import {
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  X,
} from "lucide-react";

type Props = {
  alert: AlertOptions | null;
  onClose: () => void;
};

const colorMap = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
};

const iconMap = {
  success: <CheckCircle className="w-6 h-6 animate-pulse text-white" />,
  error: <XCircle className="w-6 h-6 animate-pulse text-white" />,
  info: <Info className="w-6 h-6 animate-pulse text-white" />,
  warning: <AlertTriangle className="w-6 h-6 animate-pulse text-white" />,
};

const positionMap = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

const AlertRenderer: React.FC<Props> = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <div
      className={`fixed z-50 ${positionMap[alert.position || "top-right"]} m-4 animate-slide-down`}
    >
      <div
        className={`p-4 rounded-xl shadow-lg text-white flex items-start gap-4 ${colorMap[alert.type]}`}
      >
        <div className="mt-1">{iconMap[alert.type]}</div>

        <div className="flex-1">
          <h3 className="font-bold">{alert.title}</h3>
          <p className="text-sm">{alert.message}</p>
          {alert.actions && (
            <div className="mt-2 flex gap-2">
              {alert.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    action.onClick?.();
                    onClose();
                  }}
                  className="underline text-white/90 text-sm"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={onClose}>
          <X className="w-4 h-4 opacity-80 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};

export default AlertRenderer;
