// 云工坊 GitHub 自动同步系统
// 使用 GitHub Gist 作为数据存储，实现跨设备自动同步

class GitHubSync {
    constructor() {
        this.gistId = null;
        this.token = null;
        this.isInitialized = false;
        this.syncInterval = null;
        this.lastSyncTime = null;
        
        // 从localStorage加载配置
        this.loadConfig();
    }

    // 加载配置
    loadConfig() {
        this.gistId = localStorage.getItem('github_gist_id');
        this.token = localStorage.getItem('github_token');
        this.isInitialized = !!(this.gistId && this.token);
    }

    // 保存配置
    saveConfig() {
        if (this.gistId) localStorage.setItem('github_gist_id', this.gistId);
        if (this.token) localStorage.setItem('github_token', this.token);
    }

    // 初始化GitHub同步
    async initialize(token, gistId = null) {
        try {
            this.token = token;
            
            if (gistId) {
                this.gistId = gistId;
            } else {
                // 创建新的Gist
                this.gistId = await this.createGist();
            }
            
            this.saveConfig();
            this.isInitialized = true;
            
            console.log('GitHub同步初始化成功');
            return { success: true, gistId: this.gistId };
            
        } catch (error) {
            console.error('GitHub同步初始化失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 创建新的Gist
    async createGist() {
        const initialData = {
            users: this.getDefaultUsers(),
            lastUpdate: new Date().toISOString(),
            version: '1.0'
        };

        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Authorization': `token ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: '云工坊用户数据同步',
                public: false,
                files: {
                    'cloud-workshop-data.json': {
                        content: JSON.stringify(initialData, null, 2)
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error(`创建Gist失败: ${response.status} ${response.statusText}`);
        }

        const gist = await response.json();
        return gist.id;
    }

    // 获取默认用户数据
    getDefaultUsers() {
        return [
            {
                id: 1,
                username: 'student1',
                password: '123456',
                realName: '张三',
                email: 'student1@demo.com',
                phone: '13800138001',
                role: 'student',
                status: 'active',
                grade: 'grade3',
                registerTime: '2024-01-01',
                lastLogin: '从未登录'
            },
            {
                id: 2,
                username: 'student2',
                password: '123456',
                realName: '李四',
                email: 'student2@demo.com',
                phone: '13800138002',
                role: 'student',
                status: 'active',
                grade: 'grade4',
                registerTime: '2024-01-02',
                lastLogin: '从未登录'
            },
            {
                id: 3,
                username: 'teacher1',
                password: '123456',
                realName: '王老师',
                email: 'teacher1@demo.com',
                phone: '13800138003',
                role: 'teacher',
                status: 'active',
                registerTime: '2024-01-03',
                lastLogin: '从未登录'
            },
            {
                id: 4,
                username: 'teacher2',
                password: '123456',
                realName: '李老师',
                email: 'teacher2@demo.com',
                phone: '13800138004',
                role: 'teacher',
                status: 'active',
                registerTime: '2024-01-04',
                lastLogin: '从未登录'
            }
        ];
    }

    // 从GitHub获取数据
    async fetchData() {
        if (!this.isInitialized) {
            throw new Error('GitHub同步未初始化');
        }

        try {
            const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
                headers: {
                    'Authorization': `token ${this.token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`获取数据失败: ${response.status} ${response.statusText}`);
            }

            const gist = await response.json();
            const file = gist.files['cloud-workshop-data.json'];
            
            if (!file) {
                throw new Error('Gist中未找到数据文件');
            }

            const data = JSON.parse(file.content);
            this.lastSyncTime = new Date();
            
            console.log('从GitHub获取数据成功:', data.users.length, '个用户');
            return data;
            
        } catch (error) {
            console.error('从GitHub获取数据失败:', error);
            throw error;
        }
    }

    // 上传数据到GitHub
    async uploadData(data) {
        if (!this.isInitialized) {
            throw new Error('GitHub同步未初始化');
        }

        try {
            const uploadData = {
                ...data,
                lastUpdate: new Date().toISOString()
            };

            const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    files: {
                        'cloud-workshop-data.json': {
                            content: JSON.stringify(uploadData, null, 2)
                        }
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`上传数据失败: ${response.status} ${response.statusText}`);
            }

            this.lastSyncTime = new Date();
            console.log('数据上传到GitHub成功');
            return true;
            
        } catch (error) {
            console.error('上传数据到GitHub失败:', error);
            throw error;
        }
    }

    // 同步用户数据
    async syncUsers() {
        try {
            // 获取GitHub上的数据
            const remoteData = await this.fetchData();
            
            // 获取本地数据
            const localUsers = this.getLocalUsers();
            
            // 合并数据（远程优先）
            const mergedUsers = this.mergeUsers(remoteData.users, localUsers);
            
            // 保存到本地
            localStorage.setItem('admin_users', JSON.stringify(mergedUsers));
            
            // 如果本地有更新，上传到GitHub
            if (this.hasLocalChanges(localUsers, remoteData.users)) {
                await this.uploadData({ users: mergedUsers, version: '1.0' });
            }
            
            console.log('用户数据同步完成');
            return mergedUsers;
            
        } catch (error) {
            console.error('用户数据同步失败:', error);
            throw error;
        }
    }

    // 获取本地用户数据
    getLocalUsers() {
        const savedUsers = localStorage.getItem('admin_users');
        if (savedUsers) {
            try {
                return JSON.parse(savedUsers);
            } catch (error) {
                console.error('解析本地用户数据失败:', error);
                return [];
            }
        }
        return [];
    }

    // 合并用户数据
    mergeUsers(remoteUsers, localUsers) {
        const merged = [...remoteUsers];
        const remoteUsernames = new Set(remoteUsers.map(u => u.username));
        
        // 添加本地独有的用户
        localUsers.forEach(localUser => {
            if (!remoteUsernames.has(localUser.username)) {
                merged.push(localUser);
            }
        });
        
        // 确保ID唯一
        const usedIds = new Set();
        merged.forEach(user => {
            if (usedIds.has(user.id)) {
                user.id = Math.max(...usedIds) + 1;
            }
            usedIds.add(user.id);
        });
        
        return merged;
    }

    // 检查本地是否有更改
    hasLocalChanges(localUsers, remoteUsers) {
        if (localUsers.length !== remoteUsers.length) {
            return true;
        }
        
        const localMap = new Map(localUsers.map(u => [u.username, u]));
        const remoteMap = new Map(remoteUsers.map(u => [u.username, u]));
        
        for (const [username, localUser] of localMap) {
            const remoteUser = remoteMap.get(username);
            if (!remoteUser || JSON.stringify(localUser) !== JSON.stringify(remoteUser)) {
                return true;
            }
        }
        
        return false;
    }

    // 启动自动同步
    startAutoSync(intervalMinutes = 5) {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
        
        this.syncInterval = setInterval(async () => {
            try {
                await this.syncUsers();
            } catch (error) {
                console.error('自动同步失败:', error);
            }
        }, intervalMinutes * 60 * 1000);
        
        console.log(`自动同步已启动，间隔: ${intervalMinutes}分钟`);
    }

    // 停止自动同步
    stopAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
            console.log('自动同步已停止');
        }
    }

    // 获取同步状态
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            gistId: this.gistId,
            hasToken: !!this.token,
            lastSyncTime: this.lastSyncTime,
            isAutoSyncActive: !!this.syncInterval
        };
    }

    // 断开连接
    disconnect() {
        this.stopAutoSync();
        this.gistId = null;
        this.token = null;
        this.isInitialized = false;
        this.lastSyncTime = null;
        
        localStorage.removeItem('github_gist_id');
        localStorage.removeItem('github_token');
        
        console.log('GitHub同步已断开');
    }
}

// 全局实例
window.githubSync = new GitHubSync();

// 导出给其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubSync;
} 