
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar } from "lucide-react";
import { AnalysisHistoryItem } from "@/types/analysis";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: AnalysisHistoryItem[];
  onDeleteItem: (id: string) => void;
  onSelectItem: (item: AnalysisHistoryItem) => void;
}

const HistoryModal = ({ isOpen, onClose, history, onDeleteItem, onSelectItem }: HistoryModalProps) => {
  const getBiasColor = (bias: "Left" | "Right" | "Neutral") => {
    switch (bias) {
      case "Left": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Right": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Analysis History</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {history.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No analysis history yet</p>
          ) : (
            history.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1" onClick={() => onSelectItem(item)}>
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={`${getBiasColor(item.bias)} px-3 py-1`}>
                          {item.bias}
                        </Badge>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                        {item.inputText.substring(0, 200)}...
                      </p>
                      <p className="text-xs text-gray-500">
                        Confidence: {item.confidence}%
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
