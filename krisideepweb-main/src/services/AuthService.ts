import { User, userFromJson, userToJson } from '../models';

class AuthService {
  private isLoggedIn = false;
  private currentUser: User | null = null;

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Send OTP to phone number - Mock implementation
  async sendOTP(phoneNumber: string): Promise<string> {
    try {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Mock verification ID
      return 'mock_verification_id';
    } catch (error) {
      throw new Error(`Failed to send OTP: ${error}`);
    }
  }

  // Verify OTP - Mock implementation
  async verifyOTP(verificationId: string, smsCode: string): Promise<User | null> {
    try {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Accept demo OTP 123456
      if (smsCode === '123456') {
        this.currentUser = {
          uid: 'demo_user_123',
          phoneNumber: '+91234567890',
          displayName: 'Demo User',
          lastLogin: new Date(),
        };
        this.isLoggedIn = true;
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userToJson(this.currentUser)));
        localStorage.setItem('isLoggedIn', 'true');
        
        return this.currentUser;
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      throw new Error(`OTP verification failed: ${error}`);
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      this.currentUser = null;
      this.isLoggedIn = false;
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    } catch (error) {
      throw new Error(`Sign out failed: ${error}`);
    }
  }

  // Initialize auth state from localStorage
  initializeAuth(): void {
    try {
      const storedUser = localStorage.getItem('user');
      const storedLoginState = localStorage.getItem('isLoggedIn');
      
      if (storedUser && storedLoginState === 'true') {
        this.currentUser = userFromJson(JSON.parse(storedUser));
        this.isLoggedIn = true;
      }
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
      // Clear invalid data
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }
}

// Create a singleton instance
export const authService = new AuthService();
