import { NextResponse } from 'next/server';
import getOrCreateAccount from '../../../lib/getOrCreateAccount';

export async function GET() {
  const account = await getOrCreateAccount({ required: true })
  return NextResponse.json(account, { status: 200 });
}
