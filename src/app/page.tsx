"use client";

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardExplanationModal from '../components/CardExplanationModal';
import { shuffleArray } from '../utils/shuffle';

export default function Home() {
  const [deck, setDeck] = useState<number[]>([]); 
  const [drawnCards, setDrawnCards] = useState<number[]>([]); 
  const [isDrawn, setIsDrawn] = useState(false); 
  const [currentCardIndex, setCurrentCardIndex] = useState(0); 
  const [isReading, setIsReading] = useState(false); 

  // Initialize deck on load
  useEffect(() => {
    const cardNumbers = Array.from({ length: 72 }, (_, i) => i + 1); 
    setDeck(shuffleArray(cardNumbers)); 
  }, []);

  // Draw 10 random cards from the shuffled deck
  const handleDrawCards = () => {
    const drawn = deck.slice(0, 10); 
    setDrawnCards(drawn);
    setIsDrawn(true); 
    setIsReading(false); 
  };

  // Start reading cards in order
  const handleReadCards = () => {
    if (isDrawn) {
      setCurrentCardIndex(0); 
      setIsReading(true); 
    }
  };

  // Move to the next card during the reading phase
  const handleNextCard = () => {
    if (currentCardIndex < drawnCards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1); 
    } else {
      setIsReading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 relative">
      <h1 className="text-3xl font-bold mb-8 text-white">Card Game</h1>

      {/* Card Layout */}
      <div 
        className="grid grid-cols-4 grid-rows-4 gap-y-6 gap-x-16"
        style={{ 
          gridTemplateAreas: `
            ". card3 . card10"
            "card5 overlap card6 card9"
            ". card4 . card8"
            ". . . card7"
          ` 
        }}
      >
        {drawnCards.map((number, index) => (
          <div 
            key={number} 
            className={`bg-blue-500 text-white text-xl font-bold rounded-lg flex items-center justify-center relative ${index === 0 ? 'p-2' : ''}`}
            style={{ 
              gridArea: index === 0 || index === 1 ? 'overlap' : `card${index + 1}`,
              width: '120px',
              height: '180px',
              ...(index === 1 ? {
                transform: 'rotate(90deg)',
                transformOrigin: 'center',
                zIndex: 1,
                opacity: 0.9,
              } : {
                zIndex: 0 
              })
            }}
          >
            {isDrawn ? (
              // Show image for drawn cards
              <img src={`/images/card${number}.png`} alt={`Card ${number}`} className="w-full h-full rounded-lg" />
            ) : (
              // Placeholder before cards are drawn
              <span
                className={index === 0 ? 'absolute top-2' : 'flex items-center justify-center'}
              >
                ?
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        <button 
          onClick={handleDrawCards} 
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={isDrawn} 
        >
          Draw Cards
        </button>
        <button 
          onClick={handleReadCards} 
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!isDrawn || isReading} 
        >
          Read Cards
        </button>
      </div>

      {/* Card Explanation Modal */}
      {isReading && currentCardIndex < drawnCards.length && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <CardExplanationModal 
            number={drawnCards[currentCardIndex]} 
            onClose={handleNextCard} 
          />
        </div>
      )}
    </div>
  );
}
