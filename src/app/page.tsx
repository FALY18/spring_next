import AuthForm from "@/components/authent/Login/login";
//import AddProductPage from "@/components/produit/prodLayout
import ListeProduits from "@/components/produit/ListeProduits";
import Footer from "@/components/footer/footerpg";
//import Home from "@/components/acceuil/homepage";
import NavBar from "@/components/navbar/navBar";
import HomePage from "@/components/authent/Login/auth_homePage";

export default async function LoginPage() {
	return (
		<div className="grid gap-10 bg-black min-h-screen">
			<HomePage/>  
		</div>
	)
}