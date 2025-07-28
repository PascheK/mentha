"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Area, Point } from "react-easy-crop";
import Button from "./Button";

interface ProfileImageUploaderProps {
  label?: string;
  name: string;
  onChange: (file: File | null) => void;
  defaultImage?: string;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  label = "Upload Profile Image",
  name,
  onChange,
  defaultImage,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedPreview, setCroppedPreview] = useState<string | null>(
    defaultImage || null,
  );

  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);

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
      className="w-full"
    >
      {label && (
        <label className="mb-1 block text-sm font-medium text-text">
          {label}
        </label>
      )}

      <div className="mb-4">
        {croppedPreview ? (
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
            <Image
              src={croppedPreview}
              alt="Profile preview"
              width={80}
              height={80}
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
            <Image
              src="/default-avatar.png"
              alt="Profile preview"
              width={80}
              height={80}
              unoptimized
              className="object-cover"
            />
          </div>
        )}
      </div>

      <label
        htmlFor={name}
        className="block w-full cursor-pointer rounded-lg border-2 border-dashed border-border bg-input-bg p-3 text-center text-text transition hover:bg-input-bg/80"
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

      {isCropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-xl bg-bg/80 p-4">
            <div className="relative aspect-square w-full rounded bg-bg/80">
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
                Previous
              </Button>
              <Button type="submit" variant="primary" onClick={handleCrop}>
                Crop
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileImageUploader;
