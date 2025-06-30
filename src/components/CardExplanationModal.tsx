import React from 'react';

interface CardExplanationModalProps {
  name: string;
  explanation: string;
  image: string;
  position: number;
  positionExplanation: string;
  onClose: () => void;
}

export const CardExplanationModal: React.FC<CardExplanationModalProps> = ({
  name,
  explanation,
  image,
  position,
  positionExplanation,
  onClose
}) => {
  const explanationText = `${positionExplanation}: ${name} — ${explanation}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <h3 className="text-sm text-gray-600 italic mb-4">
          {position}. {positionExplanation}
        </h3>
        <img src={image} alt={name} className="mx-auto mb-4 w-60 h-auto rounded" />
        <p className="text-gray-800 mb-4">{explanation}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CardExplanationModal;

