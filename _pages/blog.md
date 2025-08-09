---
permalink: /blog/
title: "Blog"
layout: single
author_profile: true
classes: wide
---

## Blog

{% for post in site.posts %}
**{{ post.date | date: "%Y-%m-%d" }}** [{{ post.title }}]({{ post.url | relative_url }})

{{ post.excerpt }}

---
{% endfor %}

{% if site.posts.size == 0 %}
Coming soon... I will share insights from my research and academic journey here.
{% endif %}

