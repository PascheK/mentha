import React from "react";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-border">
      <span className="font-medium text-placeholder w-1/3">{label}</span>
      <span className="text-text text-right w-2/3 break-words">{value || "—"}</span>
    </div>
  );
};

export default InfoRow;
