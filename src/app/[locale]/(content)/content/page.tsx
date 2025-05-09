
import Navbar from "@/components/navbar/navBar"
import Footer from "@/components/footer/footerpg"
import ListeProduits from "@/components/produit/ListeProduits"

export default function ContentPage(){
	return(
		<div className="grid gap-10 bg-black min-h-screen">
			<div>
				<Navbar/>
			</div>
			<div>
				<ListeProduits/>
			</div>
			<div>
				<Footer/>
			</div>
		</div>	
	)
}
