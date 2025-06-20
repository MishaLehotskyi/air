import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-5xl font-bold text-purple-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Sorry, this page does not exist.</p>
      <Link
        href="https://wowtickets.com/"
        className="inline-block bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-800 transition"
      >
        Go back home
      </Link>
    </div>
  );
}