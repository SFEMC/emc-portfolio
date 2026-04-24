---
title: "What Happens After Launch"
date: "2026-04-24"
summary: "Services don't fail at launch. They fail six months later, when the people running them don't understand why a decision was made and the institutional knowledge walks out the door with the delivery team."
tags: ["service design", "delivery", "transitions"]
slug: "what-happens-after-launch"
---

You spend months in discovery. You map user needs. You build, test, iterate. You get through alpha, beta, a service assessment. You launch.

Then what?

In most teams, the answer is: someone writes a runbook, schedules a handover meeting and moves on. The people who designed and built the service disappear. A BAU team picks up the pieces. Within a month, the service starts drifting from its original design. Within three months, workarounds are embedded. Within six, nobody remembers why certain decisions were made.

This happens because teams treat launch as the finish line. Launch is the point where the service meets reality at scale, and reality has a habit of breaking things that worked in beta.

## The transition gap

The period between launch and steady-state operations is where services are most vulnerable. New edge cases appear. Users behave in ways nobody predicted. Support teams get questions the documentation doesn't cover. Workarounds start forming. If nobody is paying attention, those workarounds become the service.

Most delivery teams don't design for this phase. They design the service, build the service and hand over the service. The transition itself gets treated as an administrative task: update the docs, train the team, close the Jira board. Move on.

That's a mistake. The transition from live to BAU deserves the same design rigour as the build.

## Why handovers fail

Handovers fail because teams treat them as knowledge transfer, not as a design challenge. The assumption is that if you document enough and explain enough, the receiving team can pick it up.

Documentation captures what the service does. It rarely captures why it does it that way. The delivery team carries context in their heads: the constraints they navigated, the trade-offs they made, the things they tried that didn't work. None of that makes it into the runbook.

The receiving team inherits the service without that context. When they hit a problem, they don't know whether the original design accounted for it or missed it. They make changes based on incomplete understanding. Each change moves the service further from its design intent.

## What a designed transition looks like

A well-designed transition starts early. The people who will run the service sit alongside the people building it, long before launch. They understand the design decisions, the trade-offs and the known limitations. They don't inherit a service cold.

Design end-state tests that confirm operational readiness. Not "does the technology work" but "can the BAU team run this service without the delivery team in the room?" Put them in scenarios where they need to make decisions, handle exceptions and escalate problems. Watch where they get stuck. Those sticking points tell you what the handover hasn't covered.

Define ownership boundaries. Who owns which part of the service? Who makes decisions about changes? Who handles incidents? Who talks to users? If the BAU team can't answer those questions without phoning the delivery team, the handover isn't complete.

Build in a shadow period. The BAU team runs the service while the delivery team is still available but not leading. This period exposes gaps that documentation misses. It gives the receiving team confidence and gives the delivery team a chance to fill in what they forgot to write down.

## The cost of getting it wrong

Services don't fail at launch. They fail six months later, when the people running them don't understand why a decision was made, when a process that worked in beta breaks under load, when institutional knowledge walks out the door with the delivery team.

Fixing a degraded service costs more than designing the handover properly in the first place. You end up re-discovering decisions that were already made, unpicking workarounds that have become load-bearing and rebuilding trust with users who've had a bad experience.

The service doesn't end at launch. It ends when the team running it can do so without looking back. If you're building a service, plan for what happens after you leave. That's where the real test begins.
