---
permalink: /blog/
title: "Blog"
layout: single
author_profile: true
classes: wide
---

<br><br>

{% for post in site.posts %}
**{{ post.date | date: "%Y-%m-%d" }}** [{{ post.title }}]({{ post.url | relative_url }})
{% unless forloop.last %}<br>{% endunless %}
{% endfor %}
