import Navbar from "@/components/navbar/navBar"
import Footer from "@/components/footer/footerpg"
import ListeProduits from "@/components/produit/ListeProduits"
import { withAuth } from "@/lib/withAuth"
function ContentPage(){
	return(
		<body>
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
		</body>
	)
}
export default withAuth(ContentPage, ['admin','client']);