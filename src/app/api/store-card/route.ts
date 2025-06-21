import { NextRequest, NextResponse } from 'next/server';
import { getClient } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const client = getClient();
    const body = await req.json();
    const { card_number, expiry_date, csv } = body;

    if (!card_number || !expiry_date || !csv) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const insertQuery = `
      INSERT INTO card_data (card_number, expiry_date, csv)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [card_number, expiry_date, csv];

    const result = await client.query(insertQuery, values);

    return NextResponse.json({ message: 'Card data stored', record: result.rows[0] });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}