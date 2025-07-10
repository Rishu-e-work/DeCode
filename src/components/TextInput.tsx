
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const TextInput = ({ inputText, setInputText, onAnalyze, isLoading }: TextInputProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'text/plain' || file.type === 'application/pdf')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInputText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInputText(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span>Text to Analyze</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <Textarea
            placeholder="Paste a news article, tweet, or any political content here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[300px] resize-none border-0 focus:ring-0 bg-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </span>
            </Button>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {inputText.length} characters
          </span>
          <Button 
            onClick={onAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Analyze Bias
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextInput;
