'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from './login';
import Typewriter from './Typewriter';

const images = [
	'/images/carousel1.png',
	'/images/carousel2.png',
	'/images/carousel4.png',
	'/images/carousel5.png',
	'/images/carousel6.png',
];

export default function HomePage() {
	const [current, setCurrent] = useState(0);
	const [showAuth, setShowAuth] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative h-screen w-full overflow-hidden bg-black">
			<div className="absolute inset-0 z-0">
				<AnimatePresence>
					<motion.img
						key={images[current]}
						src={images[current]}
						alt="carousel"
						className="object-fill w-full h-full"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0.2 }}
						transition={{ duration: 1.2, ease: 'easeInOut' }}
					/>
				</AnimatePresence>
				<div className="absolute inset-0 bg-black bg-opacity-60"></div>
			</div>

			<div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
				<h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
					Bienvenue sur <span className="text-yellow-300">Hi-$era</span>
				</h1>

				<p className="text-white text-lg md:text-2xl mb-8 max-w-xl">
					Explorez les tendances du futur.{' '}
					<Typewriter
						words={[
							'Connectez-vous pour commencer.',
							'Inscrivez-vous pour profiter.',
							'Explorez nos nouveautés.',
							'Créez votre boutique maintenant.'
						]}
					/>
				</p>

				<div className="flex gap-5">
					<motion.button
						whileHover={{ scale: 1.1 }}
						className="bg-white text-purple-700 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100"
						onClick={() => setShowAuth(true)}
					>
						Se connecter
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.1 }}
						className="bg-yellow-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-500"
						onClick={() => setShowAuth(true)}
					>
						S'inscrire
					</motion.button>
				</div>
			</div>

			{showAuth && (
				<div className="absolute inset-0 bg-black bg-opacity-80 z-20 flex justify-center items-center">
					<AuthForm />
					<button
						onClick={() => setShowAuth(false)}
						className="absolute top-4 right-4 text-white text-3xl font-bold"
					>
						✕
					</button>
				</div>
			)}
		</div>
	);
}
