import '../../../globals.css';

export default function ContentLayout({
	children,
}:{ 
	children:React.ReactNode,
}){
	return(
		<html lang='fr'>
			<body>
				{children}
			</body>
		</html>
	)
}