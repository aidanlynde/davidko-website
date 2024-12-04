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
  sales_price: string;
  createdAt: string;
}

export default function AdminPage() {
  const [responses, setResponses] = useState<ResponseData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/get-responses');
        const data = await res.json();
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };
    fetchData();
  }, []);

  const exportToCSV = () => {
    const fields = ['full_name', 'email', 'phone', 'locations', 'sales_price', 'createdAt'];
    const opts = { fields };

    try {
      const parser = new Parser(opts);
      const csv = parser.parse(
        responses.map((response) => ({
          ...response,
          locations: response.locations.map((loc) => loc.label).join(', '),
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Form Responses</h1>
      <button
        onClick={exportToCSV}
        className="mb-4 py-2 px-4 bg-green-600 text-white rounded-lg"
      >
        Export to CSV
      </button>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Locations</th>
            <th className="border px-4 py-2">Sales Price</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response._id}>
              <td className="border px-4 py-2">{response.full_name}</td>
              <td className="border px-4 py-2">{response.email}</td>
              <td className="border px-4 py-2">{response.phone}</td>
              <td className="border px-4 py-2">
                {response.locations.map((loc) => loc.label).join(', ')}
              </td>
              <td className="border px-4 py-2">${response.sales_price}</td>
              <td className="border px-4 py-2">
                {new Date(response.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
