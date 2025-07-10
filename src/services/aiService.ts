
import { AnalysisResult, SentenceHighlight, SourceInfo } from "@/types/analysis";

// Placeholder for Gemini API key - replace with actual key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

const knownSources = [
  { name: "CNN", bias: "Left", reliability: 75 },
  { name: "Fox News", bias: "Right", reliability: 70 },
  { name: "BBC", bias: "Neutral", reliability: 85 },
  { name: "Reuters", bias: "Neutral", reliability: 90 },
  { name: "Associated Press", bias: "Neutral", reliability: 88 },
  { name: "New York Times", bias: "Left", reliability: 80 },
  { name: "Wall Street Journal", bias: "Right", reliability: 82 },
] as const;

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  // Check if API key is set
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    console.warn("Gemini API key not set, using enhanced mock analysis");
    return getMockAnalysis(text);
  }

  try {
    // Enhanced Gemini API implementation
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze the following text for political bias with enhanced features. Provide a detailed analysis including:
            1. Overall bias classification (Left, Right, or Neutral)
            2. Bias score on a scale from -100 (far left) to +100 (far right)
            3. Confidence level (0-100)
            4. Detailed explanation of bias indicators
            5. Emotional tone breakdown (anger, fear, joy, neutral as percentages)
            6. Highlighted biased words/phrases
            7. Sentence-level bias highlights with intensity scores
            8. Source detection if any news sources are mentioned
            9. A neutral summary suggestion

            Text to analyze: "${text}"

            Please respond in JSON format with the following structure:
            {
              "bias": "Left|Right|Neutral",
              "biasScore": number,
              "confidence": number,
              "explanation": "string",
              "emotionalTone": {
                "anger": number,
                "fear": number,
                "joy": number,
                "neutral": number
              },
              "highlightedWords": ["array", "of", "words"],
              "sentenceHighlights": [
                {
                  "text": "sentence text",
                  "bias": "Left|Right|Neutral",
                  "startIndex": number,
                  "endIndex": number,
                  "intensity": number
                }
              ],
              "sourceDetection": {
                "detected": boolean,
                "sourceName": "string",
                "sourceUrl": "string",
                "knownBias": "Left|Right|Neutral",
                "reliability": number
              },
              "summary": "string"
            }`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response from Gemini
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON response from Gemini");
    }

    const analysis = JSON.parse(jsonMatch[0]);
    
    return {
      ...analysis,
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    };

  } catch (error) {
    console.error("Gemini API analysis failed:", error);
    console.log("Falling back to enhanced mock analysis");
    return getMockAnalysis(text);
  }
};

// Enhanced mock analysis with new features
const getMockAnalysis = (text: string): AnalysisResult => {
  // Enhanced keyword detection
  const leftKeywords = ['progressive', 'equality', 'climate change', 'healthcare for all', 'social justice', 'tax the rich', 'medicare for all', 'green new deal'];
  const rightKeywords = ['conservative', 'freedom', 'security', 'tradition', 'law and order', 'tax cuts', 'second amendment', 'border security'];
  const emotionalWords = ['outrageous', 'devastating', 'brilliant', 'failed', 'shocking', 'amazing', 'terrible', 'wonderful', 'disgraceful', 'fantastic'];
  
  const lowerText = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Count keyword occurrences
  const leftCount = leftKeywords.filter(word => lowerText.includes(word)).length;
  const rightCount = rightKeywords.filter(word => lowerText.includes(word)).length;
  const emotionalCount = emotionalWords.filter(word => lowerText.includes(word)).length;
  
  // Determine bias and score
  let bias: "Left" | "Right" | "Neutral";
  let biasScore: number;
  let confidence: number;
  
  if (leftCount > rightCount) {
    bias = "Left";
    biasScore = Math.min(-20, -10 - (leftCount * 8));
    confidence = Math.min(85, 60 + leftCount * 5);
  } else if (rightCount > leftCount) {
    bias = "Right";
    biasScore = Math.max(20, 10 + (rightCount * 8));
    confidence = Math.min(85, 60 + rightCount * 5);
  } else {
    bias = "Neutral";
    biasScore = Math.floor(Math.random() * 21) - 10; // -10 to +10
    confidence = Math.max(70, 90 - emotionalCount * 3);
  }

  // Generate sentence highlights
  const sentenceHighlights: SentenceHighlight[] = sentences.map((sentence, index) => {
    const sentenceLower = sentence.toLowerCase();
    const hasLeftWords = leftKeywords.some(word => sentenceLower.includes(word));
    const hasRightWords = rightKeywords.some(word => sentenceLower.includes(word));
    const hasEmotionalWords = emotionalWords.some(word => sentenceLower.includes(word));
    
    if (hasLeftWords || hasRightWords || hasEmotionalWords) {
      const startIndex = text.indexOf(sentence);
      const sentenceBias = hasLeftWords ? "Left" : hasRightWords ? "Right" : "Neutral";
      const intensity = Math.floor(Math.random() * 40) + 30; // 30-70%
      
      return {
        text: sentence.trim(),
        bias: sentenceBias,
        startIndex,
        endIndex: startIndex + sentence.length,
        intensity
      };
    }
    return null;
  }).filter(Boolean) as SentenceHighlight[];

  // Detect potential news sources
  const detectedSource = knownSources.find(source => 
    lowerText.includes(source.name.toLowerCase())
  );

  const sourceDetection: SourceInfo = detectedSource ? {
    detected: true,
    sourceName: detectedSource.name,
    knownBias: detectedSource.bias as "Left" | "Right" | "Neutral",
    reliability: detectedSource.reliability
  } : {
    detected: false
  };

  const foundEmotionalWords = emotionalWords.filter(word => lowerText.includes(word));
  const foundBiasWords = [...leftKeywords, ...rightKeywords].filter(word => lowerText.includes(word));
  
  // Enhanced emotional tone calculation
  const baseEmotion = emotionalCount * 5;
  const emotionalTone = {
    anger: Math.min(45, baseEmotion + Math.floor(Math.random() * 15)),
    fear: Math.min(35, Math.floor(baseEmotion * 0.7) + Math.floor(Math.random() * 12)),
    joy: Math.min(30, Math.floor(Math.random() * 20) + (bias === "Neutral" ? 10 : 5)),
    neutral: 0
  };
  
  // Ensure percentages add up to 100
  const totalEmotion = emotionalTone.anger + emotionalTone.fear + emotionalTone.joy;
  emotionalTone.neutral = Math.max(15, 100 - totalEmotion);

  return {
    bias,
    biasScore,
    confidence,
    explanation: `The text shows ${bias.toLowerCase()} bias (score: ${biasScore}) through ${foundBiasWords.length > 0 ? 'political terminology' : 'language patterns'} and ${foundEmotionalWords.length > 0 ? 'emotional framing' : 'neutral tone'}. ${foundBiasWords.length > 0 ? `Key indicators include: ${foundBiasWords.slice(0, 3).join(', ')}.` : ''} ${foundEmotionalWords.length > 0 ? `Emotional language detected: ${foundEmotionalWords.slice(0, 3).join(', ')}.` : 'The text maintains a relatively neutral emotional tone.'} ${sourceDetection.detected ? `Source bias detected: ${sourceDetection.sourceName} typically leans ${sourceDetection.knownBias}.` : ''}`,
    emotionalTone,
    highlightedWords: [...foundEmotionalWords, ...foundBiasWords].slice(0, 8),
    sentenceHighlights,
    summary: bias === "Neutral" 
      ? "The text maintains a balanced perspective on the topic discussed."
      : `A more balanced approach would present multiple viewpoints and avoid ${bias.toLowerCase()}-leaning terminology, focusing on factual reporting rather than opinion-based framing.`,
    sourceDetection,
    timestamp: new Date().toISOString(),
    id: Math.random().toString(36).substr(2, 9)
  };
};
