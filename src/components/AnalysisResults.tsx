
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Brain, Download, Share2, StickyNote, Globe, Shield } from "lucide-react";
import { AnalysisResult } from "@/types/analysis";
import BiasGauge from "./BiasGauge";
import SentenceHighlighter from "./SentenceHighlighter";
import ToneChart from "./ToneChart";
import { generatePDFReport, shareAnalysis } from "@/utils/pdfExport";
import { toast } from "@/hooks/use-toast";

interface AnalysisResultsProps {
  analysis: AnalysisResult | null;
  inputText?: string;
  onSaveNotes?: (notes: string) => void;
}

const AnalysisResults = ({ analysis, inputText = "", onSaveNotes }: AnalysisResultsProps) => {
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const getBiasColor = (bias: "Left" | "Right" | "Neutral") => {
    switch (bias) {
      case "Left": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200";
      case "Right": return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200";
      default: return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200";
    }
  };

  const handleExportPDF = async () => {
    if (analysis) {
      try {
        await generatePDFReport(analysis, inputText);
        toast({
          title: "Export successful",
          description: "Analysis report has been downloaded",
        });
      } catch (error) {
        toast({
          title: "Export failed",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    }
  };

  const handleShare = () => {
    if (analysis) {
      shareAnalysis(analysis);
      toast({
        title: "Shared successfully",
        description: "Analysis has been shared",
      });
    }
  };

  const handleSaveNotes = () => {
    if (onSaveNotes) {
      onSaveNotes(notes);
      toast({
        title: "Notes saved",
        description: "Your notes have been saved",
      });
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>Deep Analysis Results</span>
          </div>
          
          {analysis && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
              >
                <StickyNote className="h-4 w-4 mr-1" />
                Notes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
              >
                <Download className="h-4 w-4 mr-1" />
                Export PDF
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
            <AlertCircle className="h-12 w-12 mb-4 opacity-50" />
            <p className="font-medium mb-2">No analysis yet</p>
            <p className="text-sm text-center">
              Enter some text and click "Analyze Bias" to get started
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Notes Section */}
            {showNotes && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center">
                  <StickyNote className="h-4 w-4 mr-2" />
                  Personal Notes
                </h3>
                <Textarea
                  placeholder="Add your thoughts and observations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mb-2"
                />
                <Button size="sm" onClick={handleSaveNotes}>
                  Save Notes
                </Button>
              </div>
            )}

            {/* Bias Score Gauge */}
            <div>
              <h3 className="font-semibold mb-3">Bias Score</h3>
              <BiasGauge biasScore={analysis.biasScore} size="lg" />
            </div>

            <Separator />

            {/* Bias Classification */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                Political Bias Classification
              </h3>
              <div className="flex items-center space-x-3 mb-3">
                <Badge className={`${getBiasColor(analysis.bias)} px-4 py-2 text-lg font-medium`}>
                  {analysis.bias}
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {analysis.confidence}% confidence
                </span>
              </div>
            </div>

            <Separator />

            {/* Source Detection */}
            {analysis.sourceDetection?.detected && (
              <>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Source Detection
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      {analysis.sourceDetection.sourceName}
                    </Badge>
                    <Badge className={getBiasColor(analysis.sourceDetection.knownBias || "Neutral")}>
                      {analysis.sourceDetection.knownBias} bias
                    </Badge>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {analysis.sourceDetection.reliability}% reliability
                      </span>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Tabbed Content */}
            <Tabs defaultValue="highlights" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="tone">Tone Analysis</TabsTrigger>
                <TabsTrigger value="explanation">Explanation</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="highlights" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Sentence-Level Analysis</h3>
                  <SentenceHighlighter 
                    text={inputText} 
                    highlights={analysis.sentenceHighlights || []} 
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Key Biased/Emotional Words</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.highlightedWords.map((word, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tone">
                <ToneChart emotionalTone={analysis.emotionalTone} />
              </TabsContent>

              <TabsContent value="explanation">
                <div>
                  <h3 className="font-semibold mb-2">Why This Classification?</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {analysis.explanation}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div>
                  <h3 className="font-semibold mb-2">Neutral Perspective</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-400">
                    {analysis.summary}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
