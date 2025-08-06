'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    try {
      const res = await fetch('http://localhost:5500/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5500/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Produk Anda</h1>
          <Link
            href="/products/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Tambah Produk
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {products.length === 0 ? (
          <p className="text-gray-600">Belum ada produk.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="border p-4 rounded flex justify-between items-start bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
                <div className="flex gap-3 mt-1">
                  <Link
                    href={`/products/edit/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
