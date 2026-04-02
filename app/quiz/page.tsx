import { Metadata } from 'next';
import { mcqData, TOPICS } from '@/lib/mcq-data';
import { QuizContent } from '@/components/quiz-content';

export const metadata: Metadata = {
  title: 'Quiz Mode - HEC IT Test',
  description:
    'Take a timed exam to test your knowledge on the HEC National Skill Competency Test for IT Graduates',
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Mode</h1>
          <p className="text-lg text-gray-600">
            Take a timed exam to assess your knowledge
          </p>
        </div>

        <QuizContent allMCQs={mcqData} allTopics={TOPICS} />
      </div>
    </main>
  );
}
