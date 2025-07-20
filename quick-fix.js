// 云工坊登录问题快速修复脚本
// 在浏览器控制台中运行此脚本来修复登录问题

console.log('🔧 开始修复云工坊登录问题...');

// 清除可能损坏的数据
localStorage.removeItem('admin_users');
sessionStorage.removeItem('currentUser');
console.log('✅ 已清除可能损坏的数据');

// 创建默认用户数据
const defaultUsers = [
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

// 保存到localStorage
localStorage.setItem('admin_users', JSON.stringify(defaultUsers));
console.log('✅ 已初始化默认用户数据');

// 验证数据
const savedUsers = localStorage.getItem('admin_users');
if (savedUsers) {
    const users = JSON.parse(savedUsers);
    console.log(`✅ 验证成功：localStorage中有 ${users.length} 个用户`);
    console.log('📋 可用账号：');
    users.forEach(user => {
        console.log(`  ${user.role}: ${user.username} / ${user.password} (${user.realName})`);
    });
} else {
    console.error('❌ 验证失败：localStorage中没有用户数据');
}

// 显示管理员账号
console.log('👨‍💼 管理员账号：18072830839 / ysh938798');

console.log('🎉 修复完成！现在可以尝试登录了');
console.log('💡 提示：如果仍有问题，请访问 debug-login.html 进行详细诊断'); 