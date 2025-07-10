
export interface AnalysisResult {
  bias: "Left" | "Right" | "Neutral";
  confidence: number;
  biasScore: number; // -100 to +100 scale
  explanation: string;
  emotionalTone: {
    anger: number;
    fear: number;
    joy: number;
    neutral: number;
  };
  highlightedWords: string[];
  sentenceHighlights: SentenceHighlight[];
  summary: string;
  sourceDetection?: SourceInfo;
  timestamp?: string;
  id?: string;
}

export interface SentenceHighlight {
  text: string;
  bias: "Left" | "Right" | "Neutral";
  startIndex: number;
  endIndex: number;
  intensity: number; // 0-100
}

export interface SourceInfo {
  detected: boolean;
  sourceName?: string;
  sourceUrl?: string;
  knownBias?: "Left" | "Right" | "Neutral";
  reliability?: number; // 0-100
}

export interface AnalysisHistoryItem extends AnalysisResult {
  inputText: string;
  timestamp: string;
  id: string;
  userNotes?: string;
}

export interface UserAnalyticsData {
  totalAnalyses: number;
  biasDistribution: {
    left: number;
    right: number;
    neutral: number;
  };
  monthlyTrends: Array<{
    month: string;
    count: number;
    avgBiasScore: number;
  }>;
}
