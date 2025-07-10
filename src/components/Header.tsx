
import { Brain, Zap, User, LogOut, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  onShowHistory: () => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userEmail?: string;
}

const Header = ({ onShowHistory, isAuthenticated, onLogin, onLogout, userEmail }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DeCode
              </h1>
              <p className="text-sm text-gray-600">Political Bias Detective</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={onShowHistory}>
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{userEmail}</span>
                </div>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={onLogin}>
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
