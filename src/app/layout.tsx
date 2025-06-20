'use client'
import "./globals.css";
import React from "react";
import { useEffect, useState } from 'react';
import StripeWrapper from '@/components/StripeWrapper';
import Loader from "@/components/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 50 }), // $793.00
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  return (
    <html lang="en">
      <body>
        {!clientSecret
          ? <Loader />
          : (
              <StripeWrapper clientSecret={clientSecret}>
                {children}
              </StripeWrapper>
            )}
      </body>
    </html>
  );
}
