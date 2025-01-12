import React, { useState } from 'react';

interface Location {
  value: string;
  label: string;
}

interface LocationInputProps {
  value: Location[];
  onChange: (locations: Location[]) => void;
  error?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, error }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedLocations, setSelectedLocations] = useState<Location[]>(value || []);

  const handleAddLocation = () => {
    if (!inputValue.trim()) return;

    // Basic zip code validation
    const isZipCode = /^\d{5}$/.test(inputValue.trim());
    
    const newLocation = {
      value: inputValue.trim(),
      label: inputValue.trim(),
    };

    // Check if location already exists
    if (!selectedLocations.some(loc => loc.value.toLowerCase() === newLocation.value.toLowerCase())) {
      const newLocations = [...selectedLocations, newLocation];
      setSelectedLocations(newLocations);
      onChange(newLocations);
    }
    
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLocation();
    }
  };

  const handleRemoveLocation = (locationToRemove: Location) => {
    const newLocations = selectedLocations.filter(loc => loc.value !== locationToRemove.value);
    setSelectedLocations(newLocations);
    onChange(newLocations);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter zip code or neighborhood (press Enter to add)"
          className={`w-full p-3 border rounded-md bg-white text-gray-900 placeholder-gray-400
            ${error ? 'border-red-600' : 'border-gray-200'}
            focus:outline-none focus:border-[#31435b] transition-colors
            hover:border-gray-300`}
        />
        
        <button
          onClick={handleAddLocation}
          className="absolute right-2 top-2 px-3 py-1 mt-1 bg-[#31435b] text-white rounded-md text-sm hover:bg-opacity-90"
        >
          Add
        </button>
      </div>

      {selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedLocations.map((location, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm"
            >
              <span>{location.label}</span>
              <span
                onClick={() => handleRemoveLocation(location)}
                className="ml-1.5 text-gray-400 hover:text-gray-600 cursor-pointer text-xs font-light select-none"
                role="button"
                tabIndex={0}
                aria-label="Remove location"
              >
                ✕
              </span>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default LocationInput;