// components/dashboard/profile/ProfileForm.tsx
"use client";

;

const ProfileForm = () => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    // TODO: Ajouter appel API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     </div>
    </form>
  );
};

export default ProfileForm;
