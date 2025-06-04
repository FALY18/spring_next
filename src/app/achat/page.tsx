import Link from 'next/link';

export default function HomeAchat() {
	return (
		<main className="container mx-auto p-4">
			<h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
				Boutique Moderne
			</h1>
			<div className="flex flex-col items-center space-y-4">
				<Link href="./addpanier" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600" data-aos="fade-up">
					Gérer le Panier
				</Link>
				<Link href="./historique" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600" data-aos="fade-up">
					Historique des Achats
				</Link>
			</div>
		</main>
	);
}
