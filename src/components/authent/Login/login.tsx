'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const authSchema = z.object({
  username: z.string().min(3, "Nom d'utilisateur trop court"),
  password: z.string().min(6, 'Mot de passe trop court'),
});

type AuthSchema = z.infer<typeof authSchema>;

export default function AuthForm() {
    const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm<AuthSchema>({
            resolver: zodResolver(authSchema),});

      const [loginError, setLoginError] = useState<string | null>(null);
      const router = useRouter();

      const onSubmit = async (data: AuthSchema) => {
          const response = await fetch('http://localhost:8080/api/login', { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          });

        if (response.ok) {
              router.push('/dashboard');
        } else {
            const errorData = await response.json();
            setLoginError(errorData.message || 'Échec de la connexion');
      }
    };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
    >
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Connexion</h2>

        {loginError && <p className="text-red-500 text-center">{loginError}</p>}

        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">Nom d'utilisateur</label>
          <input 
            type="text" 
            {...register('username')} 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">Mot de passe</label>
          <input 
            type="password" 
            {...register('password')} 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Se connecter
        </motion.button>

        <p className="text-center text-gray-600 text-sm">
          Pas encore de compte ? <a href="/register" className="text-blue-500 font-medium hover:underline">Inscrivez-vous</a>
        </p>
      </form>
    </motion.div>
  );  
}
