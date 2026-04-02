'use client';

import { useState } from 'react';
import type { MCQ } from '@/lib/mcq-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MCQCardProps {
  mcq: MCQ;
  onAnswerSelect?: (selectedIndex: number) => void;
  showAnswer?: boolean;
  selectedAnswer?: number | null;
  isQuizMode?: boolean;
}

export function MCQCard({
  mcq,
  onAnswerSelect,
  showAnswer = false,
  selectedAnswer = null,
  isQuizMode = false,
}: MCQCardProps) {
  const [expandedExplanation, setExpandedExplanation] = useState(false);

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{mcq.question}</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {mcq.topic}
              </Badge>
              <Badge className={`text-xs ${difficultyColor[mcq.difficulty]}`}>
                {mcq.difficulty.charAt(0).toUpperCase() + mcq.difficulty.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {mcq.options.map((option, index) => {
            const isCorrect = index === mcq.correctAnswer;
            const isSelected = index === selectedAnswer;
            const isClickable = !isQuizMode || selectedAnswer === null;
            let optionClasses =
              'w-full p-3 text-left border rounded-lg transition-colors ';

            if (isSelected) {
              if (isCorrect) {
                optionClasses += 'border-green-500 bg-green-50';
              } else {
                optionClasses += 'border-red-500 bg-red-50';
              }
            } else if (showAnswer && isCorrect) {
              optionClasses += 'border-green-500 bg-green-50';
            } else if (isClickable) {
              optionClasses +=
                'border-gray-200 hover:border-gray-400 hover:bg-gray-50 cursor-pointer';
            } else {
              optionClasses += 'border-gray-200 opacity-80';
            }

            return (
              <button
                key={index}
                onClick={() => isClickable && onAnswerSelect?.(index)}
                disabled={!isClickable}
                className={optionClasses}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 border rounded-full font-medium text-sm">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isQuizMode && isSelected && (
                    <span className="text-sm font-semibold">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                  {isQuizMode && !isSelected && showAnswer && isCorrect && (
                    <span className="text-sm font-semibold text-green-600">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={() => setExpandedExplanation(!expandedExplanation)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 w-full"
            >
              {expandedExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {expandedExplanation ? 'Hide' : 'Show'} Explanation
            </button>

            {expandedExplanation && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                {mcq.explanation}
              </div>
            )}
          </div>
        )}

        {!isQuizMode && onAnswerSelect && (
          <Button
            onClick={() => onAnswerSelect(mcq.correctAnswer)}
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-700 w-full"
          >
            Show Answer
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
