"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Area, Point } from "react-easy-crop";
import Button from "./Button";

interface ProfileImageUploaderProps {
  name: string;
  onChange: (file: File | null) => void;
  defaultImage?: string;
  label?: string;
  editable?: boolean;
}

const DEFAULT_AVATAR = "/default-avatar.png";

const EXPRESS_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL || "https://api.m3ntha.ch"
    : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5000";

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  name,
  onChange,
  defaultImage,
  editable = true,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const previewSrc = croppedPreview
    ? croppedPreview
    : defaultImage
    ? `${EXPRESS_BASE_URL}${defaultImage}`
    : DEFAULT_AVATAR;

  const onCropComplete = useCallback((_area: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 80);
    const previewUrl = URL.createObjectURL(blob);
    const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });

    setCroppedPreview(previewUrl);
    setIsCropping(false);
    onChange(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full text-[var(--color-text)]"
    >


      {/* Image preview */}
      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-[var(--color-border)]">
        <Image
          src={previewSrc}
          alt="Profile preview"
          width={80}
          height={80}
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Upload input only if editable */}
      {editable && (
        <>
          <label
            htmlFor={name}
            className="mt-3 block w-full cursor-pointer rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-input-bg)] p-3 text-center text-sm transition hover:bg-[var(--color-input-bg)]/80"
          >
            Click to Upload
          </label>
          <input
            type="file"
            id={name}
            name={name}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}

      {/* Crop Modal */}
      {isCropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-xl bg-[var(--color-bg)] p-4 shadow-lg">
            <div className="relative aspect-square w-full rounded">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsCropping(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" onClick={handleCrop}>
                Crop & Use
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileImageUploader;
