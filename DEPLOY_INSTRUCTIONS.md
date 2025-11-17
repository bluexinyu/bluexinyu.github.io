# 🚀 部署说明

## 当前状态

✅ 所有代码已完成并提交到分支：`claude/personal-website-research-page-01PVwPxSo8ghZDX3rLzcnpFW`

## 需要部署到网站

由于权限限制，需要手动合并到 main 分支。

### 快速部署（命令行）

在你的本地终端运行：

```bash
cd ~/bluexinyu.github.io
git checkout main
git pull origin main
git merge claude/personal-website-research-page-01PVwPxSo8ghZDX3rLzcnpFW
git push origin main
```

### 或者在GitHub网页操作

1. 访问：https://github.com/bluexinyu/bluexinyu.github.io/pulls
2. 点击 "New pull request"
3. 选择：base: `main` ← compare: `claude/personal-website-research-page-01PVwPxSo8ghZDX3rLzcnpFW`
4. 点击 "Create pull request"
5. 点击 "Merge pull request"

### 等待部署

合并后，等待5-10分钟，GitHub Pages会自动构建并部署到 https://bluexinyu.github.io

## 已完成的功能

### 导航菜单（带下拉）
- About
- My Research（下拉：Research Overview, CV）
- Publications
- Teaching
- Research Methods
- Resources
- Connect

### 页面内容
- ✅ Teaching - 表格格式，三个section
- ✅ Publications - 合并了conferences
- ✅ Research - MSU莫兰迪绿色主题
- ✅ Research Methods - 新页面
- ✅ Resources - 新页面
- ✅ Connect - 集成邮箱 zxinyu@msu.edu

所有文件已准备就绪，只需要合并到main分支！
