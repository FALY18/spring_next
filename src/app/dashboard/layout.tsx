import '../globals.css';

export const metadata = {
	title: 'Titre de votre application',
	description: 'Description de votre application',
};

export default async function Dashbard({
	children,
	}:{children:React.ReactNode}
){
	return(
		<html lang="fr">
			<body>
				{children}
			</body>
		</html>
	);
}