export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
  avatar?: string;
  createdAt: number;
  lastLoginAt: number;
  playTime: number;
  gamesPlayed: number;
  gamesWon: number;
  achievements: string[];
  progress: UserProgress;
}

export interface UserProgress {
  highestLevel: number;
  totalPoints: number;
  unlockedOrgans: string[];
  unlockedCharacters: string[];
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
}

export type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'REGISTER_SUCCESS'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; user: User }
  | { type: 'LOAD_USERS'; users: User[] };
