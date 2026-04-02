import { generateText, Output } from 'ai';
import { z } from 'zod';

const MCQSchema = z.object({
  id: z.string(),
  topic: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswer: z.number().min(0).max(3),
  explanation: z.string(),
});

type MCQ = z.infer<typeof MCQSchema>;

export async function POST(req: Request) {
  try {
    const { content, topic } = await req.json();

    if (!content || !topic) {
      return Response.json(
        { error: 'Missing required fields: content and topic' },
        { status: 400 }
      );
    }

    const prompt = `You are an expert test question generator for software engineering. 
    
Based on the following educational content about "${topic}", generate exactly 5 multiple-choice questions (MCQs) in valid JSON format.

Each question must have:
- id: unique identifier (e.g., "q1", "q2", etc.)
- topic: "${topic}"
- difficulty: one of "easy", "medium", or "hard"
- question: the MCQ question text
- options: array of exactly 4 answer options
- correctAnswer: index of the correct answer (0-3)
- explanation: detailed explanation of why the correct answer is right

The JSON should be an array of objects. Make questions varied in difficulty and cover different aspects of the content.

Content to base questions on:
${content}

Return ONLY valid JSON array with no markdown formatting or code blocks.`;

    const result = await generateText({
      model: 'openai/gpt-5-mini',
      prompt,
      system:
        'You are a JSON generator. Return only valid JSON, no markdown, no code blocks.',
      temperature: 0.7,
      maxTokens: 4000,
    });

    // Parse the response as JSON
    const jsonText = result.text.trim();
    let mcqs: MCQ[];

    try {
      mcqs = JSON.parse(jsonText);
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON array from the response
      const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return Response.json(
          { error: 'Failed to parse generated questions as JSON' },
          { status: 500 }
        );
      }
      mcqs = JSON.parse(jsonMatch[0]);
    }

    // Validate and transform the response
    const validatedMCQs = mcqs.map((mcq: any) => {
      // Ensure correctAnswer is a number
      const correctAnswerIndex = Array.isArray(mcq.options)
        ? mcq.options.findIndex(
            (opt: string) =>
              opt.toLowerCase() === (mcq.correctAnswer?.toLowerCase?.() || '')
          )
        : Number(mcq.correctAnswer);

      return {
        id: mcq.id || `${topic}-${Math.random().toString(36).substr(2, 9)}`,
        topic: mcq.topic || topic,
        difficulty: mcq.difficulty || 'medium',
        question: mcq.question,
        options: Array.isArray(mcq.options) ? mcq.options : [],
        correctAnswer:
          correctAnswerIndex >= 0 ? correctAnswerIndex : mcq.correctAnswer || 0,
        explanation: mcq.explanation || '',
      };
    });

    return Response.json({ mcqs: validatedMCQs });
  } catch (error) {
    console.error('Error generating MCQs:', error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate MCQs',
      },
      { status: 500 }
    );
  }
}
