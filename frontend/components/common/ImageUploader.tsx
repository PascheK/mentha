"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ImageUploaderProps {
  label?: string;
  name: string;
  onChange: (file: File | null) => void;
  defaultImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = "Upload Image",
  name,
  onChange,
  defaultImage,
}) => {
  const { theme } = useTheme();
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium text-sm">{label}</label>}

      <label
        htmlFor={name}
        className={`block w-full cursor-pointer border-2 border-dashed rounded-lg p-4 text-center transition duration-200 ease-in-out ${
          theme === "dark"
            ? "border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
        }`}
      >
        {preview ? (
          <div className="flex flex-col items-center space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
            <p className="text-sm">Change Image</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 16l4-4a4 4 0 015.656 0L21 20M3 16v6h6M16 3h5v5"
              />
            </svg>
            <p className="text-sm">Click to upload</p>
          </div>
        )}
      </label>

      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
