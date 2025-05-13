// 引入 Express 框架
const express = require('express');
const app = express(); // 创建一个 Express 应用
const port = 3000; // 定义服务器端口号

// 示例用户数据，存储在内存中（实际开发中建议用数据库）
let users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

// 中间件：解析 JSON 格式的请求体
app.use(express.json());

// 定义接口

// 获取所有用户
app.get('/api/users', (req, res) => {
  res.json(users); // 返回用户列表
});

// 根据 id 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // 从 URL 中获取 id
  const user = users.find((u) => u.id === userId); // 查找用户
  if (user) {
    res.json(user); // 返回用户
  } else {
    res.status(404).json({ error: 'User not found' }); // 如果未找到，返回 404
  }
});

// 创建新用户
app.post('/api/users', (req, res) => {
  const newUser = req.body; // 从请求体中获取新用户数据
  newUser.id = users.length + 1; // 为新用户生成一个 id
  users.push(newUser); // 将新用户添加到数组中
  res.status(201).json(newUser); // 返回创建的用户数据
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
