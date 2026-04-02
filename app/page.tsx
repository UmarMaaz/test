import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mcqData, TOPICS } from '@/lib/mcq-data';
import { BookOpen, Zap, Clock, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HEC IT Competency Test - MCQ Practice',
  description:
    'Prepare for the HEC National Skill Competency Test for IT Graduates with comprehensive MCQ practice. Features: timed quizzes, topic filtering, performance tracking, and detailed explanations.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Home() {
  const totalQuestions = mcqData.length;
  const totalTopics = TOPICS.length;

  return (
    <main className="min-h-screen">
      {/* Navigation Header */}
      <header className="border-b border-gray-200 bg-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
              HEC
            </div>
            <span className="text-xl font-bold text-gray-900">IT Test Prep</span>
          </div>
          <div className="flex gap-4">
            <Link href="/browse">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Link href="/quiz">
              <Button variant="ghost">Quiz</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Master the HEC IT Competency Test
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 text-balance">
              Practice with {totalQuestions}+ carefully crafted multiple-choice
              questions across {totalTopics} essential topics. Prepare with confidence
              for your career success.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Start Quiz
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Browse Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                {totalQuestions}+
              </div>
              <p className="text-gray-600 text-sm mt-1">Questions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">
                {totalTopics}
              </div>
              <p className="text-gray-600 text-sm mt-1">Topics</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600">
                3
              </div>
              <p className="text-gray-600 text-sm mt-1">Difficulty Levels</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600">
                100%
              </div>
              <p className="text-gray-600 text-sm mt-1">Free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and features designed to help you master the HEC
              IT Competency Test
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <CardTitle className="text-lg">Browse Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Filter by topic and difficulty. Learn at your own pace with
                  detailed explanations for every answer.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Clock size={24} className="text-purple-600" />
                </div>
                <CardTitle className="text-lg">Timed Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Practice under realistic exam conditions with customizable time
                  limits and question counts.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
                  <BarChart3 size={24} className="text-pink-600" />
                </div>
                <CardTitle className="text-lg">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Monitor your performance with detailed analytics and accuracy
                  metrics across all topics.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Zap size={24} className="text-green-600" />
                </div>
                <CardTitle className="text-lg">Smart Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get instant feedback, detailed explanations, and focus on areas
                  where you need improvement most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Topics Covered
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage of all essential topics for IT professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map((topic, index) => {
              const colors = [
                'bg-blue-50 border-blue-200',
                'bg-purple-50 border-purple-200',
                'bg-pink-50 border-pink-200',
                'bg-green-50 border-green-200',
                'bg-yellow-50 border-yellow-200',
                'bg-indigo-50 border-indigo-200',
              ];
              const topicColor = colors[index % colors.length];
              const count = mcqData.filter((q) => q.topic === topic).length;

              return (
                <div
                  key={topic}
                  className={`p-4 rounded-lg border ${topicColor} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{topic}</h3>
                    <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded">
                      {count} Q
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Preparing?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of IT professionals preparing for the HEC National
            Skill Competency Test. Start practicing today, completely free!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/quiz">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Take a Quiz Now
              </Button>
            </Link>
            <Link href="/browse">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Browse All Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 HEC IT Test Prep. All rights reserved.</p>
          <p className="text-sm mt-2">
            Designed to help IT professionals master the HEC National Skill
            Competency Test.
          </p>
        </div>
      </footer>
    </main>
  );
}
