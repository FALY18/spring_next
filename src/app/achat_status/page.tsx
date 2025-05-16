import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getHistoriqueAchats } from "./achat";
import '../globals.css';
async function getAchats(): Promise<any[]> {
	const res = await fetch("http://localhost:8080/api/achat/historique", {
	  cache: "no-store",
	});
      
	if (!res.ok) {
	  const errorText = await res.text();
	  console.error("❌ ++++++++++Erreur HTTP:", res.status, errorText);
	  throw new Error("Échec du chargement des achats.");
	}
      
	try {
	  const data = await res.json();
	  console.log("✅++++++++++++++ Données reçues:", data);
	  return data;
	} catch (err) {
	  const raw = await res.text();
	  console.error("❌ ++++++++JSON mal formé. Corps brut reçu:", raw);
	  throw new Error("Réponse JSON invalide.");
	}
      }
      


      export default async function Page() {
	const achats = await getHistoriqueAchats(2);
      
	return (
	  <div className="bg-gray-800 w-full h-full container mx-auto py-10">
	    <DataTable columns={columns} data={achats} />
	  </div>
	);
      }
      

