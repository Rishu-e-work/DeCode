import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Moon, Sun, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TextInput from "@/components/TextInput";
import AnalysisResults from "@/components/AnalysisResults";
import HistoryModal from "@/components/HistoryModal";
import LoginModal from "@/components/LoginModal";
import LandingPage from "@/components/LandingPage";
import BiasAnalytics from "@/components/BiasAnalytics";
import { AnalysisResult, AnalysisHistoryItem, UserAnalyticsData } from "@/types/analysis";
import { analyzeText } from "@/services/aiService";
import { authService } from "@/services/authService";
import { historyService } from "@/services/historyService";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [analyticsData, setAnalyticsData] = useState<UserAnalyticsData | null>(null);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (user) {
      const userHistory = await historyService.getHistory(user.id);
      setHistory(userHistory);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Please enter some text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await analyzeText(inputText);
      setAnalysis(result);
      
      // Save to history if user is logged in
      if (user && result.id) {
        const historyItem: AnalysisHistoryItem = {
          ...result,
          inputText,
          timestamp: new Date().toISOString(),
          id: result.id
        };
        await historyService.saveAnalysis(user.id, historyItem);
        await loadHistory();
      }
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await authService.login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await authService.signup(email, password);
      toast({
        title: "Account created",
        description: "Welcome to DeCode!",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setHistory([]);
    setAnalysis(null);
    setInputText("");
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const handleDeleteHistoryItem = async (id: string) => {
    if (user) {
      await historyService.deleteAnalysis(user.id, id);
      await loadHistory();
      toast({
        title: "Analysis deleted",
      });
    }
  };

  const handleSelectHistoryItem = (item: AnalysisHistoryItem) => {
    setInputText(item.inputText);
    setAnalysis(item);
    setShowHistory(false);
  };

  const generateAnalyticsData = (historyItems: AnalysisHistoryItem[]): UserAnalyticsData => {
    const totalAnalyses = historyItems.length;
    const biasDistribution = {
      left: historyItems.filter(item => item.bias === "Left").length,
      right: historyItems.filter(item => item.bias === "Right").length,
      neutral: historyItems.filter(item => item.bias === "Neutral").length,
    };

    // Generate monthly trends (mock data for now)
    const monthlyTrends = [
      { month: "Jan", count: Math.floor(Math.random() * 10), avgBiasScore: Math.floor(Math.random() * 40) - 20 },
      { month: "Feb", count: Math.floor(Math.random() * 10), avgBiasScore: Math.floor(Math.random() * 40) - 20 },
      { month: "Mar", count: Math.floor(Math.random() * 10), avgBiasScore: Math.floor(Math.random() * 40) - 20 },
      { month: "Apr", count: totalAnalyses, avgBiasScore: historyItems.reduce((sum, item) => sum + (item.biasScore || 0), 0) / totalAnalyses || 0 },
    ];

    return { totalAnalyses, biasDistribution, monthlyTrends };
  };

  const handleSaveNotes = async (notes: string) => {
    if (user && analysis?.id) {
      const updatedHistory = history.map(item => 
        item.id === analysis.id ? { ...item, userNotes: notes } : item
      );
      setHistory(updatedHistory);
      // In a real app, this would save to the backend
      await historyService.saveAnalysis(user.id, { ...analysis, userNotes: notes } as AnalysisHistoryItem);
    }
  };

  useEffect(() => {
    if (history.length > 0) {
      setAnalyticsData(generateAnalyticsData(history));
    }
  }, [history]);

  // Show landing page if user is not logged in
  if (!user) {
    return (
      <>
        <LandingPage onLogin={() => setShowLogin(true)} />
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      </>
    );
  }

  // Show main analyzer interface for logged-in users
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300`}>
      <Header
        onShowHistory={() => setShowHistory(true)}
        isAuthenticated={!!user}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        userEmail={user?.email}
      />

      {/* Dark Mode Toggle */}
      <div className="fixed top-20 right-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDarkMode}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <HeroSection />

        <Tabs defaultValue="analyzer" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="analyzer">Bias Analyzer</TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TextInput
                inputText={inputText}
                setInputText={setInputText}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
              <AnalysisResults 
                analysis={analysis} 
                inputText={inputText}
                onSaveNotes={handleSaveNotes}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            {analyticsData ? (
              <BiasAnalytics analyticsData={analyticsData} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No analytics data yet. Start analyzing some text to see your patterns!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium mb-1">Important Disclaimer</p>
                  <p>
                    AI analysis may not be 100% accurate. This tool is designed to promote media literacy 
                    and critical thinking, not to make definitive judgments about content bias. 
                    Always consider multiple perspectives and sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onDeleteItem={handleDeleteHistoryItem}
        onSelectItem={handleSelectHistoryItem}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default Index;
