# Quick Start Guide - HEC MCQ Bank

## What You Have

✅ **101 MCQs** across 10 IT competency topics ready to use  
✅ **Browse Page** - Filter, search, and practice questions  
✅ **Quiz Mode** - Timed exams with scoring  
✅ **AI Generation Tool** - Generate 500-1000+ more questions  

## Start Using the App (2 minutes)

### 1. Install & Run
```bash
cd /vercel/share/v0-project
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Explore the Features

**Homepage** (`/`)
- Overview of the MCQ bank
- Quick navigation to browse and quiz modes
- Topic statistics

**Browse Page** (`/browse`)
- See all 101 questions
- Filter by topic (10 available)
- Filter by difficulty (easy, medium, hard)
- Search for specific topics
- Click answers to see explanations
- Pagination: 10 questions per page

**Quiz Mode** (`/quiz`)
- Full exam simulation
- Select topics to practice
- Choose number of questions (1-50)
- Adjust time per question
- Real-time scoring
- Detailed results with accuracy breakdown

## Generate 500+ More Questions (10 minutes)

### Step 1: Get OpenAI API Key
```bash
# Visit https://platform.openai.com/api-keys
# Create new key and copy it
export OPENAI_API_KEY="sk-proj-..."
```

### Step 2: Generate Questions
```bash
npm run generate:mcqs
```

⏱️ **Takes 5-10 minutes**  
💰 **Costs ~$20-30 in API usage**  
📊 **Creates: 70 questions × 10 topics = 700 questions**

### Step 3: Verify
```bash
pnpm build
pnpm dev
```

Visit `/browse` to see 800+ total questions!

## Topics Covered (10)

1. **Software Engineering Fundamentals** (10 questions → 60-70 with generation)
2. **Software Process Models** (10 → 60-70)
3. **Requirements Engineering** (10 → 60-70)
4. **Software Design** (10 → 60-70)
5. **Software Architecture** (10 → 60-70)
6. **UI/UX Design** (10 → 60-70)
7. **Data Communication** (10 → 50-60)
8. **Computer Networks** (10 → 50-60)
9. **Cloud Computing** (10 → 50-60)
10. **Cybersecurity** (11 → 100-120)

## File Structure

```
📁 app/
  ├── page.tsx          ← Homepage
  ├── browse/page.tsx   ← Browse questions
  ├── quiz/page.tsx     ← Quiz mode
  └── api/generate-mcqs/route.ts  ← AI generation API

📁 components/
  ├── mcq-card.tsx      ← Single question display
  ├── mcq-list.tsx      ← Question list view
  ├── quiz-mode.tsx     ← Quiz interface
  ├── quiz-content.tsx  ← Quiz logic
  └── browse-content.tsx ← Browse logic

📁 lib/
  └── mcq-data.ts       ← 101 questions + utilities

📁 scripts/
  └── generate-bulk-mcqs.js ← AI question generator
```

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production server
npm run generate:mcqs # Generate 500-700 more questions
```

## Tips for Best Results

### For Study
1. Start with **Easy** difficulty on `/browse`
2. Review explanations for each answer
3. Move to **Medium**, then **Hard**
4. Use `/quiz` for timed practice

### For Quiz Practice
1. Select **1-2 topics** for focused study
2. Set **60 seconds per question**
3. Aim for 80%+ accuracy
4. Review incorrect answers

### For Scaling to 1000+ Questions
- Run generation script multiple times (will append more questions)
- Cost: ~$20-30 per 700 questions
- Quality: Uses GPT-4-Turbo (high quality)

## Troubleshooting

**Port 3000 already in use:**
```bash
pnpm dev -p 3001
```

**Generation script fails:**
- Check OpenAI API key is set: `echo $OPENAI_API_KEY`
- Verify account has credits at https://platform.openai.com/account/billing/overview
- Try again - temporary API issues are common

**Questions not showing:**
```bash
pnpm build
pnpm dev
# Clear browser cache (Ctrl+Shift+Delete)
```

## Next Steps

1. **Try Browse Mode** → Visit `/browse` to see all 101 questions
2. **Take a Quiz** → Go to `/quiz` and practice
3. **Generate More** → Follow the generation steps above
4. **Deploy** → Use "Publish" button to deploy to Vercel

## Need Help?

- Check [GENERATION_GUIDE.md](./GENERATION_GUIDE.md) for detailed generation instructions
- See [README.md](./README.md) for full documentation
- All questions have detailed explanations - read them to learn!

---

**Ready?** Start with: `pnpm dev` 🚀
