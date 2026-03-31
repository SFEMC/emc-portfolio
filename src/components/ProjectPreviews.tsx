const muted = 'text-[#808080]'
const cardBg = 'bg-[#1f1f1f]'
const darkBg = 'bg-[#121212]'

function DragDots() {
  return (
    <div className="flex gap-[3px] flex-col items-center justify-center mr-2 opacity-40">
      <div className="flex gap-[3px]"><span className="w-[3px] h-[3px] rounded-full bg-gray-500" /><span className="w-[3px] h-[3px] rounded-full bg-gray-500" /></div>
      <div className="flex gap-[3px]"><span className="w-[3px] h-[3px] rounded-full bg-gray-500" /><span className="w-[3px] h-[3px] rounded-full bg-gray-500" /></div>
      <div className="flex gap-[3px]"><span className="w-[3px] h-[3px] rounded-full bg-gray-500" /><span className="w-[3px] h-[3px] rounded-full bg-gray-500" /></div>
    </div>
  )
}

function TaskRow({ color, label, text, due, overdue }: { color: string; label: string; text: string; due: string; overdue?: boolean }) {
  return (
    <div className={`${cardBg} rounded-lg flex items-center px-3 py-3 gap-3 border-l-[3px]`} style={{ borderLeftColor: color }}>
      <DragDots />
      <div className="w-4 h-4 rounded border border-gray-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-white truncate">{text}</p>
        <p className="text-[9px] font-semibold mt-0.5" style={{ color }}>{label}</p>
      </div>
      <span className={`text-[11px] flex-shrink-0 ${overdue ? 'text-red-400' : muted}`}>{due}</span>
    </div>
  )
}

export function EMCTodoPreview() {
  return (
    <div className={`${darkBg} rounded-lg p-5 space-y-2.5 select-none`}>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-white font-semibold text-sm">Tasks</span>
        <span className={`text-[10px] ${muted}`}>4 today · 1 overdue · 12-day streak</span>
      </div>
      <TaskRow color="#e63946" label="URGENT" text="Submit quarterly report to finance" due="Overdue" overdue />
      <TaskRow color="#f4a226" label="HIGH" text="Review service blueprint with design team" due="Today" />
      <TaskRow color="#4da6e8" label="MEDIUM" text="Draft user stories for enrolment flow" due="Today" />
      <TaskRow color="#5cb85c" label="LOW" text="Update portfolio with new article" due="Tomorrow" />
      <div className="bg-[#161616] rounded-md px-3 py-2 mt-3">
        <span className="text-[10px] text-blue-400 font-medium">Telegram Bot</span>
        <p className={`text-[10px] ${muted} mt-0.5`}>07:00 Good morning. You have 1 overdue task and 3 due today.</p>
      </div>
    </div>
  )
}

export function DayNotesPreview() {
  const templates = ['Full Reflection', 'Quick Capture', 'Wins & Lessons', 'Plan Tomorrow', 'Day Debrief']
  const energyLevels = ['Drained', 'Low', 'Steady', 'Good', 'Flying']
  const calDays = Array.from({ length: 31 }, (_, i) => i + 1)
  const filledDays = [2,3,4,5,6,9,10,11,12,13,16,17,18,19,20,23,24,25,26,27,30,31]
  const weekendDays = [1,7,8,14,15,21,22,28,29]

  return (
    <div className={`${darkBg} rounded-lg p-5 select-none`}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-white font-semibold text-sm">Day Notes</span>
        <span className={`text-[10px] ${muted}`}>Tuesday 1 April 2026</span>
      </div>
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {templates.map((t, i) => (
          <span key={t} className={`text-[10px] px-2 py-1 rounded ${i === 0 ? 'bg-white text-gray-900 font-medium' : `${cardBg} ${muted}`}`}>{t}</span>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          <div>
            <span className={`text-[9px] ${muted} uppercase tracking-wider`}>Energy</span>
            <div className="flex gap-3 mt-1.5">
              {energyLevels.map((e, i) => (
                <div key={e} className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full ${i === 3 ? 'bg-blue-400' : `${cardBg} border border-gray-700`}`} />
                  <span className={`text-[8px] ${i === 3 ? 'text-blue-400' : muted}`}>{e}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className={`text-[9px] ${muted} uppercase tracking-wider`}>What went well?</span>
            <div className={`${cardBg} rounded px-2 py-1.5 mt-1`}>
              <p className="text-[10px] text-gray-300">Got the service blueprint reviewed and signed off. Team aligned on next steps.</p>
            </div>
          </div>
          <div>
            <span className={`text-[9px] ${muted} uppercase tracking-wider`}>What could have gone better?</span>
            <div className={`${cardBg} rounded px-2 py-1.5 mt-1`}>
              <p className="text-[10px] text-gray-300">Spent too long in email. Should have blocked focus time in the morning.</p>
            </div>
          </div>
        </div>
        <div className={`${cardBg} rounded-lg p-3 w-44 flex-shrink-0`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-white font-semibold">March 2026</span>
            <span className="text-[9px] text-green-400">8-day streak</span>
          </div>
          <div className="grid grid-cols-7 gap-[3px]">
            {['M','T','W','T','F','S','S'].map((d,i) => (
              <span key={i} className={`text-[8px] ${muted} text-center`}>{d}</span>
            ))}
            {/* offset: March 2026 starts on Sunday, so 6 empty cells */}
            {Array.from({ length: 6 }, (_, i) => <span key={`e${i}`} />)}
            {calDays.map(d => {
              const isWeekend = weekendDays.includes(d)
              const isFilled = filledDays.includes(d)
              return (
                <div key={d} className={`aspect-square rounded-sm flex items-center justify-center text-[8px] ${
                  isWeekend ? 'bg-[#141414] text-gray-700' : isFilled ? 'bg-green-500/80 text-[#121212]' : `${darkBg} ${muted}`
                }`}>{d}</div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#161616] rounded-md px-3 py-2 mt-3">
        <span className="text-[10px] text-blue-400 font-medium">Telegram Bot</span>
        <p className={`text-[10px] ${muted} mt-0.5`}>17:00 Hey — have you written your reflection today?</p>
      </div>
    </div>
  )
}

export function PolymarketPreview() {
  const cats = ['All', 'Politics', 'Crypto', 'Sports', 'Economics', 'Tech']
  const points = [62, 58, 55, 57, 50, 48, 44, 42, 40, 38, 36, 34, 30]

  return (
    <div className={`${darkBg} rounded-lg p-5 select-none`}>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-white font-semibold text-sm">Polymarket Analysis</span>
        <span className={`text-[10px] ${muted}`}>312 markets · Updated 2 min ago</span>
      </div>
      <div className="flex gap-1.5 mb-4 mt-3 flex-wrap">
        {cats.map((c, i) => (
          <span key={c} className={`text-[10px] px-2 py-1 rounded ${i === 0 ? 'bg-white text-gray-900 font-medium' : `${cardBg} ${muted}`}`}>{c}</span>
        ))}
      </div>
      <div className="flex gap-4">
        <div className={`${cardBg} rounded-lg p-3 flex-1`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-white font-semibold">UK General Election 2028 — Labour</span>
            <span className="text-lg font-bold text-green-400">62%</span>
          </div>
          <div className="relative h-24">
            <svg viewBox="0 0 260 96" className="w-full h-full" preserveAspectRatio="none">
              <polyline
                points={points.map((p, i) => `${i * 20},${96 - p * 1.2}`).join(' ')}
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
              <polyline
                points={`0,${96 - points[0] * 1.2} ${points.map((p, i) => `${i * 20},${96 - p * 1.2}`).join(' ')} 240,96 0,96`}
                fill="rgba(34,197,94,0.08)"
                stroke="none"
              />
            </svg>
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
              {['80%', '60%', '40%', '20%'].map(l => (
                <span key={l} className="text-[8px] text-gray-600">{l}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={`${cardBg} rounded-lg p-3 w-52 flex-shrink-0`}>
          <span className="text-[11px] text-white font-semibold">Top Opportunities</span>
          <div className="mt-2 space-y-2.5">
            {[
              { m: 'BTC > $150k by July', ev: '+18.4%', action: 'BUY YES' },
              { m: 'Fed rate cut June', ev: '+14.2%', action: 'BUY YES' },
              { m: 'Tesla > $400 Q2', ev: '+11.8%', action: 'BUY NO', red: true },
              { m: 'UK snap election', ev: '+9.6%', action: 'BUY YES' },
            ].map(r => (
              <div key={r.m} className="flex items-center gap-2">
                <span className="text-[10px] text-gray-300 flex-1 truncate">{r.m}</span>
                <span className="text-[10px] font-semibold text-green-400">{r.ev}</span>
                <span className={`text-[8px] font-medium ${r.red ? 'text-red-400' : 'text-green-400'}`}>{r.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        {[{ l: 'Markets', v: '312' }, { l: 'Opportunities', v: '28' }, { l: 'Avg EV', v: '+8.4%' }, { l: 'Alerts today', v: '3' }].map(s => (
          <div key={s.l} className={`${cardBg} rounded-lg px-3 py-2 flex-1`}>
            <p className="text-sm font-bold text-white">{s.v}</p>
            <p className={`text-[9px] ${muted}`}>{s.l}</p>
          </div>
        ))}
      </div>
      <p className="text-[8px] text-yellow-700 mt-2">Analysis only — not financial advice.</p>
      <div className="bg-[#161616] rounded-md px-3 py-2 mt-2">
        <span className="text-[10px] text-amber-400 font-medium">Telegram Alert</span>
        <p className={`text-[10px] ${muted} mt-0.5`}>BUY YES — BTC &gt; $150k by July | Market: 42% Model: 58% EV: +18.4%</p>
      </div>
    </div>
  )
}

export function FreedPreview() {
  const diets = [
    { name: 'Coeliac', active: true }, { name: 'Vegan', active: false },
    { name: 'Halal', active: false }, { name: 'Dairy-Free', active: true },
    { name: 'Nut-Free', active: false }, { name: 'Pescatarian', active: false },
  ]

  return (
    <div className={`${darkBg} rounded-lg p-5 select-none`}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-white font-semibold text-sm">Freed</span>
        <span className={`text-[10px] ${muted}`}>Find restaurants that work for your diet</span>
      </div>
      <div className={`${cardBg} rounded-lg px-3 py-2 flex items-center justify-between mb-3 border border-gray-800`}>
        <span className="text-[12px] text-gray-400">Plymouth, Devon</span>
        <span className={`text-[10px] ${muted}`}>3 km radius · 47 results</span>
      </div>
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {diets.map(d => (
          <span key={d.name} className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
            d.active ? 'bg-green-500/90 text-[#121212]' : `${cardBg} ${muted} border border-gray-700`
          }`}>{d.name}</span>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="flex-1 bg-[#262e2c] rounded-lg relative overflow-hidden" style={{ minHeight: 180 }}>
          {/* Roads */}
          <div className="absolute inset-0">
            <div className="absolute w-full h-px bg-[#343b39] top-[25%]" />
            <div className="absolute w-full h-px bg-[#343b39] top-[50%]" />
            <div className="absolute w-full h-px bg-[#343b39] top-[75%]" />
            <div className="absolute h-full w-px bg-[#343b39] left-[25%]" />
            <div className="absolute h-full w-px bg-[#343b39] left-[50%]" />
            <div className="absolute h-full w-px bg-[#343b39] left-[75%]" />
          </div>
          {/* Pins */}
          {[{t:'15%',l:'30%'},{t:'40%',l:'50%'},{t:'20%',l:'70%'},{t:'60%',l:'35%'},{t:'55%',l:'78%'},{t:'45%',l:'20%'},{t:'30%',l:'85%'},{t:'75%',l:'55%'}].map((p,i) => (
            <div key={i} className="absolute w-3 h-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(74,222,128,0.4)]" style={{ top: p.t, left: p.l }} />
          ))}
          {/* Popup */}
          <div className="absolute bg-[#121212] rounded px-2 py-1.5 shadow-lg" style={{ top: '36%', left: '42%' }}>
            <p className="text-[10px] text-white font-semibold">The Harbour Bistro</p>
            <p className="text-[8px] text-green-400">Coeliac verified · 0.3 km</p>
          </div>
        </div>
        <div className="w-48 space-y-2.5 flex-shrink-0">
          {[
            { name: 'The Harbour Bistro', type: 'Restaurant · 0.3 km', tags: ['Coeliac', 'Dairy-Free'], verified: true },
            { name: 'Green & Co', type: 'Cafe · 0.5 km', tags: ['Vegan', 'Coeliac'], verified: true },
            { name: 'Nazar Kitchen', type: 'Takeaway · 0.8 km', tags: ['Halal', 'Dairy-Free'], verified: false },
          ].map(v => (
            <div key={v.name} className={`${cardBg} rounded-lg p-2.5`}>
              <div className="flex justify-between items-start">
                <p className="text-[11px] text-white font-semibold">{v.name}</p>
                {v.verified && <span className="text-[8px] text-green-400 font-medium">Verified</span>}
              </div>
              <p className={`text-[9px] ${muted} mt-0.5`}>{v.type}</p>
              <div className="flex gap-1 mt-1.5">
                {v.tags.map(t => (
                  <span key={t} className="text-[8px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#161616] rounded-md px-3 py-2 mt-3">
        <span className={`text-[9px] ${muted}`}>120,000+ UK venues · 363 local authorities · FSA data · Community confirmed dietary tags</span>
      </div>
    </div>
  )
}

const previewMap: Record<string, () => JSX.Element> = {
  'EMC To-Do': EMCTodoPreview,
  'Day Notes': DayNotesPreview,
  'Polymarket Analysis': PolymarketPreview,
  'Freed': FreedPreview,
}

export default function ProjectPreview({ title }: { title: string }) {
  const Preview = previewMap[title]
  if (!Preview) return null
  return <Preview />
}
