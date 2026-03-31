---
title: "A Non-Developer's Guide to AI That Works"
date: "2026-03-30"
summary: "What I currently use, what I'm learning and what I've built so far. If you're curious about AI but overwhelmed by the options, this might help you find your footing."
tags: ["AI", "tools", "productivity", "Claude Code", "GDPR"]
slug: "non-developers-guide-to-ai"
---

It feels like a new AI tool launches every week at the moment. A new wrapper, a new chatbot, a new platform promising to change how you work. Nobody can keep track of the landscape and the noise makes it hard to even know where to start.

My interest in AI came from the same place as everything else I do. I love solving problems and figuring out how things really work. If its use cases can make my life a little bit easier and help me be more efficient in my day to day. Well, that's just a bonus.

This is what I currently use, what I'm learning and what I've built so far. If you're curious about AI but overwhelmed by the options, this might help you find your footing.

## A Caveat Before We Start

You need to think before you use any of this at work. Where does your data go when you type it into a chatbot? Who stores it? What are your obligations under GDPR? If you work in the public sector or handle personal data, these are not theoretical questions. They have real consequences.

AI tools are not a free pass. You should understand your organisation's data classification, check whether a tool processes data in the UK or EU, and get clear on whether you're feeding sensitive information into a model that trains on your input. Some tools handle this well. Some don't. The responsibility sits with you.

## What I'm Using

**Willow Voice** (willowvoice.com). AI-powered voice dictation that works across any app on your machine. I use it for drafting emails, writing notes and capturing thoughts when I don't want to type. It strips out filler words, formats as you speak and runs on your device. No recordings stored, no transcripts sent anywhere. For someone who spends a lot of time writing it really makes a difference.

**Microsoft Copilot** (copilot.microsoft.com). The most adopted AI tool in UK enterprise, and for good reason. It sits inside Microsoft 365, which means your data stays within your existing Microsoft tenancy. For organisations that have invested in M365 and have their data governance in place, Copilot is the path of least resistance. I use it for things like summarising emails, drafting in Word, analysing in Excel and building presentations. The GDPR alignment through Microsoft's data processing agreements makes it the default choice for most UK public sector environments.

**Perplexity** (perplexity.ai). An AI-powered research tool that cites its sources. I use it when I need to find information fast and want to verify where it came from. As someone that finds themself falling down new rabbit holes multiple times a day it is brilliant.

**Figma Make** (figma.com/make). This one excites me. Figma Make turns prompts into interactive prototypes. If you can explain a product, write clear requirements and describe what the user needs to do, you can test ideas with working prototypes before anyone starts thinking about the code. For me, this collapses the gap between technical and non-technical stakeholders faster than anything else I've seen. A team member who writes good requirements and can confidently talk through journey mapping can now test concepts with stakeholders using something interactive they can click through. This is a game changer and something I currently pay for.

**Ollama** (ollama.com). An open-source tool that lets you run large language models on your own machine. No data leaves your laptop. No API costs. No internet connection needed once you've downloaded a model. If you handle sensitive information or want to experiment without worrying about where your data goes, Ollama is worth knowing about. I use it to refine my prompt engineering skills but you could also use it to test local documents that you wouldn't put through a cloud service.

**Claude** (claude.ai). Anthropic's AI assistant. I use Claude for reasoning through problems and refining my thinking. It handles nuance well and produces outputs I can use without heavy editing. I intend to try and run my consulting workflow through there once I have completed the 13 training courses (mentioned further down). I'll come back to Claude later in this article because I've really gone deep with it recently.

It's worth noting that Anthropic processes data in the US, so if you work with personal or sensitive data you need to assess that against your organisation's GDPR obligations before using it and please be careful when doing so. It has so many brilliant use cases but if you're unsure, it's better to avoid it completely.

## Where To Start If This Feels Like A Lot

If you're starting from scratch, **DeepLearning.AI** (deeplearning.ai) is worth a look. Andrew Ng's "AI for Everyone" and "Generative AI for Everyone" courses assume no coding background and take a few hours each. They cover what AI can and can't do, how to spot opportunities in your own organisation and how generative AI works at a practical level.

**ivee** (ivee.jobs). A UK startup founded by Amelia and Lydia Miller, backed by Steven Bartlett. ivee helps you discover which AI tools matter for your industry and role. They track tool adoption across 25+ UK industries and give you a personalised learning plan rather than leaving you to guess. If you're staring at the landscape and don't know where to begin, ivee is a good first step.

## How I'm Learning

I'm working through the **Anthropic Academy** courses (anthropic.skilljar.com). Anthropic launched 13 free courses in March covering everything from AI fundamentals to Claude Code and the Model Context Protocol. Each course awards a certificate. The AI Fluency track is built for people who want to understand AI without writing code. I've found it to be very well structured so far.

I'm also completing the **Google AI Professional Certificate** on Coursera. Seven courses, roughly ten hours in total with hands-on work using Gemini, NotebookLM and AI Studio. You build a portfolio of reusable prompts, project plans and a custom AI-powered app as you go.

## Who To Follow

**Ruben Hassid** (ruben.substack.com) runs a Substack newsletter called "How to AI" with over 400,000 subscribers. He publishes twice a week with step by step workflows and screenshots showing how he uses AI tools in practice. No theory, no hype.

## What is Claude Code?

Claude Code is Anthropic's agentic coding tool. It lives in your terminal, reads your codebase and executes tasks through natural language commands. You describe what you want in plain English. It writes, edits and runs code. It handles git workflows, runs tests and works across entire projects.

I'm not a developer and I certainly don't have a computer science degree but I know how to clearly explain the problem I'm trying to solve, how I want something to look and write detailed requirements. Claude Code meets me where I am.

If you're considering giving it a go, use your own machine and preferably do this on a fresh account. There are loads of free (and data compliant) ways to push what you build into production and it's really quite fun.

I'd suggest starting here:

**Claude Code** (ruben.substack.com/p/claude-code): a guide to Anthropic's terminal based coding agent.

I keep saying this but please check where and how you'd host anything before you build. Your app might sit on Vercel, your database on Supabase, your domain through a third-party registrar. Each one is a data processing decision. If you're handling personal information, know where it lives and whether your setup holds up under GDPR — it's always better to be safe than sorry.

## What I've Built So Far

I used the skills I do have and Claude Code to build two applications I now use every day. Both replaced workflows I previously ran on a reMarkable tablet, which I love, but where search was limited and reusing content was difficult. Over the past two weeks I've built far more than two. Some worked. Some failed. Some were shocking. The two that survived are the ones I'll describe here.

### EMC To-Do

A priority driven task management app. Not a simple checklist. It has drag-and-drop reordering, four priority levels with colour coding, snooze functionality, subtasks, comments and completion reasons. When I mark a task done or remove one, it asks me why. That creates an audit trail I can review.

The Telegram integration is the part I find most useful. At 07:00 every weekday, my bot sends me a structured morning briefing: overdue tasks, today's tasks and urgent items, each colour-coded by priority. I glance when I'm out on my morning walk and know what my day looks like. On Mondays it adds the week ahead. At 16:00 on Fridays, a nudge arrives listing anything urgent or overdue going into the weekend, which forces a decision: deal with it now or carry it consciously into next week. On Monday mornings, an email arrives with tasks I completed the previous week alongside the reasons I gave for completing or removing them. The completion reasons I wrote during the week become a Monday morning reflection.

### Reflection (Day Notes)

A structured daily reflection app. I've kept work journals for my own benefit for a while now, writing day notes Monday to Thursday and a week note on a Friday. The reMarkable worked but searching old entries was painful and reusing content took too much effort. My reflection app gives me five entry templates, energy tracking, auto-save and a calendar view with streaks. Saturdays and Sundays are purposely blocked.

The Telegram bot here works in two directions. Outbound, it runs a three-tier reminder system: a gentle nudge at 17:00, a second prompt at 19:00 and a final reminder at 22:00. The later messages are conditional. It checks the database first. If I've written a structured reflection, it stays silent. If I've only sent a quick capture, it still nudges me toward the full entry. On Fridays at 20:00 it prompts the weekly review.

Inbound, I can message the bot from anywhere. For instance if I text it from the train it saves straight into today's freeform notes field. The bot replies with a confirmation and a link to the full entry. Later when I'm back at my desk I open the app and my note is waiting alongside the structured prompts.

The point is not the technology. I mapped a journey and wrote requirements based on how I work, described what I needed in language I already use and built tools that fit my life. You don't need to be a developer to do this. You need to know what problem you're solving and describe it well enough for the machine to help.

## Where This Is Heading

The tools will keep changing. What won't change is the need to understand your problem in full before you reach for a solution. AI is great as an enabler. It can make you better and more efficient day to day but it should not be used to replace what makes you good at what you do.

If you can describe what you need clearly, you can use these tools too.

*Samuel Field, Founder, Eddystone Mersey Consulting*
