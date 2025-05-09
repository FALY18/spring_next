import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getAchats(): Promise<any[]> {
  const res = await fetch("http://localhost:8080/historique/1", {
    cache: "no-store",
  })
  return res.json()
}

export default async function Page() {
  const achats = await getAchats()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={achats} />
    </div>
  )
}
