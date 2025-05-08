// app/layout.tsx
import './globals.css';
import { Toaster } from 'sonner';
export const metadata = {
	title: 'Titre de votre application',
	description: 'Description de votre application',
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
