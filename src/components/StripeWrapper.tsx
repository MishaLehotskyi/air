'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
  clientSecret: string;
  children: React.ReactNode;
};

export default function StripeWrapper({ clientSecret, children }: Props) {
  const options = { clientSecret };

  return <Elements stripe={stripePromise} options={options}>{children}</Elements>;
}
