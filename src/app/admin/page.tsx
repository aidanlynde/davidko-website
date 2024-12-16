'use client';

import React, { useState, useEffect } from 'react';
import { Parser } from 'json2csv';

interface Option {
  value: string;
  label: string;
}

interface ResponseData {
  _id: string;
  full_name: string;
  phone: string;
  email: string;
  locations: Option[];
  min_price: string;
  max_price: string;
  property_types: string[];
  createdAt: string;
}

export default function AdminPage() {
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  
  const ADMIN_PASSWORD = 'davidkoisabot1!';

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      fetchData();
    } else {
      setError('Invalid password');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/get-responses');
      const data = await res.json();
      setResponses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching responses:', error);
      setResponses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!responses.length) return;

    const fields = [
      'full_name',
      'email',
      'phone',
      'locations',
      'min_price',
      'max_price',
      'property_types',
      'createdAt'
    ];
    const opts = { fields };

    try {
      const parser = new Parser(opts);
      const csv = parser.parse(
        responses.map((response) => ({
          ...response,
          locations: response.locations.map((loc) => loc.label).join(', '),
          property_types: response.property_types.join(', ')
        }))
      );

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.setAttribute('download', 'form_responses.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error exporting to CSV:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#31435b]">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full p-2 border rounded focus:outline-none focus:border-[#31435b] text-[#31435b]"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#31435b] text-white py-2 rounded hover:bg-opacity-90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Form Responses</h1>
        <div>
          <button
            onClick={exportToCSV}
            className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-opacity-90 mr-4"
            disabled={isLoading || !responses.length}
          >
            Export to CSV
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('isAdminAuthenticated');
              setIsAuthenticated(false);
            }}
            className="py-2 px-4 bg-[#31435b] text-white rounded-lg hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Locations</th>
              <th className="border px-4 py-2">Price Range</th>
              <th className="border px-4 py-2">Property Types</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          {responses.length > 0 ? (
            <tbody>
              {responses.map((response) => (
                <tr key={response._id}>
                  <td className="border px-4 py-2">{response.full_name}</td>
                  <td className="border px-4 py-2">{response.email}</td>
                  <td className="border px-4 py-2">{response.phone}</td>
                  <td className="border px-4 py-2">
                    {response.locations.map((loc) => loc.label).join(', ')}
                  </td>
                  <td className="border px-4 py-2">
                    ${response.min_price} - ${response.max_price}
                  </td>
                  <td className="border px-4 py-2">
                    {response.property_types.join(', ')}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(response.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-4 border">
                  No responses found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
    </div>
  );
}