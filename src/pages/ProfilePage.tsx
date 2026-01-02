import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProfilePage = () => {
  const { currentUser, logout, updateDisplayName, deleteUser } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(currentUser?.displayName || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Prevent context menu on page (mobile long-press)
  useEffect(() => {
    const preventContextMenu = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    return () => document.removeEventListener('contextmenu', preventContextMenu);
  }, []);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveDisplayName = () => {
    if (newDisplayName.trim()) {
      updateDisplayName(newDisplayName.trim());
      showMessage('success', '显示名称已更新');
      setIsEditing(false);
    } else {
      showMessage('error', '显示名称不能为空');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    deleteUser(currentUser.id);
    navigate('/login');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    return `${minutes}分钟`;
  };

  const stats = [
    { label: '游戏场次', value: currentUser.gamesPlayed, icon: '🎮' },
    { label: '胜利场次', value: currentUser.gamesWon, icon: '🏆' },
    { label: '游戏时长', value: formatPlayTime(currentUser.playTime), icon: '⏱️' },
    { label: '最高关卡', value: `第${currentUser.progress.highestLevel}关`, icon: '📊' },
    { label: '总积分', value: currentUser.progress.totalPoints, icon: '⭐' },
    { label: '已解锁器官', value: currentUser.progress.unlockedOrgans.length, icon: '🧬' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-6">
          <motion.button
            onClick={() => navigate('/')}
            className="mr-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <h1 className="text-3xl font-bold text-white">我的档案</h1>
        </div>

        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-5xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {currentUser.displayName.charAt(0).toUpperCase()}
              </motion.div>
              <div>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      className="text-2xl font-bold text-gray-800 border-b-2 border-purple-500 focus:outline-none"
                      autoFocus
                    />
                    <motion.button
                      onClick={handleSaveDisplayName}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ✓
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setIsEditing(false);
                        setNewDisplayName(currentUser.displayName);
                      }}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ✕
                    </motion.button>
                  </div>
                ) : (
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    {currentUser.displayName}
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-400 hover:text-purple-500 transition-colors"
                      whileHover={{ scale: 1.2 }}
                    >
                      ✏️
                    </motion.button>
                  </h2>
                )}
                <p className="text-gray-500">@{currentUser.username}</p>
                <p className="text-sm text-gray-400 mt-1">
                  创建于 {formatDate(currentUser.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">🏅 游戏进度</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div>
                <div className="font-semibold text-gray-800">已解锁器官</div>
                <div className="text-sm text-gray-500">探索更多器官系统</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {currentUser.progress.unlockedOrgans.length}/5
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <div>
                <div className="font-semibold text-gray-800">已解锁角色</div>
                <div className="text-sm text-gray-500">收集更多免疫细胞</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {currentUser.progress.unlockedCharacters.length}/6
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div>
                <div className="font-semibold text-gray-800">获得成就</div>
                <div className="text-sm text-gray-500">完成更多挑战</div>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {currentUser.achievements.length}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">⚙️ 账号设置</h3>
          
          <div className="space-y-4">
            <motion.button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              退出登录
            </motion.button>

            <motion.button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full bg-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-200 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              删除账号
            </motion.button>
          </div>
        </motion.div>

        {showDeleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚠️ 确认删除</h3>
              <p className="text-gray-600 mb-6">
                删除账号后，你的所有游戏数据、进度和成就都将被永久删除，无法恢复。你确定要继续吗？
              </p>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  取消
                </motion.button>
                <motion.button
                  onClick={handleDeleteAccount}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  确认删除
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
