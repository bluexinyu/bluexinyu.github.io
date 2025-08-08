---
permalink: /blog/
title: "Blog"
layout: single
author_profile: true
classes: wide
---

{% for post in site.posts %}
**{{ post.date | date: "%Y-%m-%d" }}** [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}
