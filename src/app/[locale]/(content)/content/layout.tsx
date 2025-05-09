import '../../../globals.css';

export default function ContentLayout({
	children,
}:{ 
	children:React.ReactNode,
}){
	return(
		<div>
			{children}
		</div>
	)
}