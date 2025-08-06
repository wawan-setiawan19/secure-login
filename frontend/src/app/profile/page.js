'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5500/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        setUser(data);
      } catch (err) {
        setError(err.message);
        // Jika error karena unauthorized, logout otomatis
        if (err.message.toLowerCase().includes('unauthorized')) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Welcome, {user.name}</h1>
        <p className="text-gray-700 mb-2">Email: {user.email}</p>
        <Link href="/products">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Lihat Produk Saya
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
