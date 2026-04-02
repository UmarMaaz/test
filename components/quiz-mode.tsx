'use client';

import { useState, useEffect } from 'react';
import type { MCQ } from '@/lib/mcq-data';
import { MCQCard } from '@/components/mcq-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Timer, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizModeProps {
  mcqs: MCQ[];
  onComplete?: (results: QuizResults) => void;
  timePerQuestion?: number; // in seconds
}

export interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  score: number;
  answers: Record<string, number | null>;
  duration: number;
}

export function QuizMode({
  mcqs,
  onComplete,
  timePerQuestion = 60,
}: QuizModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(timePerQuestion * mcqs.length);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const currentMCQ = mcqs[currentIndex];
  const isAnswered = answers[currentMCQ.id] !== undefined;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsQuizComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (selectedIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentMCQ.id]: selectedIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentMCQ.id]: null,
    }));
    handleNext();
  };

  const completeQuiz = () => {
    setIsQuizComplete(true);
  };

  const calculateResults = (): QuizResults => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let skippedAnswers = 0;

    mcqs.forEach((mcq) => {
      const answer = answers[mcq.id];
      if (answer === undefined || answer === null) {
        skippedAnswers++;
      } else if (answer === mcq.correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const score = Math.round(
      (correctAnswers / mcqs.length) * 100
    );

    return {
      totalQuestions: mcqs.length,
      correctAnswers,
      wrongAnswers,
      skippedAnswers,
      score,
      answers,
      duration: Math.round((Date.now() - startTime) / 1000),
    };
  };

  if (isQuizComplete) {
    const results = calculateResults();
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {results.score}%
              </div>
              <p className="text-gray-600">
                {results.correctAnswers} out of {results.totalQuestions} correct
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">
                  {results.correctAnswers}
                </p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">
                  {results.wrongAnswers}
                </p>
                <p className="text-sm text-gray-600">Wrong</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {results.skippedAnswers}
                </p>
                <p className="text-sm text-gray-600">Skipped</p>
              </div>
            </div>

            {/* Time */}
            <div className="text-center text-gray-600">
              <p className="text-sm">Time taken: {Math.floor(results.duration / 60)}:{String(results.duration % 60).padStart(2, '0')}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center pt-4">
              <Button
                onClick={() => {
                  setCurrentIndex(0);
                  setAnswers({});
                  setIsQuizComplete(false);
                  setTimeRemaining(timePerQuestion * mcqs.length);
                }}
                variant="outline"
              >
                Retake Quiz
              </Button>
              <Button
                onClick={() => onComplete?.(results)}
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Review Answers</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mcqs.map((mcq, index) => {
              const answer = results.answers[mcq.id];
              const isCorrect = answer === mcq.correctAnswer;

              return (
                <Card key={mcq.id} className={`border ${isCorrect ? 'border-green-200 bg-green-50' : answer !== null ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="font-semibold text-sm">Q{index + 1}: {mcq.question}</p>
                      <span className="text-xs font-semibold whitespace-nowrap">
                        {answer === null ? '⊘ Skipped' : isCorrect ? '✓ Correct' : '✗ Wrong'}
                      </span>
                    </div>
                    {answer !== null && (
                      <p className="text-xs text-gray-600">Your answer: {mcq.options[answer]}</p>
                    )}
                    {!isCorrect && answer !== null && (
                      <p className="text-xs text-green-700">Correct answer: {mcq.options[mcq.correctAnswer]}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / mcqs.length) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quiz Mode</h2>
          <p className="text-sm text-gray-600">
            Question {currentIndex + 1} of {mcqs.length}
          </p>
        </div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Timer size={20} />
          <span className={timeRemaining < 60 ? 'text-red-600' : ''}>
            {minutes}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progressPercent} className="h-2" />

      {/* Question */}
      <MCQCard
        mcq={currentMCQ}
        onAnswerSelect={handleAnswer}
        selectedAnswer={answers[currentMCQ.id] ?? null}
        showAnswer={false}
        isQuizMode={true}
      />

      {/* Navigation */}
      <div className="flex gap-3 justify-between">
        <div className="flex gap-2">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
          >
            <ChevronLeft size={16} className="mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleSkip}
            variant="outline"
          >
            Skip
          </Button>
        </div>
        <Button onClick={handleNext}>
          {currentIndex === mcqs.length - 1 ? 'Complete' : 'Next'}
          {currentIndex < mcqs.length - 1 && (
            <ChevronRight size={16} className="ml-2" />
          )}
        </Button>
      </div>

      {/* Question Overview */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-xs font-semibold text-gray-600 mb-3">QUESTIONS OVERVIEW</p>
        <div className="flex flex-wrap gap-2">
          {mcqs.map((mcq, index) => {
            const isAnswered = answers[mcq.id] !== undefined;
            return (
              <button
                key={mcq.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600 text-white'
                    : isAnswered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
