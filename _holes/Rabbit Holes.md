---
title: Rabbit Holes
emoji: 🐇
date_started: 2025-31-11
tags:
  - tech
  - productivity
  - note taking
status: recent
slug: rabbit_holes
connected_holes:[]
---
Rabbit Holes is a custom web app I built inspired by the concept of digital gardens. I first came across this in this [video by Anna Howard](https://youtu.be/0tY7Z53QJo8?si=3EhIRarRR4dMl8ZJ) 
I was inspired to do my own version of this, which was how Rabbit Holes was born. Each `hole` is a topic or area that interests me. The goal is to simply allow myself to follow my curiosity organically, document my thoughts and eventually build a graph of 'connections'. I wanted it to be fun and cute (which I think it is!).

Its super simple, its built using HTML, CSS, JS, Ruby and Jekyll. The notes are md files, which makes them portable and reusable.

One extremely cool thing about how this whole system works, is that Ive connected the [rabbit holes](https://github.com/A-S620/rabbit-holes) repository to an Obsidian vault on my phone. So, I can edit and update my .md files locally on my phone. Then the Github Gitless Sync community pluggin syncs my local changes to the GitHub repository. And every time there are new changes pushed to master, Github will run a pages build and deployment action that builds the entire Jekyll Web app! So I can pretty much type on my phone, sync everything and have an updated web app in about 5 minutes. It's one of the coolest techy things I've done recently. 
