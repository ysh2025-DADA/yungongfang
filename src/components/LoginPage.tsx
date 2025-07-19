import React, { useState } from 'react';
import { Eye, EyeOff, User, BookOpen, Shield, GraduationCap } from 'lucide-react';

type UserMode = 'student' | 'teacher' | 'admin';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<UserMode>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false,
  });

  const modeConfig = {
    student: {
      title: '学生登录',
      icon: GraduationCap,
      color: 'bg-blue-500',
      description: '访问学习资料、提交作业、查看成绩',
    },
    teacher: {
      title: '教师登录',
      icon: BookOpen,
      color: 'bg-green-500',
      description: '发布课程、管理学生、批改作业',
    },
    admin: {
      title: '管理员登录',
      icon: Shield,
      color: 'bg-purple-500',
      description: '系统管理、用户管理、数据统计',
    },
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加登录逻辑
    console.log('登录信息:', { mode: selectedMode, ...formData });
    alert(`${modeConfig[selectedMode].title} - 登录功能待实现`);
  };

  const currentMode = modeConfig[selectedMode];
  const IconComponent = currentMode.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* 标题区域 */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            教育平台
          </h2>
          <p className="text-gray-600">
            学习、资料共享、问题解答、计划发布、成绩记录
          </p>
        </div>

        {/* 模式选择 */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex space-x-2">
            {(['student', 'teacher', 'admin'] as UserMode[]).map((mode) => {
              const config = modeConfig[mode];
              const ModeIcon = config.icon;
              return (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`flex-1 flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                    selectedMode === mode
                      ? `${config.color} text-white shadow-md`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ModeIcon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">
                    {mode === 'student' ? '学生' : mode === 'teacher' ? '教师' : '管理员'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 登录表单 */}
        <div className="bg-white rounded-lg shadow-lg p-8 border">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentMode.title}
            </h3>
            <p className="text-sm text-gray-600">
              {currentMode.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 用户名输入 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* 记住我选项 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  忘记密码？
                </a>
              </div>
            </div>

            {/* 登录按钮 */}
            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${currentMode.color} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
              >
                登录
              </button>
            </div>
          </form>

          {/* 其他选项 */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                微信登录
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                QQ登录
              </button>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center text-sm text-gray-600">
          <p>还没有账号？</p>
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            联系管理员注册
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 