'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Schéma de validation ny input
const authSchema = z.object({
	username: z.string().min(3, "Nom d'utilisateur trop court").optional(),
	email: z.string().email("Email invalide"),
	password: z.string().min(6, 'Mot de passe trop court'),
	confirmPassword: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword || !data.confirmPassword, {
	message: "Les mots de passe ne correspondent pas",
	path: ["confirmPassword"],
});

type AuthSchema = z.infer<typeof authSchema>;

export default function AuthForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
	});

	const [isRegistering, setIsRegistering] = useState(false);
	const [authError, setAuthError] = useState<string | null>(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const storedRole = localStorage.getItem('userRole');
		if (storedRole) {
			setUserRole(storedRole);
		}
	}, []);

	const onSubmit = async (data: AuthSchema) => {
		const url = isRegistering
			? 'http://localhost:8080/api/register'
			: 'http://localhost:8080/api/login';

		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				isRegistering
					? { username: data.username, email: data.email, password: data.password }
					: { email: data.email, password: data.password }
			),
		});

		if (response.ok) {
			const responseData = isRegistering? await response.text() : await response.json();
			if(isRegistering){
				toast.success("inscription reussie!")
				setIsRegistering(false)
			} else{
				// Sauvegarder le token et le rôle dans le localStorage
				const token = responseData.token;
				localStorage.setItem('token', token);

				// Décoder le JWT via srpingy pour extraire le rôle
				const payload = JSON.parse(atob(token.split('.')[1]));
				const role = payload.role;

				localStorage.setItem('userRole', role);
				setUserRole(role);

				if (role === 'admin') {
					toast.success("bravo ,vous êtes connecté en tant qu'administrateur")
					router.push('/dashboard');
				} else {
					toast.success("vous êtes connecté avec succes en tant qu'un clientèle...")
					router.push('/content/content');
				}
			}

			
		} else {
			const errorData = await response.json();
			const message = errorData.message || 'Une erreur est survenue lors de connexion';
			console.log("------------****",message)
			toast.error(message)
		}
	};

	return (
		<motion.div
			className="flex justify-center items-center w-full"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md bg-black bg-opacity-100 p-8 rounded-2xl shadow-lg space-y-6"
			>
				<h2 className="text-2xl font-bold text-center text-blue-700">
					{isRegistering ? 'Inscription' : 'Connexion'}
				</h2>

				{authError && <p className="text-red-500 text-center">{authError}</p>}

				<div className="flex flex-col space-y-2">
					{isRegistering && (
						<div className="flex flex-col space-y-2">
							<label className="text-gray-400 font-medium">Nom d'utilisateur</label>
							<input
								type="text"
								{...register('username')}
								className="p-3 border  bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Entrez votre nom d'utilisateur"
							/>
							{errors.username && (
								<p className="text-red-500 text-sm">{errors.username.message}</p>
							)}
						</div>
					)}

					<label className="text-gray-400 font-medium">Email</label>
					<input
						type="email"
						{...register('email')}
						className="p-3 border border-gray-300 bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Entrez votre email"
					/>
					{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
				</div>

				<div className="flex flex-col space-y-2">
					<label className="text-gray-400 font-medium">Mot de passe</label>
					<input
						type="password"
						{...register('password')}
						className="p-3 border border-gray-300 rounded-lg  bg-black text-gray-100 opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="••••••••"
					/>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password.message}</p>
					)}
				</div>

				{isRegistering && (
					<div className="flex flex-col space-y-2">
						<label className="text-gray-400 font-medium">Confirmer le mot de passe</label>
						<input
							type="password"
							{...register('confirmPassword')}
							className="p-3 border border-gray-300  bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="••••••••"
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
						)}
					</div>
				)}

				<motion.button
					type="submit"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="w-full bg-blue-600
				text-white py-3 rounded-lg text-lg font-semibold
				hover:bg-blue-700 transition"
				>
					{isRegistering ? "S'inscrire" : 'Se connecter'}
				</motion.button>

				<p className="text-center text-gray-600 text-sm">
					{isRegistering ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
					<button
						type="button"
						onClick={() => setIsRegistering(!isRegistering)}
						className="text-blue-500 font-medium hover:underline ml-1"
					>
						{isRegistering ? 'Se connecter' : "S'inscrire"}
					</button>
				</p>

			</form>
		</motion.div>
	);
}
