import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateText } from 'ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize AI model
const model = 'openai/gpt-4-turbo';

const topics = [
  'Software Engineering Fundamentals',
  'Software Process Models',
  'Requirements Engineering',
  'Software Design',
  'Software Architecture',
  'UI/UX Design',
  'Data Communication',
  'Computer Networks',
  'Cloud Computing',
  'Cybersecurity',
];

const questionsPerTopic = 70; // 70 * 10 = 700 questions total

async function generateQuestionsForTopic(topic, startId) {
  console.log(`\n🔄 Generating ${questionsPerTopic} questions for: ${topic}...`);

  const prompt = `You are an expert exam question generator for the HEC National Skill Competency Test for IT Graduates.

Generate exactly ${questionsPerTopic} multiple-choice questions for the topic: "${topic}"

Requirements:
- Each question must be realistic and relevant to IT competency assessment
- Mix difficulty levels: 30% easy, 50% medium, 20% hard
- Each question must have exactly 4 options (A, B, C, D)
- Only ONE option should be correct
- Include detailed explanations for each answer
- Questions should test understanding, not just memorization
- Avoid trick questions
- Be diverse in question types and content within the topic

Return ONLY a valid JSON array with this exact structure (no markdown, no extra text):
[
  {
    "id": "q1",
    "topic": "${topic}",
    "difficulty": "easy|medium|hard",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why this is correct..."
  },
  ...more questions...
]

Start question IDs from q${startId} and increment sequentially.`;

  try {
    const result = await generateText({
      model,
      prompt,
      temperature: 0.7,
      maxTokens: 20000,
    });

    // Parse the response
    const jsonMatch = result.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error(`❌ Failed to parse JSON for topic: ${topic}`);
      return [];
    }

    const questions = JSON.parse(jsonMatch[0]);
    
    // Validate and fix questions
    return questions.map((q, idx) => ({
      ...q,
      id: `q${startId + idx}`,
      topic,
      options: Array.isArray(q.options) ? q.options.slice(0, 4) : [],
      correctAnswer: Math.min(Math.max(0, q.correctAnswer || 0), 3),
      difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty)
        ? q.difficulty
        : 'medium',
    }));
  } catch (error) {
    console.error(`❌ Error generating questions for ${topic}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('🚀 Starting bulk MCQ generation...');
  console.log(`📊 Target: ${questionsPerTopic * topics.length} total questions across ${topics.length} topics\n`);

  const allQuestions = [];
  let currentId = 1;

  for (const topic of topics) {
    const questions = await generateQuestionsForTopic(topic, currentId);
    if (questions.length > 0) {
      allQuestions.push(...questions);
      currentId += questions.length;
      console.log(`✅ Generated ${questions.length} questions for ${topic}`);
      
      // Small delay between API calls to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n📈 Total questions generated: ${allQuestions.length}`);

  // Write to file
  const outputPath = path.join(__dirname, '../lib/mcq-data.ts');
  
  const fileContent = `// Auto-generated MCQ data
// This file contains all multiple-choice questions for the HEC National Skill Competency Test
// Generated from test.pdf using AI-powered question generation

export interface MCQ {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mcqData: MCQ[] = ${JSON.stringify(allQuestions, null, 2)};

export const TOPICS = [
  'Software Engineering Fundamentals',
  'Software Process Models',
  'Requirements Engineering',
  'Software Design',
  'Software Architecture',
  'UI/UX Design',
  'Data Communication',
  'Computer Networks',
  'Cloud Computing',
  'Cybersecurity',
];

export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

export function getQuestionsByTopic(topic: string): MCQ[] {
  return mcqData.filter(q => q.topic === topic);
}

export function getQuestionsByDifficulty(difficulty: string): MCQ[] {
  return mcqData.filter(q => q.difficulty === difficulty);
}

export function searchQuestions(query: string): MCQ[] {
  const lowerQuery = query.toLowerCase();
  return mcqData.filter(
    q =>
      q.question.toLowerCase().includes(lowerQuery) ||
      q.options.some(opt => opt.toLowerCase().includes(lowerQuery)) ||
      q.topic.toLowerCase().includes(lowerQuery)
  );
}

export function getRandomQuestions(count: number, topic?: string): MCQ[] {
  let source = topic ? getQuestionsByTopic(topic) : mcqData;
  
  if (count >= source.length) return [...source];
  
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuestionStats() {
  const stats = {
    total: mcqData.length,
    byTopic: {} as Record<string, number>,
    byDifficulty: {} as Record<string, number>,
  };

  mcqData.forEach(q => {
    stats.byTopic[q.topic] = (stats.byTopic[q.topic] || 0) + 1;
    stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
  });

  return stats;
}
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`\n✅ Successfully wrote ${allQuestions.length} questions to ${outputPath}`);

  // Print statistics
  const stats = {
    total: allQuestions.length,
    byTopic: {},
    byDifficulty: {},
  };

  allQuestions.forEach(q => {
    stats.byTopic[q.topic] = (stats.byTopic[q.topic] || 0) + 1;
    stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
  });

  console.log('\n📊 Statistics:');
  console.log(`Total Questions: ${stats.total}`);
  console.log('\nBy Topic:');
  Object.entries(stats.byTopic).forEach(([topic, count]) => {
    console.log(`  - ${topic}: ${count}`);
  });
  console.log('\nBy Difficulty:');
  Object.entries(stats.byDifficulty).forEach(([difficulty, count]) => {
    console.log(`  - ${difficulty}: ${count}`);
  });
}

main().catch(console.error);
