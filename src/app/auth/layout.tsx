

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
		<div >
		{children}
		</div>);
}
