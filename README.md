# HEC IT Competency Test - MCQ Practice Platform

A comprehensive, modern web application for practicing and mastering Multiple Choice Questions (MCQs) for the HEC National Skill Competency Test for IT Graduates.

## Features

### Core Features
- **Browse Questions**: Filter MCQs by topic, difficulty level, and search keywords (101+ questions, easily scalable to 500-1000+)
- **Quiz Mode**: Timed exam simulation with customizable question count and time limits (1-50 questions per quiz)
- **Performance Tracking**: Real-time statistics showing accuracy, correct/incorrect counts, topic-wise breakdown, and progress
- **Detailed Explanations**: Every question includes comprehensive explanations for learning
- **Topic Filtering**: Practice specific topics or mix multiple topics from 10 domains
- **Difficulty Levels**: Questions organized by easy, medium, and hard difficulty
- **AI Question Generation**: Built-in script to generate hundreds of additional questions using OpenAI GPT-4

### Technical Features
- Built with **Next.js 16** and **React 19** for high performance
- **TypeScript** for type safety
- **Tailwind CSS** for modern, responsive design
- **AI-Powered Question Generation** (via Vercel AI SDK)
- **Fully Responsive** - works seamlessly on desktop, tablet, and mobile
- **Server Components** for optimal performance
- **API Routes** for backend operations

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage with hero section
│   ├── browse/
│   │   └── page.tsx            # Browse questions page
│   ├── quiz/
│   │   └── page.tsx            # Quiz mode page
│   ├── api/
│   │   └── generate-mcqs/
│   │       └── route.ts        # AI-powered MCQ generation API
│   └── globals.css             # Global styles
├── components/
│   ├── mcq-card.tsx            # Individual question display
│   ├── mcq-list.tsx            # Question list with pagination
│   ├── quiz-mode.tsx           # Quiz interface with timer
│   ├── topic-selector.tsx      # Topic filter component
│   ├── browse-content.tsx      # Browse page logic
│   ├── quiz-content.tsx        # Quiz setup and results
│   ├── ui/                     # shadcn/ui components
│   └── theme-provider.tsx      # Theme configuration
├── lib/
│   └── mcq-data.ts             # MCQ database and utilities
├── scripts/
│   ├── generate-mcqs.js        # Script to generate MCQ data
│   └── parse-pdf.js            # PDF parsing utility
└── public/                     # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create .env.local file with:
# OPENAI_API_KEY=your_api_key_here (optional, for AI-powered question generation)
```

### Running the Application

#### Development
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build
```bash
pnpm build
pnpm start
```

## Data Generation

### Current MCQ Database
The application comes with **101 pre-generated MCQs** across 10 major topics:
- Software Engineering Fundamentals (10)
- Software Process Models (10)
- Requirements Engineering (10)
- Software Design (10)
- Software Architecture (10)
- UI/UX Design (10)
- Data Communication (10)
- Computer Networks (10)
- Cloud Computing (10)
- Cybersecurity (11)

### Generating 500-1000+ Questions with AI

To scale the question bank to 500-1000+ questions using OpenAI's GPT-4:

#### Step 1: Get OpenAI API Key
1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Set environment variable: `OPENAI_API_KEY=your_api_key`

#### Step 2: Run the Generation Script
```bash
npm run generate:mcqs
```

This will:
- Generate ~70 questions per topic (700 total)
- Create questions with mixed difficulty levels (30% easy, 50% medium, 20% hard)
- Each question includes 4 options and detailed explanations
- Estimated time: 5-10 minutes
- Estimated cost: $20-30

#### Step 3: Verify Generation
```bash
npm run build
npm run dev
```
Visit `/browse` to see all generated questions.

**See [GENERATION_GUIDE.md](./GENERATION_GUIDE.md) for detailed instructions and alternatives.**

## Usage Guide

### Browse Mode
1. Visit the **Browse** page from the homepage
2. Select topics using the filter sidebar
3. Questions display with pagination
4. Click on options to answer
5. Click "Show Answer" to see explanations

### Quiz Mode
1. Visit the **Quiz** page
2. Select desired topics
3. Set number of questions (1-50)
4. Adjust time per question (default: 60 seconds)
5. Click "Start Quiz"
6. Answer questions within the time limit
7. View detailed results and review your answers

## Key Components

### MCQCard
Displays individual questions with options, difficulty badges, and explanations.

### QuizMode
Full quiz interface with timer, progress tracking, and answer navigation.

### TopicSelector
Filter interface for selecting study topics.

### MCQList
Paginated question list with search functionality.

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19 + shadcn/ui
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **AI Integration**: Vercel AI SDK + OpenAI
- **PDF Processing**: pdf-parse
- **Icons**: Lucide React

## API Endpoints

### POST `/api/generate-mcqs`
Generate MCQ questions using AI.

**Request**:
```json
{
  "content": "string",
  "topic": "string"
}
```

**Response**:
```json
{
  "mcqs": [
    {
      "id": "string",
      "topic": "string",
      "difficulty": "easy|medium|hard",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": number,
      "explanation": "string"
    }
  ]
}
```

## Performance Optimizations

- **Server Components**: Default RSC for data fetching
- **Image Optimization**: Next.js Image component
- **CSS Optimization**: Tailwind purging unused styles
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Optimized caching headers

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check existing documentation
2. Open an issue with detailed description
3. Include environment details and error messages

## Future Enhancements

- User authentication and profiles
- Progress tracking across sessions
- Custom quiz creation
- Question difficulty recommendations
- Performance analytics dashboard
- Community discussion forums
- Mobile app version

## Credits

Built with Next.js, React, and TypeScript. Styled with Tailwind CSS and shadcn/ui components.

---

**Last Updated**: April 2024
**Version**: 1.0.0
