---
permalink: /research/
title: "My Research"
layout: single
author_profile: true
classes: wide
---

<style>
/* ==========================================
   研究页面自定义样式
   ========================================== */

/* 页面介绍区域 - MSU莫兰迪绿色 */
.research-intro {
  font-size: 1.1em;
  line-height: 1.8;
  margin-bottom: 3em;
  padding: 2em;
  background: #F5F7F6;
  border-left: 4px solid #7A9B8E;
  border-radius: 4px;
}

/* 研究项目网格布局 */
.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2em;
  margin: 2em 0;
}

/* 单个研究项目卡片 */
.research-project {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.research-project:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

/* 项目图片 */
.project-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  background: #e9ecef;
}

/* 项目内容区 */
.project-content {
  padding: 1.5em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 0.5em;
  color: #2c3e50;
}

.project-status {
  display: inline-block;
  padding: 0.3em 0.8em;
  background: #7A9B8E;
  color: white;
  border-radius: 20px;
  font-size: 0.85em;
  margin-bottom: 1em;
}

.project-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1em;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: auto;
}

.project-tag {
  padding: 0.4em 0.8em;
  background: #E8EBE9;
  border-radius: 4px;
  font-size: 0.85em;
  color: #5A6B5F;
}

/* 研究兴趣区域 */
.research-interests {
  margin: 3em 0;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5em;
  margin-top: 1.5em;
}

.interest-item {
  padding: 1.5em;
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
  transition: border-color 0.3s ease;
}

.interest-item:hover {
  border-color: #7A9B8E;
}

.interest-icon {
  font-size: 2.5em;
  color: #7A9B8E;
  margin-bottom: 0.5em;
}

.interest-name {
  font-weight: 600;
  font-size: 1.1em;
  margin-bottom: 0.5em;
}

.interest-description {
  color: #666;
  font-size: 0.9em;
}

/* 研究方法标签云 - MSU莫兰迪绿色 */
.methods-section {
  margin: 3em 0;
  padding: 2em;
  background: #F5F7F6;
  border-radius: 8px;
}

.methods-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-top: 1em;
}

.method-tag {
  padding: 0.6em 1.2em;
  background: white;
  border: 2px solid #7A9B8E;
  border-radius: 20px;
  color: #7A9B8E;
  font-weight: 500;
  transition: all 0.3s ease;
}

.method-tag:hover {
  background: #7A9B8E;
  color: white;
}

/* 合作区域 - MSU莫兰迪绿色渐变 */
.collaboration-section {
  margin: 3em 0;
  padding: 2em;
  background: linear-gradient(135deg, #7A9B8E 0%, #8FA89E 100%);
  color: white;
  border-radius: 8px;
  text-align: center;
}

.collaboration-section h2 {
  color: white;
  margin-bottom: 1em;
}

.cta-button {
  display: inline-block;
  padding: 1em 2em;
  background: white;
  color: #7A9B8E;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 1em;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
  text-decoration: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .research-grid {
    grid-template-columns: 1fr;
  }

  .interests-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<!-- 页面介绍 -->
{% if site.data.research.page_intro %}
<div class="research-intro">
  {{ site.data.research.page_intro | markdownify }}
</div>
{% endif %}

<!-- 研究项目 -->
{% if site.data.research.projects %}
<h2>Research Projects</h2>
<div class="research-grid">
  {% for project in site.data.research.projects %}
  <div class="research-project">
    {% if project.image %}
    <img src="/assets/images/{{ project.image }}" alt="{{ project.title }}" class="project-image">
    {% endif %}

    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>

      {% if project.status %}
      <span class="project-status">{{ project.status }}</span>
      {% endif %}

      <div class="project-description">
        {{ project.description | markdownify }}
      </div>

      {% if project.tags %}
      <div class="project-tags">
        {% for tag in project.tags %}
        <span class="project-tag">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}

<!-- 研究兴趣 -->
{% if site.data.research.research_interests %}
<div class="research-interests">
  <h2>Research Interests</h2>
  <div class="interests-grid">
    {% for interest in site.data.research.research_interests %}
    <div class="interest-item">
      <div class="interest-icon">
        <i class="{{ interest.icon }}"></i>
      </div>
      <div class="interest-name">{{ interest.name }}</div>
      <div class="interest-description">{{ interest.description }}</div>
    </div>
    {% endfor %}
  </div>
</div>
{% endif %}

<!-- 研究方法 -->
{% if site.data.research.methods %}
<div class="methods-section">
  <h2>Research Methods & Tools</h2>
  <div class="methods-cloud">
    {% for method in site.data.research.methods %}
    <span class="method-tag">{{ method }}</span>
    {% endfor %}
  </div>
</div>
{% endif %}

<!-- 合作区域 -->
{% if site.data.research.collaboration_text %}
<div class="collaboration-section">
  <h2>Collaboration</h2>
  <div>{{ site.data.research.collaboration_text | markdownify }}</div>
  {% if site.data.research.contact_cta %}
  <a href="mailto:zxinyu@msu.edu" class="cta-button">{{ site.data.research.contact_cta }}</a>
  {% endif %}
</div>
{% endif %}
