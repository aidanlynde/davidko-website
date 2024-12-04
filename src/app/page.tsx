'use client';

import React, { useState } from 'react';
import Select, { MultiValue } from 'react-select';

// Define the type for the options
type Option = {
  value: string;
  label: string;
};

// Define the shape of your form data
interface FormData {
  full_name: string;
  phone: string;
  email: string;
  locations: Option[];
  sales_price: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone: '',
    email: '',
    locations: [],
    sales_price: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const locationOptions: Option[] = [
    { value: '60601', label: 'Chicago, IL 60601' },
    { value: '60602', label: 'Chicago, IL 60602' },
    { value: 'Naperville', label: 'Naperville, IL' },
    { value: 'Evanston', label: 'Evanston, IL' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCurrentStep(4);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src="/chicago.jpg"
        alt="Chicago skyline"
        className="hero-image object-cover w-full h-full"
      />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Fill Out the Form</h1>

          {currentStep === 1 && (
            <div>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <Select
                isMulti
                name="locations"
                options={locationOptions}
                className="basic-multi-select mb-4"
                placeholder="Search and select locations"
                onChange={(selectedOptions: MultiValue<Option>) => {
                  setFormData({
                    ...formData,
                    locations: selectedOptions ? [...selectedOptions] : [],
                  });
                }}
              />
              <input
                type="number"
                name="sales_price"
                placeholder="Desired Sales Price (USD)"
                value={formData.sales_price}
                onChange={handleChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-3 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="py-3 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Review Your Information</h2>
              <p>
                <strong>Name:</strong> {formData.full_name}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Locations:</strong>{' '}
                {formData.locations.map((loc) => loc.label).join(', ')}
              </p>
              <p>
                <strong>Desired Sales Price:</strong> ${formData.sales_price}
              </p>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-3 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p>Someone will contact you soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
