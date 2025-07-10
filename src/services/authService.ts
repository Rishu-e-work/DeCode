
// Mock auth service - replace with Supabase
interface User {
  email: string;
  id: string;
}

class AuthService {
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  async login(email: string, password: string): Promise<User> {
    // Mock login - replace with Supabase auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    const user = { email, id: Math.random().toString(36) };
    this.user = user;
    this.notifyListeners();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async signup(email: string, password: string): Promise<User> {
    // Mock signup - replace with Supabase auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    const user = { email, id: Math.random().toString(36) };
    this.user = user;
    this.notifyListeners();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async logout(): Promise<void> {
    this.user = null;
    this.notifyListeners();
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    if (!this.user) {
      const stored = localStorage.getItem('user');
      if (stored) {
        this.user = JSON.parse(stored);
      }
    }
    return this.user;
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user));
  }
}

export const authService = new AuthService();
