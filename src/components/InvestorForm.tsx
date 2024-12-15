'use client';

import React, { useState, useEffect } from 'react';
import Select, { MultiValue } from 'react-select';

type Option = {
  value: string;
  label: string;
};

interface FormData {
  full_name: string;
  phone: string;
  email: string;
  locations: Option[];
  sales_price: string;
}

interface FormErrors {
  full_name?: string;
  phone?: string;
  email?: string;
  locations?: string;
  sales_price?: string;
}

export default function InvestorForm() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone: '',
    email: '',
    locations: [],
    sales_price: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (showSuccess) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            window.location.reload();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [showSuccess]);

  const locationOptions: Option[] = [
    { value: '60601', label: 'Chicago, IL 60601' },
    { value: '60602', label: 'Chicago, IL 60602' },
    { value: 'Naperville', label: 'Naperville, IL' },
    { value: 'Evanston', label: 'Evanston, IL' },
  ];

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (!formData.locations || formData.locations.length === 0) {
      newErrors.locations = 'Please select at least one location';
    }

    if (!formData.sales_price) {
      newErrors.sales_price = 'Sales price is required';
    } else if (parseInt(formData.sales_price) <= 0) {
      newErrors.sales_price = 'Please enter a valid sales price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

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
        setShowSuccess(true);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      background: 'white',
      borderColor: errors.locations ? '#dc2626' : '#e5e7eb',
      borderWidth: '1px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: errors.locations ? '#dc2626' : '#d1d5db'
      },
      '&:focus': {
        borderColor: '#31435b',
        boxShadow: 'none'
      }
    }),
    menu: (base: any) => ({
      ...base,
      background: 'white',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#213c5d' : 'transparent',
      color: state.isFocused ? 'white' : 'black',
      '&:hover': {
        backgroundColor: '#31435b',
        color: 'white'
      }
    })
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Join Chicago's Premier Investor Network";
      case 2:
        return "Select Locations";
      case 3:
        return "Review Your Information";
      case 4:
        return "Thank You!";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white px-10 py-6 md:p-8 rounded-md shadow-xl w-full max-w-lg mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-2xl font-bold mb-6 text-gray-900 text-center">{getStepTitle()}</h1>

      {currentStep === 1 && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md bg-white text-gray-900 placeholder-gray-400
                ${errors.full_name ? 'border-red-600' : 'border-gray-200'}
                focus:outline-none focus:border-[#31435b] transition-colors
                hover:border-gray-300`}
            />
            {errors.full_name && (
              <p className="mt-1 text-red-600 text-sm">{errors.full_name}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md bg-white text-gray-900 placeholder-gray-400
                ${errors.phone ? 'border-red-600' : 'border-gray-200'}
                focus:outline-none focus:border-[#31435b] transition-colors
                hover:border-gray-300`}
            />
            {errors.phone && (
              <p className="mt-1 text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md bg-white text-gray-900 placeholder-gray-400
                ${errors.email ? 'border-red-600' : 'border-gray-200'}
                focus:outline-none focus:border-[#31435b] transition-colors
                hover:border-gray-300`}
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="w-full py-3 bg-[#31435b] text-white rounded-md hover:bg-opacity-90 transition duration-300"
          >
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="mb-4">
            <Select
              isMulti
              name="locations"
              options={locationOptions}
              styles={customSelectStyles}
              value={formData.locations}
              placeholder="Search and select locations"
              onChange={(selectedOptions: MultiValue<Option>) => {
                setFormData({
                  ...formData,
                  locations: selectedOptions ? [...selectedOptions] : [],
                });
                if (selectedOptions && selectedOptions.length > 0) {
                  setErrors({ ...errors, locations: undefined });
                }
              }}
            />
            {errors.locations && (
              <p className="mt-1 text-red-600 text-sm">{errors.locations}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="number"
              name="sales_price"
              placeholder="Desired Sales Price (USD)"
              value={formData.sales_price}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md bg-white text-gray-900 placeholder-gray-400
                ${errors.sales_price ? 'border-red-600' : 'border-gray-200'}
                focus:outline-none focus:border-[#31435b] transition-colors
                hover:border-gray-300`}
            />
            {errors.sales_price && (
              <p className="mt-1 text-red-600 text-sm">{errors.sales_price}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="py-3 px-6 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="py-3 px-6 bg-[#31435b] text-white rounded-md hover:bg-opacity-90 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-900">Name:</strong> {formData.full_name}
            </p>
            <p>
              <strong className="text-gray-900">Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong className="text-gray-900">Email:</strong> {formData.email}
            </p>
            <p>
              <strong className="text-gray-900">Locations:</strong>{' '}
              {formData.locations.map((loc) => loc.label).join(', ')}
            </p>
            <p>
              <strong className="text-gray-900">Desired Sales Price:</strong> ${formData.sales_price}
            </p>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevStep}
              className="py-3 px-6 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="py-3 px-6 bg-[#31435b] text-white rounded-md hover:bg-opacity-90 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="text-center">
          <p className="text-gray-700">Someone will contact you soon.</p>
          <p className="text-gray-500 mt-4">Page will refresh in {countdown} seconds...</p>
        </div>
      )}
    </div>
  );
}