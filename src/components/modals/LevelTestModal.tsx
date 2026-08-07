import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Award, Trophy } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { LEVEL_TEST_QUESTIONS } from '../../data/academyData';

interface LevelTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnroll: (courseId?: string) => void;
}

export const LevelTestModal: React.FC<LevelTestModalProps> = ({ isOpen, onClose, onOpenEnroll }) => {
  const { courses } = useAppData();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = LEVEL_TEST_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIdx < LEVEL_TEST_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setIsFinished(false);
  };

  // Calculate score
  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === LEVEL_TEST_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  let calculatedLevel = 'Elementary (A2)';
  let recommendedCourse = courses[2] || null;

  if (correctCount >= 4) {
    calculatedLevel = 'Advanced (C1 / C2)';
    recommendedCourse = courses[0] || recommendedCourse;
  } else if (correctCount >= 3) {
    calculatedLevel = 'Upper-Intermediate (B2)';
    recommendedCourse = courses[1] || recommendedCourse;
  } else if (correctCount >= 2) {
    calculatedLevel = 'Intermediate (B1)';
    recommendedCourse = courses[2] || recommendedCourse;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative text-slate-900"
      >
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">English Diagnostic Placement Test</h3>
              <p className="text-xs text-slate-500 font-medium">
                {!isFinished ? `Question ${currentIdx + 1} of ${LEVEL_TEST_QUESTIONS.length}` : 'Test Completed'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        {!isFinished && (
          <div className="h-1 bg-slate-100 w-full">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / LEVEL_TEST_QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        <div className="p-6 space-y-6">
          {!isFinished ? (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h4>

              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300 text-slate-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-bold text-blue-600 mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                  selectedOption !== null
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentIdx < LEVEL_TEST_QUESTIONS.length - 1 ? 'Next Question' : 'Submit & See Result'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 text-blue-600 mx-auto flex items-center justify-center shadow-sm">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Your Calculated Level:</span>
                <h3 className="text-3xl font-extrabold text-blue-600 mt-1">{calculatedLevel}</h3>
                <p className="text-xs text-slate-600 mt-2 font-normal">
                  You scored <span className="font-bold text-slate-900">{correctCount} / {LEVEL_TEST_QUESTIONS.length}</span> correct answers.
                </p>
              </div>

              {/* Recommended Course Box */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-2">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Recommended Program for You:</span>
                  {recommendedCourse ? (
                    <>
                      <h4 className="text-base font-bold text-slate-900">{recommendedCourse.name}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{recommendedCourse.description}</p>
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-700">{recommendedCourse.price} {recommendedCourse.pricePeriod}</span>
                        <span className="text-slate-500 font-medium">{recommendedCourse.duration}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">Course recommendations are loading. Please revisit once course data is available.</p>
                  )}
                </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Retake Test
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenEnroll(recommendedCourse?.id);
                  }}
                  className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Enroll in This Course
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
