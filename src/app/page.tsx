//import AuthForm from "@/components/authent/Login/login";
//import AddProductPage from "@/components/produit/prodLayout
import ListeProduits from "@/components/produit/ListeProduits";
import Footer from "@/components/footer/footerpg";
import Home from "@/components/acceuil/homepage";
import NavBar from "@/components/navbar/navBar";

export default async function LoginPage() {
	return (
		<div className="grid gap-10">
			<div>
				<NavBar/>
			</div>
			<div className="mt-[60px]">
				<Home/>
			</div>
			<div>
				<Footer/>	
			</div>
			<ListeProduits/> 
			{/* <AuthForm/>  */}
			{/* <AddProductPage/> */}
		</div>
	)
}