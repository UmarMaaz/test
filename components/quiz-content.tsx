'use client';

import { useState, useMemo } from 'react';
import type { MCQ } from '@/lib/mcq-data';
import { TopicSelector } from '@/components/topic-selector';
import { QuizMode, type QuizResults } from '@/components/quiz-mode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface QuizContentProps {
  allMCQs: MCQ[];
  allTopics: string[];
}

type QuizStep = 'setup' | 'quiz' | 'results';

export function QuizContent({ allMCQs, allTopics }: QuizContentProps) {
  const [step, setStep] = useState<QuizStep>('setup');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(allTopics);
  const [numQuestions, setNumQuestions] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

  const filteredMCQs = useMemo(() => {
    if (selectedTopics.length === 0) return [];
    return allMCQs.filter((mcq) => selectedTopics.includes(mcq.topic));
  }, [allMCQs, selectedTopics]);

  const quizMCQs = useMemo(() => {
    const shuffled = [...filteredMCQs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(numQuestions, shuffled.length));
  }, [filteredMCQs, numQuestions]);

  const handleStartQuiz = () => {
    if (quizMCQs.length === 0) {
      alert('Please select at least one topic');
      return;
    }
    setStep('quiz');
  };

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results);
    setStep('results');
  };

  const handleRetry = () => {
    setStep('setup');
    setQuizResults(null);
  };

  if (step === 'quiz') {
    return (
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => setStep('setup')}
          variant="ghost"
          className="mb-6"
        >
          ← Back
        </Button>
        <QuizMode
          mcqs={quizMCQs}
          onComplete={handleQuizComplete}
          timePerQuestion={timePerQuestion}
        />
      </div>
    );
  }

  if (step === 'results' && quizResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-7xl font-bold text-blue-600 mb-4">
                {quizResults.score}%
              </div>
              <p className="text-xl text-gray-600">
                {quizResults.correctAnswers} out of {quizResults.totalQuestions} correct
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {quizResults.totalQuestions}
                </p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">
                  {quizResults.correctAnswers}
                </p>
                <p className="text-xs text-gray-600">Correct</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">
                  {quizResults.wrongAnswers}
                </p>
                <p className="text-xs text-gray-600">Wrong</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {quizResults.skippedAnswers}
                </p>
                <p className="text-xs text-gray-600">Skipped</p>
              </div>
            </div>

            <div className="text-center text-gray-600 border-t pt-6">
              <p className="text-sm mb-1">Time taken</p>
              <p className="text-lg font-semibold">
                {Math.floor(quizResults.duration / 60)}:{String(quizResults.duration % 60).padStart(2, '0')}
              </p>
            </div>

            <div className="flex gap-3 justify-center pt-4">
              <Button onClick={handleRetry}>Take Another Quiz</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Select Topics</h3>
            <TopicSelector
              topics={allTopics}
              selectedTopics={selectedTopics}
              onTopicsChange={setSelectedTopics}
              showCount={false}
            />
            <p className="text-xs text-gray-500 mt-2">
              {filteredMCQs.length} questions available in selected topics
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Number of Questions
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min={1}
                max={Math.min(50, filteredMCQs.length)}
                value={numQuestions}
                onChange={(e) =>
                  setNumQuestions(Math.max(1, parseInt(e.target.value) || 10))
                }
                className="w-24"
              />
              <span className="text-sm text-gray-600">
                max: {Math.min(50, filteredMCQs.length)}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Time per Question (seconds)
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min={10}
                max={300}
                step={10}
                value={timePerQuestion}
                onChange={(e) =>
                  setTimePerQuestion(Math.max(10, parseInt(e.target.value) || 60))
                }
                className="w-24"
              />
              <span className="text-sm text-gray-600">
                Total: {Math.round((timePerQuestion * numQuestions) / 60)} min
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Quiz Summary:</span> {quizMCQs.length} questions · ~
              {Math.round((timePerQuestion * Math.min(numQuestions, quizMCQs.length)) / 60)}{' '}
              minutes
            </p>
          </div>

          <Button
            onClick={handleStartQuiz}
            disabled={quizMCQs.length === 0}
            size="lg"
            className="w-full"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
