---
title: Rabbit Holes
emoji: 🐇
date_started: 2025-11-31
tags:
  - tech
  - productivity
  - notetaking
status: recent
slug: rabbit_holes
connected_holes: []
---
Rabbit Holes is a custom web app I built inspired by the concept of digital gardens, I first came in this [video by Anna Howard](https://youtu.be/0tY7Z53QJo8?si=3EhIRarRR4dMl8ZJ) 
I was inspired to do my own version of this, which was how Rabbit Holes was born. Each `hole` is a topic or area that interests me. The goal is to simply allow myself to follow my curiosity organically, document my thoughts and eventually build a graph of 'connections'. I wanted it to be fun and cute (which I think it is!).

Its super simple, its built using HTML, CSS, JS, Ruby and Jekyll. The notes are md files, which makes them portable and reusable.

One extremely cool thing about how this whole system works, is that Ive connected the [rabbit holes](https://github.com/A-S620/rabbit-holes) repository to an [Obsidian](https://obsidian.md/) vault on my phone. So, I can edit and update my .md files locally. Then the Github Gitless Sync community plugin syncs my local changes to the GitHub repository. And every time there are new changes pushed to master, Github will run a pages build and deployment action that builds the entire Jekyll Web app! So I can pretty much type on my phone, sync everything and have an updated web app in about 5 minutes. It's one of the coolest techy things I've done recently. 

# The anatomy of a hole
Every hole file starts with:

`---
title: Rabbit Holes
emoji: 🐇
date_started: 2025-11-31
tags:
  - tech
  - productivity
  - notetaking
status: recent
slug: rabbit_holes
connected_holes:  []
---`


Which is the basic information that organises all the holes. Pretty self explanatory. The only key thing here is to create a connection, you need to put the slug of the connected hole and also update that hole with the slug of your new hole, if you dont do this it breaks the D3.js graph.

After this, you have free reign to write any markdown you want.

In some places you may notice`[[ ... ]]` syntax, which is the syntax Obsidian uses to create connections between pages. Ive left this in because it doesnt really impact the UX of the web app and makes the local notes more useful to me.  I get a handy graph locally, which shows the connections between the pages.

# Curate Or Be Consumed
Back in 2021/2022, the first GPT models were released, of which I was a beta user. I used things like GitHub Copilot and ChatGPT, amazed at just how incredible these tools were. But almost 3 years on, I have a very different view on AI. I still think that AI is a useful tool if used correctly, specifically in the context of work. What i didnt anticipate, however, is the rise of useless slop that can now be found in every corner of the Internet. 

The Internet was once a place that allowed authentic self expression, creativity and facilitated human connection. Now, its filled with bots and AI generated content that means nothing. The humanness has been stripped and media is now prompted not created. And I dont anticipate this changing anytime soon, especially as models become better. So there's only two options left: Curate or Be Consumed.

The rise in popularity of digital gardens and second brains, days to me that deep down humans crave depth and connection with the media theyre consuming. Yes our brains are slowly being trained to live off short form content, but I dont think it'll ever be truly satisfying. Short form content is like fast food, but media or art that has depth is like a gourmet meal, which you savour and enjoy.

All this to say, this system is my attempt or rather final strand of hope at building a more mindful relationship with the things I consume. I want to be able to savour what I experience and think about things for long enough so that I can form well thought out opinions on it.

The thoughts I document here might be confusing or written poorly (especially since I'm not using a grammar checker on my phone), but I think thats okay. The point is that these are my thoughts and Im documenting them here as I go along. And whilst it pains the perfectionist in me to write poorly constructed sentences, Im simply learning to live with it. These pages will evolve as I evolve.
