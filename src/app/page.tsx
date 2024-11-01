"use client";

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardExplanationModal from '../components/CardExplanationModal';
import { shuffleArray } from '../utils/shuffle';

export default function Home() {
  const [cards, setCards] = useState<number[]>([]);
  const [drawnCards, setDrawnCards] = useState<number[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [modalCard, setModalCard] = useState<number | null>(null);

  useEffect(() => {
    const cardNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
    setCards(shuffleArray(cardNumbers));
  }, []);

  const drawCards = () => {
    setDrawnCards(cards);
    setIsFlipping(true);
  };

  useEffect(() => {
    if (isFlipping && drawnCards.length) {
      drawnCards.forEach((number, index) => {
        setTimeout(() => {
          setModalCard(number);
        }, index * 2000);
      });
    }
  }, [isFlipping, drawnCards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Card Game</h1>
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
        {cards.map((number) => (
          <div 
            key={number} 
            className={`bg-blue-500 text-white text-xl font-bold rounded-lg flex items-center justify-center relative ${number === 1 ? 'p-2' : ''}`}
            style={{ 
              gridArea: number === 1 || number === 2 ? 'overlap' : `card${number}`,
              width: '120px',
              height: '180px',
              ...(number === 2 ? {
                transform: 'rotate(90deg)',
                transformOrigin: 'center',
                zIndex: 1,
              } : {
                zIndex: 0 
              })
            }}
          >
            <span
              className={number === 1 ? 'absolute top-2' : 'flex items-center justify-center'}
            >
              {number}
            </span>
          </div>
        ))}
      </div>
      <button 
        onClick={drawCards} 
        className="mt-8 bg-green-500 text-white py-2 px-4 rounded">
        Draw Cards
      </button>

      {modalCard && (
        <CardExplanationModal 
          number={modalCard} 
          onClose={() => setModalCard(null)} 
        />
      )}
    </div>
  );
}
