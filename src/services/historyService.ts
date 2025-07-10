import { AnalysisHistoryItem } from "@/types/analysis";

// Mock history service - replace with Supabase database
class HistoryService {
  private getStorageKey(userId: string) {
    return `history_${userId}`;
  }

  async saveAnalysis(userId: string, analysis: AnalysisHistoryItem): Promise<void> {
    const key = this.getStorageKey(userId);
    const existing = localStorage.getItem(key);
    const history: AnalysisHistoryItem[] = existing ? JSON.parse(existing) : [];
    
    history.unshift(analysis);
    
    // Keep only last 50 analyses
    if (history.length > 50) {
      history.splice(50);
    }
    
    localStorage.setItem(key, JSON.stringify(history));
  }

  async getHistory(userId: string): Promise<AnalysisHistoryItem[]> {
    const key = this.getStorageKey(userId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

  async deleteAnalysis(userId: string, analysisId: string): Promise<void> {
    const key = this.getStorageKey(userId);
    const existing = localStorage.getItem(key);
    if (existing) {
      const history: AnalysisHistoryItem[] = JSON.parse(existing);
      const filtered = history.filter(item => item.id !== analysisId);
      localStorage.setItem(key, JSON.stringify(filtered));
    }
  }
}

export const historyService = new HistoryService();
