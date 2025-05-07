	"use client";

	import { useState, useEffect } from "react";
	import Link from "next/link";
	import { Search, Settings } from "lucide-react";
	import { useRouter } from "next/navigation"; // en haut

	export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Simuler l'état de connexion

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		
		// Vérifie la présence du token JWT pour déterminer l'état de connexion
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	

	const handleAuth = () => {
	setIsLoggedIn(!isLoggedIn);
	};


	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userRole");
		setIsLoggedIn(false);
		router.push("/"); // ou vers la page de connexion
	};


	// Fonction pour défiler vers une section
	const scrollToSection = (id: string) => {
	const section = document.getElementById(id);
	if (section) {
	section.scrollIntoView({ behavior: "smooth" });
	}
	};

	return (
	<nav 
	className={`z-50 fixed top-0 w-full px-6 py-3 flex items-center justify-between bg-gray-900 ${
		isScrolled ? "shadow-md bg-opacity-90" : "bg-opacity-100"
	} transition-all`}
	>
	{/* Logo */}
	<Link href="/" className="text-green-500 text-2xl font-bold">
		H-$eraH
	</Link>

	{/* Menu */}
	<ul className="hidden md:flex space-x-10 text-white">
		<li><a href="#" onClick={() => scrollToSection("home")} className="hover:text-green-400 transition">Home</a></li>
		<li><a href="#" onClick={() => scrollToSection("products")} className="hover:text-green-400 transition">Products</a></li>
		<li><a href="#" onClick={() => scrollToSection("achat")} className="hover:text-green-400 transition">Achat</a></li>
		<li><a href="#" onClick={() => scrollToSection("panier")} className="hover:text-green-400 transition">Add Panier</a></li>
		<li><a href="#" onClick={() => scrollToSection("contact")} className="hover:text-green-400 transition">Contact Us</a></li>
	</ul>

	{/* Barre de recherche et paramètres */}
	<div className="flex items-center space-x-4">
		<div className="relative">
		<input
		type="text"
		placeholder="Search..."
		className="bg-gray-800 text-white px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
		/>
		<Search className="absolute right-3 top-2 text-white" size={16} />
		</div>

		<button className="text-white hover:text-gray-400 transition">
		<Settings size={20} />
		</button>

		{/* Connexion / Déconnexion */}
		<div
		onClick={handleAuth}
		className="bg-white text-gray-900 px-4 py-1 rounded-lg hover:bg-gray-200 transition"
		>
		
		{isLoggedIn ? (
			<button
				onClick={handleLogout}
				className="bg-white text-gray-900 px-4 py-1 rounded-lg hover:bg-gray-200 transition"
			>
			Logout
			</button>
				) : (
				<Link
					href="/auth" // ou le chemin de ta page de connexion
					className="bg-white text-gray-900 px-4 py-1 rounded-lg hover:bg-gray-200 transition"
				>
					Sign in
				</Link>
			)}
		</div>
	</div>
	</nav>
	);
	}
