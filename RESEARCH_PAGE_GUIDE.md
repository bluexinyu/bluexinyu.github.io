# 研究页面使用指南 (Research Page Guide)

欢迎使用你的新研究页面！这个指南会教你如何像填空题一样轻松地更新和维护你的研究内容。

## 📁 文件结构

```
bluexinyu.github.io/
├── _data/
│   └── research.yml          # 【重要】研究内容配置文件（你主要修改这个文件）
├── _pages/
│   └── research.md           # 研究页面模板（一般不需要改）
└── assets/
    └── images/
        └── research/         # 研究项目图片文件夹
            ├── chatbot-health.svg
            ├── social-support.svg
            └── medicalization.svg
```

## 🎨 设计特色

- **莫兰迪绿色主题**：使用 MSU 绿色的优雅莫兰迪色调
- **响应式设计**：在手机、平板、电脑上都能完美显示
- **卡片式布局**：每个研究项目都有独立的卡片展示
- **悬停效果**：鼠标移到卡片上会有优雅的动画效果

## 📝 如何修改内容（像填空题一样简单！）

### 第一步：打开配置文件

打开文件：`_data/research.yml`

### 第二步：修改页面介绍

找到 `page_intro:` 部分，修改你的研究介绍：

```yaml
page_intro: |
  在这里写你的研究介绍。
  可以写多行。
  每行会自动换行显示。
```

### 第三步：添加/修改研究项目

#### 添加新项目（复制粘贴模板）

```yaml
projects:
  - title: "项目标题"
    description: |
      项目描述第一行
      项目描述第二行
      可以写多行
    image: "research/your-image.jpg"
    tags: ["标签1", "标签2", "标签3"]
    status: "Ongoing"  # 或者 "Completed", "In Progress" 等
```

#### 完整示例

```yaml
projects:
  - title: "AI 聊天机器人研究"
    description: |
      研究 AI 聊天机器人如何影响用户的健康决策。
      这个项目使用实验方法来测试不同的说服策略。
    image: "research/ai-chatbot.jpg"
    tags: ["AI", "健康传播", "说服"]
    status: "进行中"
```

### 第四步：修改研究兴趣

找到 `research_interests:` 部分：

```yaml
research_interests:
  - name: "研究方向名称"
    icon: "fas fa-heartbeat"  # Font Awesome 图标
    description: "简短描述"
```

#### 常用图标代码（Font Awesome）

- 💓 心跳/健康：`fas fa-heartbeat`
- 🤖 机器人/AI：`fas fa-robot`
- 💬 对话/交流：`fas fa-comments`
- 📊 数据/分析：`fas fa-chart-line`
- 🔬 科学/研究：`fas fa-flask`
- 📱 手机/社交媒体：`fas fa-mobile-alt`
- 🧠 大脑/心理：`fas fa-brain`
- 👥 用户/社区：`fas fa-users`

更多图标查看：https://fontawesome.com/icons

### 第五步：修改研究方法

找到 `methods:` 部分，添加或删除方法：

```yaml
methods:
  - "实验设计"
  - "问卷调查"
  - "文本分析"
  - "统计分析 (R, SPSS)"
```

### 第六步：修改合作信息

```yaml
collaboration_text: |
  在这里写你对合作的态度和期望。
  可以写多行。

contact_cta: "想要合作？请联系我：youremail@example.com"
```

## 🖼️ 如何替换图片

### 方法一：使用自己的图片（推荐）

1. 准备你的图片（建议尺寸：800x500 像素）
2. 将图片重命名为有意义的名字，如 `my-research-project.jpg`
3. 把图片放到文件夹：`assets/images/research/`
4. 在 `_data/research.yml` 中修改图片路径：

```yaml
image: "research/my-research-project.jpg"
```

### 方法二：使用在线图片

1. 找到免费图片网站（如 Unsplash, Pexels）
2. 下载图片
3. 按照方法一的步骤操作

### 支持的图片格式

- `.jpg` / `.jpeg`
- `.png`
- `.svg`
- `.gif`

## 🎨 如何修改颜色（进阶）

如果你想改变颜色主题，打开 `_pages/research.md` 文件，找到颜色代码并替换：

### 当前的莫兰迪绿色

- 主绿色：`#7A9B8E`
- 中绿色：`#8FA89E`
- 浅绿色：`#A8B5A8`
- 背景色：`#F5F7F6`

### 替换颜色

在 `_pages/research.md` 中，用"查找和替换"功能：

1. 查找 `#7A9B8E`，替换为你想要的颜色
2. 查找 `#8FA89E`，替换为稍浅的颜色
3. 查找 `#F5F7F6`，替换为背景颜色

**建议使用在线颜色选择器**：
- https://coolors.co/
- https://colorhunt.co/

## 📱 预览你的更改

### 本地预览（如果安装了 Jekyll）

```bash
bundle exec jekyll serve
```

然后访问：http://localhost:4000/research/

### 在线预览

1. 提交更改到 GitHub
2. 等待几分钟（GitHub Pages 会自动构建）
3. 访问：https://bluexinyu.github.io/research/

## ✅ 检查清单（发布前）

- [ ] 检查所有项目标题是否正确
- [ ] 检查所有项目描述是否清晰
- [ ] 检查图片是否都能正确显示
- [ ] 检查标签是否有拼写错误
- [ ] 检查联系邮箱是否正确
- [ ] 在手机上预览页面效果

## 🆘 常见问题

### Q: 修改后页面没有变化？

A: GitHub Pages 可能需要几分钟来更新。清除浏览器缓存或等待 5-10 分钟。

### Q: 图片不显示？

A: 检查以下几点：
1. 图片路径是否正确（区分大小写）
2. 图片是否已上传到 `assets/images/research/` 文件夹
3. 图片文件名是否包含空格或特殊字符（建议使用 `-` 代替空格）

### Q: 布局乱了？

A: 检查 `_data/research.yml` 文件的缩进是否正确。YAML 文件对缩进非常敏感！
- 使用空格，不要使用 Tab
- 每级缩进 2 个空格

### Q: 如何删除某个研究项目？

A: 在 `_data/research.yml` 中，找到对应的项目部分，删除从 `- title:` 到下一个项目之前的所有内容。

### Q: 如何临时隐藏某个项目？

A: 在项目的每一行前面加上 `#`，例如：

```yaml
# - title: "临时隐藏的项目"
#   description: "这个项目暂时隐藏"
#   image: "research/image.jpg"
```

## 🎓 下一步

1. **添加真实内容**：用你的实际研究项目替换示例内容
2. **添加真实图片**：替换占位图片为你的项目相关图片
3. **定期更新**：研究有新进展时，记得更新这个页面！

## 💡 提示

- **保持简洁**：每个项目描述不要超过 3-4 句话
- **使用高质量图片**：图片能让页面更专业
- **定期备份**：修改重要文件前，先复制一份备份
- **慢慢来**：不用一次性填完所有内容，可以逐步完善

---

**需要帮助？**

- 查看 Jekyll 文档：https://jekyllrb.com/docs/
- 查看 Minimal Mistakes 主题文档：https://mmistakes.github.io/minimal-mistakes/
- Font Awesome 图标库：https://fontawesome.com/icons

祝你使用愉快！🎉
