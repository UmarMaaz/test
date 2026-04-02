'use client';

import { useMemo, useState } from 'react';
import type { MCQ } from '@/lib/mcq-data';
import { MCQCard } from '@/components/mcq-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MCQListProps {
  mcqs: MCQ[];
  onAnswerSelect?: (mcqId: string, selectedIndex: number) => void;
  selectedAnswers?: Record<string, number>;
  itemsPerPage?: number;
}

export function MCQList({
  mcqs,
  onAnswerSelect,
  selectedAnswers = {},
  itemsPerPage = 5,
}: MCQListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMCQs = useMemo(() => {
    if (!searchQuery.trim()) return mcqs;

    const query = searchQuery.toLowerCase();
    return mcqs.filter(
      (mcq) =>
        mcq.question.toLowerCase().includes(query) ||
        mcq.topic.toLowerCase().includes(query) ||
        mcq.options.some((opt) => opt.toLowerCase().includes(query))
    );
  }, [mcqs, searchQuery]);

  const totalPages = Math.ceil(filteredMCQs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMCQs = filteredMCQs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <Input
          type="text"
          placeholder="Search questions by keyword or topic..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
        />
        {filteredMCQs.length !== mcqs.length && (
          <p className="text-xs text-gray-500 mt-2">
            Found {filteredMCQs.length} question
            {filteredMCQs.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Questions */}
      {paginatedMCQs.length > 0 ? (
        <div className="space-y-4">
          {paginatedMCQs.map((mcq, index) => (
            <div key={mcq.id}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  {startIndex + index + 1}
                </span>
                {selectedAnswers[mcq.id] !== undefined && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Answered
                  </span>
                )}
              </div>
              <MCQCard
                mcq={mcq}
                onAnswerSelect={(selectedIndex) =>
                  onAnswerSelect?.(mcq.id, selectedIndex)
                }
                selectedAnswer={selectedAnswers[mcq.id] ?? null}
                showAnswer={selectedAnswers[mcq.id] !== undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions found matching your search.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              <ChevronLeft size={16} />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                .map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
            </div>
            <Button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
