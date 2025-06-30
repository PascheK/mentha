'use client';

import { signUp } from '@/server/users';


export default function RegisterPage() {


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    await signUp(
      form.get('name') as string,
      form.get('email') as string,
      form.get('password') as string
    );


  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold text-center">Créer un compte</h1>
      <input name="name" type="text" placeholder="Name" className="border p-2 w-full" required />
      <input name="email" type="email" placeholder="Email" className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Mot de passe" className="border p-2 w-full" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 w-full">S’inscrire</button>
    </form>
  );
}
