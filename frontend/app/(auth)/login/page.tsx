'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from '@/server/users';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    await signIn(
      form.get('email') as string,
      form.get('password') as string
    );


  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold text-center">Connexion</h1>
      <input name="email" type="email" placeholder="Email" className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Mot de passe" className="border p-2 w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">Se connecter</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
