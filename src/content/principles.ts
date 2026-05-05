export interface Principle {
  n: string
  title: string
  body: string
  expanded: string
}

export const principles: Principle[] = [
  {
    n: '01',
    title: 'Start with user needs',
    body: 'Every piece of work begins with the people on the receiving end. Staff, users, partners. I sit with them before I touch the system.',
    expanded: "Organisations collect feedback. They run satisfaction surveys, send questionnaires after open days and measure Net Promoter Scores. None of that tells you why something isn't working. A survey tells you 40% of applicants found the process confusing. Sitting with someone while they try to use it tells you they couldn't find their application status because three different teams send updates through three different channels and none of them reference each other. I spend time with the people who use the service before I propose changes to it. That means interviews, observation and structured research, not assumption-gathering workshops where senior stakeholders guess what users want. The evidence you collect in those first few weeks shapes everything that follows: the operating model, the governance, the technology choices. Skip it and you spend months building the wrong thing.",
  },
  {
    n: '02',
    title: 'Map the whole service',
    body: 'Services break down between teams, not inside them. I cover every channel, handoff and touchpoint from first contact to outcome.',
    expanded: 'Most organisations design in silos. One team owns the application. Another owns the offer. A third handles onboarding. Each team does their part well. The gaps sit in between, and nobody holds the joins together. I map services end-to-end across every channel, handoff and touchpoint, from the moment someone first makes contact to the moment they get their outcome. That means four layers: what the user does, what they see, what staff do behind the scenes and what systems and policies hold it all together. I add data where I can: time, cost, volume and drop-off at each step. A map without data is wallpaper. A map with data tells you where to focus. When you see that 30% of users drop off at the same handoff point, you stop debating priorities and start fixing the thing that matters.',
  },
  {
    n: '03',
    title: 'Test before you build',
    body: 'Prototype cheaply. Run small pilots. Work in the open so stakeholders steer early. Scale what evidence shows to work.',
    expanded: "Most governance structures reward certainty. Committees want assurance. Boards want a business case with a fixed outcome before they release budget. That model works for procurement. It fails for transformation, because you don't know the answer before you start. I prototype cheaply and run controlled pilots before committing resource. A prototype lets you be wrong at the cost of a few days, not six months of development and a procurement cycle. I write pilot agreements before I start so everyone knows the rules: what we're testing, how long it runs, what counts as success and what happens if it doesn't work. I share results openly, including what failed. One successful pilot makes the next one easier to approve. The culture shifts when people see results, not when someone writes a strategy paper about innovation.",
  },
  {
    n: '04',
    title: 'Build capability as you go',
    body: 'I do not leave a PowerPoint and a handshake. I join your team, coach as I work and make sure the change stays when I leave.',
    expanded: "Transformation programmes design new services and hand them to operational teams to run. The handover is where most failures sit. The team that designed the service understood the problem. The team that inherited it received a system, a process document and a go-live date. Nobody asked them whether they could operate what had been built. I involve frontline staff from day one. Not consultation, not a workshop where I ask for feedback on something I've already designed. I put operational team members in the room when I map the journey, let them challenge assumptions and redesign when they say \"that won't work.\" A team that helped shape a service will fight to make it work. A team that had a service imposed on them will resist it from the start. By the time I leave, the people running the service can hold it without me. That's the measure of whether the work landed.",
  },
]
