import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-600">Secure Login App 🔐</h1>
      <p className="mt-4 text-lg md:text-xl text-gray-700">Simple, secure authentication system built with Next.js and Express.js</p>
      <div className="mt-8 space-x-4">
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-xl shadow"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
