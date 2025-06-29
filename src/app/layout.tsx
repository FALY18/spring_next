import './globals.css';
import { Toaster } from 'sonner';
export const metadata = {
	title: "planteforme de vente",
	description: "Multiplateforme de vente en ligne",
	keywords: ["vente en ligne", "produits", "multiplateforme"],
  	robots: "index, follow",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<body> {children}
				<div className=''>
					<Toaster position="top-center" richColors closeButton />
				</div>
			</body>
		</html>);
}
