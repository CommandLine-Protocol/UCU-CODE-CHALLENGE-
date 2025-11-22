import { useState } from 'react';
import { motion } from 'framer-motion';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const quizData = [
    {
      question: 'What is the correct way to create a React component?',
      options: [
        'function MyComponent() { return <div>Hello</div>; }',
        'class MyComponent extends React.Component { render() { return <div>Hello</div>; } }',
        'const MyComponent = () => <div>Hello</div>',
        'All of the above'
      ],
      correctAnswer: 3
    },
    {
      question: 'Which hook is used to perform side effects in a function component?',
      options: [
        'useState',
        'useEffect',
        'useContext',
        'useReducer'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is the purpose of the key prop in React?',
      options: [
        'To style components',
        'To identify which items have changed, are added, or are removed',
        'To handle form submissions',
        'To manage component state'
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswer = (selectedIndex) => {
    setSelectedOption(selectedIndex);
    
    if (selectedIndex === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  if (showScore) {
    return (
      <motion.div 
        className="bg-graphite rounded-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-neon-teal mb-4">Quiz Complete!</h2>
        <p className="text-soft-gray mb-6">
          You scored {score} out of {quizData.length}
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-2 bg-neon-teal text-space-navy font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-graphite rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-neon-teal mb-6">Quick Quiz</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-soft-gray">
            Question {currentQuestion + 1}/{quizData.length}
          </span>
          <span className="text-sm font-medium text-neon-teal">
            Score: {score}
          </span>
        </div>
        
        <div className="h-2 w-full bg-space-navy rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-neon-teal"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestion) / quizData.length) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-soft-gray mb-6">
          {quizData[currentQuestion].question}
        </h3>
        
        <div className="space-y-3">
          {quizData[currentQuestion].options.map((option, index) => {
            const isCorrect = index === quizData[currentQuestion].correctAnswer;
            const isSelected = selectedOption === index;
            let buttonClass = "w-full text-left p-4 rounded-lg transition-colors ";
            
            if (selectedOption !== null) {
              if (isSelected) {
                buttonClass += isCorrect 
                  ? "bg-neon-teal text-space-navy font-medium" 
                  : "bg-red-500 text-white";
              } else if (isCorrect) {
                buttonClass += "bg-green-500 text-white";
              } else {
                buttonClass += "bg-space-navy text-soft-gray opacity-50";
              }
            } else {
              buttonClass += "bg-space-navy text-soft-gray hover:bg-opacity-80";
            }
            
            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => selectedOption === null && handleAnswer(index)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Quiz;
