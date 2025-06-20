import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful</h1>
        <p className="text-gray-700 mb-6">
          Thank you! Your payment was processed successfully. You’ll receive a ticket by email.
        </p>
        <Link
          href="https://wowtickets.com/"
          className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}