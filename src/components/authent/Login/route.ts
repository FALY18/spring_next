
import { NextResponse } from 'next/server';
import { authSchema } from './login';

export async function POST(request: Request) {
	const body = await request.json();

	try {
		const data = authSchema.parse(body);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.errors });
	}
}
