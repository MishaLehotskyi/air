import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const amount = body.amount || 50; // $793 in cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true }, // enables cards + Google Pay
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}