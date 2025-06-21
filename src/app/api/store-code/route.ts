import { NextRequest, NextResponse } from 'next/server';
import {getClient} from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const client = getClient();
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }

    const insertQuery = `
      INSERT INTO confirmation_codes (code)
      VALUES ($1)
      RETURNING *;
    `;

    const result = await client.query(insertQuery, [code]);

    return NextResponse.json({
      message: 'Confirmation code stored',
      record: result.rows[0],
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}