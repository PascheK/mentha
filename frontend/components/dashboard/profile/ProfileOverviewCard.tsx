"use client";

import { useUser } from "@/contexts/UserContext";
import UserAvatar from "@/components/common/UserAvatar";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAlert } from "@/hooks/useAlert";

import { useEffect, useState } from "react";
import ProfileImageUploader from "@/components/common/ImageUploader";
import { uploadImageToServer } from "@/lib/upload/api";

export default function ProfileOverviewCard() {
  const { user, update } = useUser();
  const { showAlert } = useAlert();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    photo: user?.photo || "",
    billing: {
      line1: user?.billingAddress?.line1 || "",
      line2: user?.billingAddress?.line2 || "",
      city: user?.billingAddress?.city || "",
      postalCode: user?.billingAddress?.postalCode || "",
      country: user?.billingAddress?.country || "",
    },
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      photo: user?.photo || "",

      billing: {
        line1: user.billingAddress?.line1 || "",
        line2: user.billingAddress?.line2 || "",
        city: user.billingAddress?.city || "",
        postalCode: user.billingAddress?.postalCode || "",
        country: user.billingAddress?.country || "",
      },
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in form.billing) {
      setForm((prev) => ({
        ...prev,
        billing: {
          ...prev.billing,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = async (file: File | null) => {
    if (!file) return;

    try {
      const imageUrl = await uploadImageToServer(file); // ex: /uploads/xyz.jpg
      setForm((prev) => ({ ...prev, photo: imageUrl }));
      showAlert({
        type: "success",
        title: "Photo updated",
        message: "Your new photo has been uploaded.",
      });
    } catch (err) {
      showAlert({
        type: "error",
        title: err instanceof Error ? "Upload failed" : "Error",
        message: "We couldn't upload your image.",
      });
    }
  };

  const handleSave = async () => {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      billingAddress: form.billing,
      photo: form.photo || user?.photo || "",
    };

    const res = await update(payload);
    if (res.success) {
      showAlert({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
        duration: 8000,
        position: "top-right",
      });
      setIsEditing(false);
    } else {
      showAlert({
        type: "error",
        title: "Update failed",
        message: "There was an error updating your profile.",
        duration: 8000,
        position: "top-right",
      });
    }
  };

  if (!user) return null;

  return (
    <section className="text-color w-full space-y-6 rounded-2xl border bg-bg p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        {isEditing ? (
          <ProfileImageUploader
            name="photo"
            onChange={handleImageChange}
            defaultImage={user.photo}
            editable={isEditing}
          />
        ) : (
          <UserAvatar
            src={user.photo}
            alt={`${user.firstName} ${user.lastName}`}
            size={80}
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-placeholder">@{user.username}</p>
        </div>
      </div>

      {/* Section - Personal Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Personal Info</h3>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            className="text-sm"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <Input
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Phone"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input label="Email" value={user.email} disabled />
          <Input label="Language" value={user.language} disabled />
          <Input label="Plan" value={user.subscription.plan} disabled />
        </div>
      </div>

      {/* Section - Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Billing Address</h3>
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <Input
            label="Street"
            name="line1"
            value={form.billing.line1}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Street 2"
            name="line2"
            value={form.billing.line2}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Postal Code"
            name="postalCode"
            value={form.billing.postalCode}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="City"
            name="city"
            value={form.billing.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Country"
            name="country"
            value={form.billing.country}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="min-w-[120px]">
            Save changes
          </Button>
        </div>
      )}
    </section>
  );
}
