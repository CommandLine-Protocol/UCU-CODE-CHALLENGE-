import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, StopIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('study'); // 'study' or 'break'
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [customTime, setCustomTime] = useState(25);
  
  const timerRef = useRef(null);
  
  const studyTime = customTime * 60; // Convert minutes to seconds
  const breakTime = 5 * 60; // 5 minutes break by default
  
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      clearInterval(timerRef.current);
      
      // Play sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
      audio.play();
      
      if (mode === 'study') {
        // Switch to break
        setMode('break');
        setTimeLeft(breakTime);
        setSessionsCompleted(prev => prev + 1);
      } else {
        // Switch back to study
        setMode('study');
        setTimeLeft(studyTime);
      }
    }
    
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode, studyTime, breakTime]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(mode === 'study' ? studyTime : breakTime);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = (timeLeft / (mode === 'study' ? studyTime : breakTime)) * 100;
  
  return (
    <div className="bg-graphite rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-neon-teal mb-6">
        {mode === 'study' ? 'Focus Time' : 'Break Time'}
      </h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-64 h-64 mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1E1E26"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={mode === 'study' ? '#29E6D2' : '#2B9DFF'}
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              strokeLinecap="round"
              initial={{ rotate: -90, scale: 1 }}
              animate={{ rotate: -90, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            {/* Timer display */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className="text-4xl font-bold fill-current text-soft-gray"
            >
              {formatTime(timeLeft)}
            </text>
          </svg>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`p-3 rounded-full ${
              mode === 'study' ? 'bg-neon-teal' : 'bg-electric-blue'
            } text-space-navy hover:opacity-90 transition-opacity`}
            aria-label={isActive ? 'Pause' : 'Start'}
          >
            {isActive ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
          
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-space-navy text-soft-gray hover:bg-opacity-80 transition-colors"
            aria-label="Reset"
          >
            <StopIcon className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => {
              resetTimer();
              setMode(mode === 'study' ? 'break' : 'study');
              setTimeLeft(mode === 'study' ? breakTime : studyTime);
            }}
            className="p-3 rounded-full bg-space-navy text-soft-gray hover:bg-opacity-80 transition-colors"
            aria-label="Switch Mode"
          >
            <ArrowPathIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-soft-gray">
        <div className="text-center">
          <p className="text-xs opacity-70">Sessions</p>
          <p className="font-medium">{sessionsCompleted}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs opacity-70">Focus Time</p>
          <div className="flex items-center justify-center">
            <input
              type="number"
              min="5"
              max="60"
              value={customTime}
              onChange={(e) => {
                const value = Math.min(Math.max(parseInt(e.target.value) || 5, 5), 60);
                setCustomTime(value);
                if (mode === 'study' && !isActive) {
                  setTimeLeft(value * 60);
                }
              }}
              className="w-12 bg-transparent border-b border-soft-gray text-center focus:outline-none focus:border-neon-teal"
              disabled={isActive}
            />
            <span className="ml-1">min</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs opacity-70">Break</p>
          <p>5 min</p>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
