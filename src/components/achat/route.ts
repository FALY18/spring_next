export async function GET() {
	const res = await fetch('http://localhost:8080/api/achat/panier');
	const data = await res.json();
	return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      
      export async function POST(request) {
	const body = await request.json();
	const res = await fetch('http://localhost:8080/api/achat/panier', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(body)
	});
	const data = await res.json();
	return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
      