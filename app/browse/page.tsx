import { Metadata } from 'next';
import { mcqData, TOPICS } from '@/lib/mcq-data';
import { BrowseContent } from '@/components/browse-content';

export const metadata: Metadata = {
  title: 'Browse MCQs - HEC IT Test',
  description:
    'Browse and practice multiple choice questions for the HEC National Skill Competency Test for IT Graduates',
};

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Questions</h1>
          <p className="text-lg text-gray-600">
            Filter and practice individual questions or take full exams
          </p>
        </div>

        <BrowseContent allMCQs={mcqData} allTopics={TOPICS} />
      </div>
    </main>
  );
}
