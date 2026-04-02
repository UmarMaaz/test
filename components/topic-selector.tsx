'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TopicSelectorProps {
  topics: string[];
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
  showCount?: boolean;
}

export function TopicSelector({
  topics,
  selectedTopics,
  onTopicsChange,
  showCount = true,
}: TopicSelectorProps) {
  const toggleTopic = (topic: string) => {
    const updated = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    onTopicsChange(updated);
  };

  const selectAll = () => {
    onTopicsChange(selectedTopics.length === topics.length ? [] : topics);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filter by Topic</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={selectAll}
          className="text-xs"
        >
          {selectedTopics.length === topics.length ? 'Clear All' : 'Select All'}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <Button
              key={topic}
              onClick={() => toggleTopic(topic)}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              className="text-sm"
            >
              {topic}
            </Button>
          );
        })}
      </div>

      {showCount && selectedTopics.length > 0 && (
        <p className="text-xs text-gray-500">
          {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''}{' '}
          selected
        </p>
      )}
    </div>
  );
}
