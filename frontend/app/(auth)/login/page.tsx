'use client';


import { signIn } from '@/server/users';

export default function LoginPage() {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(form.entries()) as { email: string; password: string };
    const { success, message } = await signIn(email, password);
    if (success) {
      window.location.href = '/dashboard'; // Redirect to home page on success
    } else {
      alert(message); // Simple alert for demonstration; replace with better UI handling
    }


  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold text-center">Connexion</h1>
      <input name="email" type="email" placeholder="Email" className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Mot de passe" className="border p-2 w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">Se connecter</button>
    </form>
  );
}
