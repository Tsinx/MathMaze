import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserProgress } from '../types/user';

interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
  register: (username: string, password: string, displayName: string) => { success: boolean; message: string };
  login: (username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
  updateUserStats: (stats: { gamesPlayed?: number; gamesWon?: number; playTime?: number }) => void;
  updateDisplayName: (displayName: string) => void;
  deleteUser: (userId: string) => void;
}

const STORAGE_KEY = 'mathmaze_auth';
const USERS_KEY = 'mathmaze_users';

const loadUsersFromStorage = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users: User[]): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users:', e);
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      users: loadUsersFromStorage(),

      register: (username: string, password: string, displayName: string) => {
        const users = loadUsersFromStorage();
        
        if (!username.trim() || username.length < 3) {
          return { success: false, message: '用户名至少需要3个字符' };
        }
        
        if (username.length > 20) {
          return { success: false, message: '用户名不能超过20个字符' };
        }
        
        if (!password || password.length < 4) {
          return { success: false, message: '密码至少需要4个字符' };
        }
        
        if (!displayName.trim()) {
          return { success: false, message: '显示名称不能为空' };
        }

        const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (existingUser) {
          return { success: false, message: '用户名已存在' };
        }

        const newUser: User = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          username,
          password,
          displayName,
          createdAt: Date.now(),
          lastLoginAt: Date.now(),
          playTime: 0,
          gamesPlayed: 0,
          gamesWon: 0,
          achievements: [],
          progress: {
            highestLevel: 1,
            totalPoints: 0,
            unlockedOrgans: [],
            unlockedCharacters: []
          }
        };

        const updatedUsers = [...users, newUser];
        saveUsersToStorage(updatedUsers);
        
        set({ users: updatedUsers, currentUser: newUser, isAuthenticated: true });
        
        return { success: true, message: '注册成功！' };
      },

      login: (username: string, password: string) => {
        const users = loadUsersFromStorage();
        
        const user = users.find(
          u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
        );

        if (!user) {
          return { success: false, message: '用户名或密码错误' };
        }

        const updatedUser = {
          ...user,
          lastLoginAt: Date.now()
        };

        const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
        saveUsersToStorage(updatedUsers);

        set({ currentUser: updatedUser, isAuthenticated: true, users: updatedUsers });
        
        return { success: true, message: '登录成功！' };
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },

      updateUserProgress: (progressUpdate: Partial<UserProgress>) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser: User = {
          ...currentUser,
          progress: {
            ...currentUser.progress,
            ...progressUpdate
          }
        };

        const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
        saveUsersToStorage(updatedUsers);

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      updateUserStats: (stats: { gamesPlayed?: number; gamesWon?: number; playTime?: number }) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser: User = {
          ...currentUser,
          gamesPlayed: currentUser.gamesPlayed + (stats.gamesPlayed || 0),
          gamesWon: currentUser.gamesWon + (stats.gamesWon || 0),
          playTime: currentUser.playTime + (stats.playTime || 0)
        };

        const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
        saveUsersToStorage(updatedUsers);

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      updateDisplayName: (displayName: string) => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        const updatedUser: User = {
          ...currentUser,
          displayName
        };

        const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
        saveUsersToStorage(updatedUsers);

        set({ currentUser: updatedUser, users: updatedUsers });
      },

      deleteUser: (userId: string) => {
        const { currentUser, users } = get();
        const updatedUsers = users.filter(u => u.id !== userId);
        saveUsersToStorage(updatedUsers);

        if (currentUser?.id === userId) {
          set({ currentUser: null, isAuthenticated: false, users: updatedUsers });
        } else {
          set({ users: updatedUsers });
        }
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
