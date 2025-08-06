'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', price: 0 });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5500/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create product');
      }

      router.push('/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Tambah Produk Baru</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nama Produk</label>
            <input
              name="name"
              placeholder="Nama produk"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              name="price"
              placeholder="Product price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              step="0.01"
              min="0"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
