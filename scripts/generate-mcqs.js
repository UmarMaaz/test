import fs from 'fs';
import path from 'path';

// Sample MCQ data structure - this will be populated by the AI generation
// For now, we'll create a comprehensive set of MCQs based on the PDF content

const sampleMCQs = [
  {
    id: 'q1',
    topic: 'Software Engineering Fundamentals',
    difficulty: 'easy',
    question:
      'What is the primary difference between software engineering and programming?',
    options: [
      'Programming is just writing code, while software engineering is a systematic approach to develop reliable software',
      'Software engineering only deals with hardware',
      'Programming is more important than software engineering',
      'There is no difference between the two terms',
    ],
    correctAnswer: 0,
    explanation:
      'Software engineering is the systematic approach to developing software using engineering principles, while programming is just one part of the process that involves writing code.',
  },
  {
    id: 'q2',
    topic: 'Software Process Models',
    difficulty: 'medium',
    question:
      'Which software process model is best suited when requirements are well-defined and unlikely to change?',
    options: [
      'Iterative/Evolutionary Model',
      'Waterfall Model',
      'Spiral Model',
      'Agile Model',
    ],
    correctAnswer: 1,
    explanation:
      'The Waterfall Model is a linear, sequential approach best suited for projects with clear, fixed requirements. It progresses through distinct phases without going back.',
  },
  {
    id: 'q3',
    topic: 'Software Process Models',
    difficulty: 'medium',
    question:
      'Which model is particularly focused on identifying and managing risks early in development?',
    options: [
      'Waterfall Model',
      'Iterative Model',
      'Spiral Model',
      'Rapid Application Development',
    ],
    correctAnswer: 2,
    explanation:
      'The Spiral Model emphasizes risk analysis at every stage. It combines sequential and iterative development with particular focus on identifying and mitigating risks.',
  },
  {
    id: 'q4',
    topic: 'Agile Software Development',
    difficulty: 'easy',
    question: 'What is a Sprint in the Scrum framework?',
    options: [
      'A single code commit',
      'A fixed-length iteration cycle, usually 2-4 weeks',
      'A meeting with the customer',
      'A type of testing phase',
    ],
    correctAnswer: 1,
    explanation:
      'In Scrum, a Sprint is a fixed-length iteration cycle (typically 2-4 weeks) during which the team works on developing features and delivering working software.',
  },
  {
    id: 'q5',
    topic: 'Agile Software Development',
    difficulty: 'medium',
    question: 'What is the primary purpose of a Daily Stand-up in Agile?',
    options: [
      'To review the entire project scope',
      'To discuss progress, roadblocks, and coordinate the team',
      'To conduct performance reviews',
      'To plan the next fiscal quarter',
    ],
    correctAnswer: 1,
    explanation:
      'A Daily Stand-up is a short daily meeting where the team discusses their progress, what they plan to do, and any obstacles they face to coordinate efforts.',
  },
  {
    id: 'q6',
    topic: 'Software Requirements Engineering',
    difficulty: 'easy',
    question: 'What are Functional Requirements?',
    options: [
      'Non-technical requirements about system performance',
      'Requirements about what the system must do - specific features and functions',
      'Requirements about the users of the system',
      'Requirements for testing the system',
    ],
    correctAnswer: 1,
    explanation:
      'Functional Requirements specify what the system should do - the features, functions, and services it must provide to the user.',
  },
  {
    id: 'q7',
    topic: 'Software Requirements Engineering',
    difficulty: 'medium',
    question:
      'Which of the following is an example of a Non-Functional Requirement?',
    options: [
      'The system should allow users to create accounts',
      'The system should process transactions within 2 seconds',
      'The system should display user profiles',
      'The system should send email notifications',
    ],
    correctAnswer: 1,
    explanation:
      'Non-Functional Requirements specify how the system performs - including performance, security, reliability, and scalability constraints.',
  },
  {
    id: 'q8',
    topic: 'Problem Solving & Algorithms',
    difficulty: 'medium',
    question: 'What is the time complexity of a linear search algorithm?',
    options: [
      'O(log n)',
      'O(n)',
      'O(n²)',
      'O(1)',
    ],
    correctAnswer: 1,
    explanation:
      'Linear search checks each element sequentially, so in the worst case it must check all n elements, resulting in O(n) time complexity.',
  },
  {
    id: 'q9',
    topic: 'Problem Solving & Algorithms',
    difficulty: 'hard',
    question:
      'Which sorting algorithm has the best average-case time complexity?',
    options: [
      'Bubble Sort - O(n²)',
      'Merge Sort - O(n log n)',
      'Selection Sort - O(n²)',
      'Insertion Sort - O(n²)',
    ],
    correctAnswer: 1,
    explanation:
      'Merge Sort and Quick Sort both have O(n log n) average time complexity, making them among the most efficient sorting algorithms.',
  },
  {
    id: 'q10',
    topic: 'Data Structures',
    difficulty: 'easy',
    question: 'Which data structure follows the LIFO principle?',
    options: [
      'Queue',
      'Stack',
      'Array',
      'Linked List',
    ],
    correctAnswer: 1,
    explanation:
      'A Stack follows the Last-In-First-Out (LIFO) principle where the last element added is the first one to be removed.',
  },
];

function generateMCQsFile() {
  try {
    const outputPath = path.join(process.cwd(), 'lib', 'mcq-data.ts');

    const content = `// Auto-generated MCQ data
// This file contains all multiple-choice questions for the HEC National Skill Competency Test

export interface MCQ {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mcqData: MCQ[] = ${JSON.stringify(sampleMCQs, null, 2)};

export const topics = Array.from(
  new Set(mcqData.map((mcq) => mcq.topic))
).sort();

export const getMCQsByTopic = (topic: string): MCQ[] => {
  return mcqData.filter((mcq) => mcq.topic === topic);
};

export const getMCQsByDifficulty = (difficulty: MCQ['difficulty']): MCQ[] => {
  return mcqData.filter((mcq) => mcq.difficulty === difficulty);
};

export const searchMCQs = (query: string): MCQ[] => {
  const lowerQuery = query.toLowerCase();
  return mcqData.filter(
    (mcq) =>
      mcq.question.toLowerCase().includes(lowerQuery) ||
      mcq.topic.toLowerCase().includes(lowerQuery) ||
      mcq.options.some((opt) => opt.toLowerCase().includes(lowerQuery))
  );
};
`;

    fs.writeFileSync(outputPath, content);
    console.log('✓ Generated MCQ data file successfully!');
    console.log(`  Location: lib/mcq-data.ts`);
    console.log(`  Total MCQs: ${sampleMCQs.length}`);
    console.log(`  Topics: ${new Set(sampleMCQs.map((q) => q.topic)).size}`);
  } catch (error) {
    console.error('Error generating MCQ file:', error);
    process.exit(1);
  }
}

generateMCQsFile();
