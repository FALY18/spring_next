
import Home from "@/components/acceuil/homepage";
import Navbar from "@/components/navbar/navBar";

export default function DashboardPage() {
	return (
		<div className="grid gap-10 bg-black min-h-screen">
			<div><Navbar/></div>
			<div className="">
			<Home />
			</div>
		</div>
	);
}

