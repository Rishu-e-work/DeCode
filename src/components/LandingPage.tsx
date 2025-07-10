
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Lightbulb, Shield, Users, Zap } from "lucide-react";

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage = ({ onLogin }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            DeCode
          </h1>
          <p className="text-xl text-gray-600 mb-4">Political Bias Detective</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
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

          <Button onClick={onLogin} size="lg" className="text-lg px-8 py-6">
            Get Started - Login to Analyze
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="text-center p-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI-Powered Detection</h3>
            <p className="text-gray-600">
              Advanced AI analyzes language patterns and framing techniques to identify political bias in real-time
            </p>
          </Card>
          
          <Card className="text-center p-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Detailed Explanations</h3>
            <p className="text-gray-600">
              Understand the "why" behind bias classifications with comprehensive examples and context
            </p>
          </Card>
          
          <Card className="text-center p-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <Lightbulb className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Media Literacy</h3>
            <p className="text-gray-600">
              Develop critical thinking skills for consuming news content and identifying information bias
            </p>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose DeCode?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Unbiased Analysis</h4>
                <p className="text-gray-600">Our AI provides objective analysis without political leanings</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Zap className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Instant Results</h4>
                <p className="text-gray-600">Get comprehensive bias analysis in seconds, not minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Save History</h4>
                <p className="text-gray-600">Keep track of all your analyses with personal history</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Brain className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Learn & Improve</h4>
                <p className="text-gray-600">Enhance your media literacy skills with every analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Analyzing?</h3>
          <p className="text-gray-600 mb-6">Join thousands of users who trust DeCode for unbiased analysis</p>
          <Button onClick={onLogin} size="lg" className="text-lg px-12 py-6">
            Login & Start Analyzing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
