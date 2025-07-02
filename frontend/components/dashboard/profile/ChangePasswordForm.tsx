// components/dashboard/profile/ChangePasswordForm.tsx
"use client";




const ChangePasswordForm = () => {




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    // TODO: Appel à l'API pour changer le mot de passe
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
    
    </form>
  );
};

export default ChangePasswordForm;
