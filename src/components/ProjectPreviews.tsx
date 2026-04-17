const muted = 'text-[#808080]'
const cardBg = 'bg-[#1f1f1f]'
const darkBg = 'bg-[#121212]'

export function EMCTodoPreview() {
  return (
    <div className="rounded-lg overflow-hidden select-none">
      <img
        src="/todo-preview.png"
        alt="EMC To-Do — priority-driven task manager with drag-and-drop"
        className="w-full h-auto rounded-lg"
      />
    </div>
  )
}

export function DayNotesPreview() {
  return (
    <div className="rounded-lg overflow-hidden select-none">
      <img
        src="/daynotes-preview.png"
        alt="Day Notes — daily reflection journal with templates and energy tracking"
        className="w-full h-auto rounded-lg"
      />
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
  return (
    <div className="rounded-lg overflow-hidden select-none">
      <img
        src="/freed-preview.png"
        alt="Freed — dietary restaurant discovery map showing venues across London"
        className="w-full h-auto rounded-lg"
      />
    </div>
  )
}

export function BasePhysiotherapyPreview() {
  return (
    <div className="rounded-lg overflow-hidden select-none">
      <img
        src="/base-preview.png"
        alt="Base Physiotherapy — professional website for a physiotherapy practice"
        className="w-full h-auto rounded-lg"
      />
    </div>
  )
}

const previewMap: Record<string, () => JSX.Element> = {
  'EMC To-Do': EMCTodoPreview,
  'Day Notes': DayNotesPreview,
  'Polymarket Analysis': PolymarketPreview,
  'Freed': FreedPreview,
  'Base Physiotherapy': BasePhysiotherapyPreview,
}

export default function ProjectPreview({ title }: { title: string }) {
  const Preview = previewMap[title]
  if (!Preview) return null
  return <Preview />
}
