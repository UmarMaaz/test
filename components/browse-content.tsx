'use client';

import { useState, useMemo } from 'react';
import type { MCQ } from '@/lib/mcq-data';
import { TopicSelector } from '@/components/topic-selector';
import { MCQList } from '@/components/mcq-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BrowseContentProps {
  allMCQs: MCQ[];
  allTopics: string[];
}

export function BrowseContent({ allMCQs, allTopics }: BrowseContentProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(allTopics);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const filteredMCQs = useMemo(() => {
    if (selectedTopics.length === 0) return [];
    return allMCQs.filter((mcq) => selectedTopics.includes(mcq.topic));
  }, [allMCQs, selectedTopics]);

  const handleAnswerSelect = (mcqId: string, selectedIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [mcqId]: selectedIndex,
    }));
  };

  const stats = useMemo(() => {
    const answered = Object.keys(selectedAnswers).length;
    const correct = Object.entries(selectedAnswers).filter(([mcqId, selectedIndex]) => {
      const mcq = allMCQs.find((m) => m.id === mcqId);
      return mcq && selectedIndex === mcq.correctAnswer;
    }).length;

    return {
      total: filteredMCQs.length,
      answered,
      correct,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    };
  }, [selectedAnswers, filteredMCQs, allMCQs]);

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <TopicSelector
              topics={allTopics}
              selectedTopics={selectedTopics}
              onTopicsChange={setSelectedTopics}
              showCount
            />
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Your Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Questions</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Answered</p>
              <p className="text-2xl font-bold text-blue-600">{stats.answered}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Correct</p>
              <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
            </div>
            {stats.answered > 0 && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.accuracy}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Questions ({filteredMCQs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredMCQs.length > 0 ? (
              <MCQList
                mcqs={filteredMCQs}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswers={selectedAnswers}
                itemsPerPage={0}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No questions available. Please select at least one topic.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
