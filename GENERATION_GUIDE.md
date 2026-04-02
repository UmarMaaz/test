# MCQ Bank Generation Guide

## Current Status
- **Questions in Database**: 101 questions
- **Topics Covered**: 10 (Software Engineering Fundamentals, Process Models, Requirements, Design, Architecture, UI/UX, Data Communication, Networks, Cloud, Cybersecurity)
- **Target**: 500-1000 total questions

## How to Generate More Questions

### Option 1: Use AI SDK with Bulk Generation Script (Recommended)

We've created a powerful bulk generation script that uses OpenAI's GPT-4 to generate hundreds of questions at once.

#### Prerequisites
1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Set the environment variable: `OPENAI_API_KEY=your_api_key`

#### Run the Generation Script
```bash
# Generate 500-700 additional questions (70 per topic × 10 topics)
npm run generate:mcqs
```

The script will:
- Generate 70 questions per topic (700 total)
- Mix difficulty levels: 30% easy, 50% medium, 20% hard
- Each question has 4 options with detailed explanations
- Take 5-10 minutes depending on API speed
- Cost: ~$20-30 in API usage

#### Script Features
- **Automatic validation**: Ensures proper question structure
- **ID sequencing**: Automatically assigns unique IDs
- **Statistics**: Prints a summary of generated questions
- **Error handling**: Recovers gracefully if generation fails partway

### Option 2: Manual Addition

Add questions directly to `/lib/mcq-data.ts`:

```typescript
{
  id: 'q102',
  topic: 'Software Engineering Fundamentals',
  difficulty: 'medium',
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0, // Index of correct option (0-3)
  explanation: 'Detailed explanation...'
},
```

### Option 3: Use the PDF-Based Generation

The application has a PDF parser that can extract content from `test.pdf`:

```bash
# Extract text from PDF (creates parsed content)
node scripts/parse-pdf.js
```

Then use the parsed content with the AI SDK to generate contextual questions.

## Question Quality Guidelines

When generating or adding questions, ensure:

1. **Relevance**: Questions relate to the HEC National Skill Competency Test
2. **Clarity**: Questions are unambiguous and have only one correct answer
3. **Variety**: Mix different types (definition, scenario-based, problem-solving)
4. **Difficulty Distribution**:
   - Easy: ~30% - Basic definitions and concepts
   - Medium: ~50% - Application and understanding
   - Hard: ~20% - Analysis and synthesis
5. **Options**: All 4 options should be plausible
6. **Explanations**: Detailed and educational

## Topic Distribution (Current vs Target)

| Topic | Current | Target | Gap |
|-------|---------|--------|-----|
| Software Engineering Fundamentals | 10 | 60-70 | +50-60 |
| Software Process Models | 10 | 60-70 | +50-60 |
| Requirements Engineering | 10 | 60-70 | +50-60 |
| Software Design | 10 | 60-70 | +50-60 |
| Software Architecture | 10 | 60-70 | +50-60 |
| UI/UX Design | 10 | 60-70 | +50-60 |
| Data Communication | 10 | 50-60 | +40-50 |
| Computer Networks | 10 | 50-60 | +40-50 |
| Cloud Computing | 10 | 50-60 | +40-50 |
| Cybersecurity | 11 | 100-120 | +89-109 |

## API Costs

**Option 1 (AI Generation)**: ~$20-30 for 600+ questions
- Model: GPT-4-Turbo
- Per 100 questions: ~$3-5

## Testing After Generation

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Navigate to `/browse` to see all questions
4. Navigate to `/quiz` to test the quiz mode
5. Use search and filters to verify questions are properly indexed

## Performance Notes

- 600+ questions will not impact performance
- Questions are loaded once on app startup
- Search remains fast due to in-memory filtering
- Pagination handles large datasets efficiently

## Next Steps

1. Choose an option above to generate more questions
2. Verify questions display correctly in the app
3. Test the quiz mode with the expanded question bank
4. Consider organizing questions with difficulty-based quiz presets

---

**Need Help?**
- Check the application at `/browse` to see current questions
- Use `/quiz` to test the quiz functionality
- Questions failing validation will be logged to console

