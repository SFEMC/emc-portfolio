export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 border-b border-border">
      <div className="flex flex-col items-center mb-10">
        <img src="/logo.png" alt="Eddystone Mersey Consulting" className="h-28 w-auto mb-4" style={{ imageRendering: 'crisp-edges', filter: 'brightness(0) invert(1)' }} />
        <p className="font-body font-semibold text-3xl md:text-4xl text-ink">Eddystone Mersey Consulting</p>
      </div>
      <h1 className="font-body font-semibold text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.05] opacity-40 mb-10 text-center">
        I take complex public services from discovery through to live.
      </h1>
      <div className="flex flex-col items-center gap-8">
        <p className="text-muted font-body font-light text-lg leading-relaxed text-center">
          Product ownership, service design, and end-to-end delivery across central government and higher education. Senior-level expertise, no consultancy layers.
        </p>
      <div className="flex gap-4 items-center shrink-0">
        <a
          href="#experience"
          className="px-8 py-3 text-sm font-body font-semibold rounded-lg bg-white text-gray-900 hover:opacity-90 transition-opacity"
        >
          View Experience
        </a>
        <a
          href="mailto:Samuel.Field@eddystonemersey.com"
          className="px-8 py-3 text-sm font-body font-semibold rounded-lg bg-white text-gray-900 hover:opacity-90 transition-opacity"
        >
          Contact Me
        </a>
      </div>
      </div>
    </section>
  )
}
