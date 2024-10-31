import React from 'react';

interface CardExplanationModalProps {
  number: number;
  onClose: () => void;
}

const CardExplanationModal: React.FC<CardExplanationModalProps> = ({ number, onClose }) => {
  const explanationText = `Explanation for card ${number}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Card {number} Explanation</h2>
        <p>{explanationText}</p>
        <button 
          onClick={onClose} 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CardExplanationModal;
