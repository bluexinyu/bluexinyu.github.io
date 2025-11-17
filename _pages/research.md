---
permalink: /research/
title: "My Research"
layout: single
author_profile: true
---

I use experimental methods to study persuasive chatbots and social support in digital health contexts. My work examines how communication technology shapes health perceptions and behaviors.

---

## Current Projects

{% for project in site.data.research.projects %}
### {{ project.title }}

{{ project.description }}

**Keywords**: {{ project.tags | join: ", " }}

---
{% endfor %}

## Research Interests

{% for interest in site.data.research.research_interests %}
- **{{ interest.name }}**: {{ interest.description }}
{% endfor %}

## Methods

{{ site.data.research.methods | join: " • " }}

---

## Collaboration

{{ site.data.research.collaboration_text }}

**Contact**: [zxinyu@msu.edu](mailto:zxinyu@msu.edu)
