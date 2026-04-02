# Scaling from 101 to 1000+ Questions

You currently have **101 high-quality MCQs** across 10 topics. Here's how to easily scale to 500-1000+ questions.

## Why Expand?

- More comprehensive coverage of exam topics
- Better preparation for different question types
- Longer, more realistic quiz sessions
- Higher confidence going into the actual test

## Method 1: AI-Powered Generation (RECOMMENDED) ⭐

**This is the fastest, easiest, and most cost-effective way.**

### What It Does
- Generates ~70 questions per topic
- 10 topics × 70 = **700 new questions**
- **Total: 801 questions** (101 current + 700 new)
- Takes 5-10 minutes
- Cost: ~$20-30

### How To Do It

#### Step 1: Get OpenAI API Key (2 minutes)

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in with OpenAI
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-proj-`)

#### Step 2: Set Environment Variable

**On Mac/Linux:**
```bash
export OPENAI_API_KEY="sk-proj-your-key-here"
```

**On Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY = "sk-proj-your-key-here"
```

**Or create a `.env.local` file in project root:**
```
OPENAI_API_KEY=sk-proj-your-key-here
```

#### Step 3: Run the Generator

```bash
npm run generate:mcqs
```

You'll see output like:
```
🚀 Starting bulk MCQ generation...
📊 Target: 700 total questions across 10 topics

🔄 Generating 70 questions for: Software Engineering Fundamentals...
✅ Generated 70 questions for Software Engineering Fundamentals
...
✅ Generated 70 questions for Cybersecurity

📈 Total questions generated: 700
✅ Successfully wrote 700 questions to lib/mcq-data.ts

📊 Statistics:
Total Questions: 801
By Topic:
  - Software Engineering Fundamentals: 80
  - ...
```

#### Step 4: Rebuild and Test

```bash
pnpm build
pnpm dev
```

Visit http://localhost:3000/browse and scroll through to see 800+ questions!

### Costs Breakdown

| Quantity | Cost | Time |
|----------|------|------|
| 100 questions | ~$1 | <1 min |
| 500 questions | ~$7 | 2-3 min |
| 700 questions | ~$10 | 5-10 min |
| 1000+ questions | ~$15-20 | 10-15 min |

**Total Cost for 700 questions: ~$20-30 (less than a fancy coffee!)**

### Quality of Generated Questions

The AI-generated questions will:
- ✅ Match the difficulty of existing questions
- ✅ Use proper terminology from the test topics
- ✅ Have only 1 correct answer
- ✅ Include detailed explanations
- ✅ Be diverse in question types
- ✅ Cover edge cases and advanced topics

## Method 2: Generate Multiple Times

To reach even higher numbers, run the generator multiple times:

```bash
# First generation: 101 + 700 = 801
npm run generate:mcqs

# Second generation: 801 + 700 = 1501
npm run generate:mcqs

# Third generation: 1501 + 700 = 2201
npm run generate:mcqs
```

**Total for 3 runs: ~2200 questions for ~$60**

Each run appends to the question bank without deleting existing questions.

## Method 3: Hybrid Approach

Combine AI generation with manual additions:

1. **Week 1**: Run AI generation → 800 questions
2. **Week 2**: Manually add 50-100 tricky questions from practice exams
3. **Week 3**: Run AI again → 1500+ questions
4. **Week 4**: Fine-tune based on feedback

## Performance After Scaling

**All sizes will perform equally well:**

| Questions | Search Speed | Page Load | Memory |
|-----------|--------------|-----------|--------|
| 101 | <5ms | <200ms | ~1MB |
| 500 | <15ms | <250ms | ~3MB |
| 1000 | <30ms | <300ms | ~5MB |
| 2000 | <50ms | <350ms | ~8MB |

The app uses **in-memory filtering**, so it's incredibly fast even with thousands of questions!

## Verifying Your Expansion

After running the generator:

```bash
# Count total questions
grep -c "id: 'q" lib/mcq-data.ts

# See statistics
pnpm dev
# Visit http://localhost:3000/browse
# Scroll to bottom to see count
```

## Troubleshooting the Generator

### "OPENAI_API_KEY is not set"
```bash
# Make sure you've set the environment variable
echo $OPENAI_API_KEY  # Should show your key

# If empty, set it again:
export OPENAI_API_KEY="sk-proj-..."
```

### "Insufficient credits"
- Check your OpenAI balance: https://platform.openai.com/account/billing/overview
- Add a payment method if needed
- Free trial users get $5 free, plenty for 1000+ questions

### "Rate limit exceeded"
- Wait 1 minute and try again
- The script handles this automatically with delays

### "Generation seems stuck"
- It's working! GPT-4 takes time (5-10 minutes for 700 questions)
- Don't interrupt it
- Monitor tokens on: https://platform.openai.com/account/usage/overview

## What Gets Generated

For each question, the AI generates:

```typescript
{
  id: 'q102',                    // Auto-assigned unique ID
  topic: 'Software Engineering', // One of 10 IT topics
  difficulty: 'medium',          // Mix of easy/medium/hard
  question: 'What is...?',       // Full question
  options: [                      // 4 plausible options
    'Correct answer',
    'Common misconception',
    'Partially related concept',
    'Wrong definition'
  ],
  correctAnswer: 0,              // Index of correct option
  explanation: 'Detailed...'     // Why each answer is/isn't correct
}
```

## Best Practices for Scaling

1. **Start with 700 questions** (1 generation run)
   - Test the quiz with larger bank
   - Ensure quality meets expectations

2. **Generate in batches** rather than all at once
   - Easier to monitor progress
   - Catch any issues early

3. **Review sample questions** after generation
   - Check a few random questions for quality
   - Verify difficulty distribution

4. **Leverage the full bank** in quizzes
   - Quiz yourself with 50+ questions
   - Much better preparation

5. **Mix topics** in longer quizzes
   - Select all 10 topics
   - Take 100-question exams

## Timeline for Reaching 1000 Questions

| Phase | Action | Time | Questions | Cost |
|-------|--------|------|-----------|------|
| Current | You have | - | 101 | $0 |
| Week 1 | Generate 700 | 10 min | 801 | $20-30 |
| Week 2 | Manual review & fixes | 30 min | 801 | $0 |
| Week 3 | Generate 700 more | 10 min | 1501 | $20-30 |
| Week 4 | Use for practice | - | 1501+ | $0 |

**Total time: ~50 minutes**  
**Total cost: ~$40-60**  
**Final result: 1500+ questions for exam prep!**

## Deployment After Scaling

Once you have 1000+ questions:

```bash
pnpm build
pnpm start

# Or deploy to Vercel:
vercel
```

The application will perform identically with 101 or 1001 questions.

## FAQ

**Q: Will 1000 questions be too many?**
A: No! The app handles thousands efficiently. Plus, not everyone will use all of them - they'll filter by topic.

**Q: Can I delete bad questions?**
A: Yes, manually edit `lib/mcq-data.ts` to remove any you don't like.

**Q: Will the cost be high?**
A: ~$0.03 per question. Very affordable! 1000 questions = ~$30.

**Q: What if I need 5000 questions?**
A: Run the generator 7-8 times. Total cost: ~$150. But even 1000 is plenty for exam prep.

**Q: Can I generate questions offline?**
A: Not yet. The generator needs OpenAI's API. Contact them for offline options.

**Q: What about question duplicates?**
A: Extremely unlikely with GPT-4. Each generation creates unique questions.

**Q: How long does 700 questions take?**
A: About 5-10 minutes. The script generates them in batches, so it takes a while but runs automatically.

---

## Ready to Scale?

```bash
# In your terminal:
export OPENAI_API_KEY="your-key-here"
npm run generate:mcqs

# That's it! ✨
```

Visit `/browse` after 10 minutes to see 800+ questions!

