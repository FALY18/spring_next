

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
			<body>{children}</body>
		</html>);
}
