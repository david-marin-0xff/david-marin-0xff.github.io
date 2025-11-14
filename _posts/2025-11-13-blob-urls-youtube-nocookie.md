---
layout: post
title: "Understanding blob: URLs and YouTube’s youtube-nocookie"
date: 2025-11-13
categories: [tech, web, youtube, blob]
author: david-marin-0xff
---

# Understanding lob: URLs and YouTube’s youtube-nocookie.com

When browsing the web or embedding videos, you might encounter URLs like:

\\\
blob:https://www.youtube-nocookie.com/123e4567-e89b-12d3-a456-426614174000
\\\

These are browser-side URLs pointing to data in memory and are normal when embedding YouTube videos.

## What is a lob: URL?

A lob: URL is a temporary pointer to a file stored in your browser memory. They exist only during your session and are often used for video streaming or dynamically generated content.

## Why youtube-nocookie.com?

YouTube’s youtube-nocookie.com domain is privacy-enhanced:

- It doesn’t store cookies until the user interacts with the video.
- It helps comply with GDPR.
- It reduces tracking.

## Example Embed

\\\html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" allowfullscreen></iframe>
\\\

## Takeaways

- lob: URLs are temporary and local to the browser.
- youtube-nocookie.com is privacy-friendly.
- Seeing blob URLs in dev tools is normal.
