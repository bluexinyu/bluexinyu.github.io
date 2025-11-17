---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: '6rem'

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ''
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: uploads/resume.pdf
      headings:
        about: ''
        education: ''
        interests: ''
    design:
      # Apply a gradient background
      css_class: hbx-bg-gradient
      # Avatar customization
      avatar:
        size: medium # Options: small (150px), medium (200px, default), large (320px), xl (400px), xxl (500px)
        shape: circle # Options: circle (default), square, rounded
  - block: markdown
    content:
      title: ''
      subtitle: ''
      text: |-
        My research program examines how communication shapes relationships, well-being, and social change. I draw on experimental methods, longitudinal surveys, physiological measures, and computational approaches to understand the cognitive, affective, and behavioral aspects of consequential conversations.

        I focus on three interconnected areas: **communication and close relationships**, **dynamic communication processes**, and **addressing challenges to human well-being**.

        [Learn more about my research →](/research/)
    design:
      columns: '1'
---
