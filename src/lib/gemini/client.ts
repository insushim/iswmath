// src/lib/gemini/client.ts

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 안전 설정
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// 모델 설정
export const geminiPro = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  safetySettings,
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 8192,
  },
});

export const geminiFlash = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings,
  generationConfig: {
    temperature: 0.5,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 4096,
  },
});

// 구조화된 출력을 위한 헬퍼
export async function generateStructuredOutput<T>(
  prompt: string,
  schema: object,
  useFlash: boolean = false
): Promise<T> {
  const model = useFlash ? geminiFlash : geminiPro;

  const structuredPrompt = `
${prompt}

응답은 반드시 다음 JSON 스키마를 따르는 유효한 JSON 형식으로만 출력하세요:
${JSON.stringify(schema, null, 2)}

JSON 외의 다른 텍스트는 포함하지 마세요.
`;

  const result = await model.generateContent(structuredPrompt);
  const response = result.response.text();

  // JSON 추출
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from response');
  }

  return JSON.parse(jsonMatch[0]) as T;
}

// 간단한 텍스트 생성
export async function generateText(
  prompt: string,
  useFlash: boolean = true
): Promise<string> {
  const model = useFlash ? geminiFlash : geminiPro;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// 스트리밍 응답
export async function* generateTextStream(
  prompt: string,
  useFlash: boolean = true
): AsyncGenerator<string> {
  const model = useFlash ? geminiFlash : geminiPro;
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    yield chunkText;
  }
}
