
import { Users, TrendingUp, Lightbulb } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Decode Political Bias with AI
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Paste any news article or tweet to get instant bias detection, emotional tone analysis, 
        and clear explanations of why content leans left, right, or stays neutral.
      </p>
      
      <div className="flex justify-center items-center space-x-8 mb-8">
        <div className="flex items-center space-x-2 text-gray-600">
          <Users className="h-5 w-5" />
          <span className="font-medium">10K+ Analyses</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">90% Accuracy</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Lightbulb className="h-5 w-5" />
          <span className="font-medium">AI Explanations</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
