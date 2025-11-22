import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = [
    {
      id: 1,
      question: 'What is the virtual DOM in React?',
      answer: 'A lightweight copy of the actual DOM that React uses to optimize updates by comparing it with the real DOM.'
    },
    {
      id: 2,
      question: 'What are React Hooks?',
      answer: 'Functions that let you use state and other React features in functional components.'
    },
    {
      id: 3,
      question: 'What is JSX?',
      answer: 'A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript.'
    }
  ];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  return (
    <div className="bg-graphite rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-neon-teal mb-6">Flashcards</h2>
      
      <div className="relative h-64 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-space-navy rounded-xl p-6 cursor-pointer flex items-center justify-center text-center ${
              isFlipped ? 'bg-opacity-80' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-xl font-medium text-soft-gray">
                {flashcards[currentCard].question}
              </p>
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-space-navy rounded-xl p-6 flex items-center justify-center text-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-lg text-neon-teal">
                {flashcards[currentCard].answer}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevCard}
          className="p-2 rounded-full bg-space-navy text-neon-teal hover:bg-opacity-80 transition-colors"
          aria-label="Previous card"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <span className="text-soft-gray">
          {currentCard + 1} / {flashcards.length}
        </span>
        <button
          onClick={nextCard}
          className="p-2 rounded-full bg-space-navy text-neon-teal hover:bg-opacity-80 transition-colors"
          aria-label="Next card"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
