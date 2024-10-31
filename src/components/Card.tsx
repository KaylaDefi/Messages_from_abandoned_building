import React from 'react';

interface CardProps {
  number: number; // The number on the card
  isFlipped: boolean; // Whether the card is face-up or face-down
  onClick: () => void; // Function to handle card clicks
}

const Card: React.FC<CardProps> = ({ number, isFlipped, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className={`w-24 h-32 flex items-center justify-center rounded-lg cursor-pointer transition-transform duration-500 ${isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
    >
      {isFlipped ? number : "?"}
    </div>
  );
};

export default Card;
