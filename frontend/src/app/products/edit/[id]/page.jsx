'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({ name: '', price: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5500/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setForm({ name: data.name, price: data.price }));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5500/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price), // pastikan dikirim sebagai float
        }),
      });

      if (!res.ok) throw new Error('Failed to update');

      router.push('/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Edit Product</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Product Name"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Product Price"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
