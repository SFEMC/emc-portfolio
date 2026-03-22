export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-16 border-b border-border">
      <div className="flex flex-col items-center text-center">
        <img src="/logo.png" alt="Eddystone Mersey Consulting" className="h-24 w-auto mb-4" style={{ imageRendering: 'crisp-edges', filter: 'brightness(0) invert(1)' }} />
        <p className="font-body font-semibold text-2xl md:text-3xl text-ink mb-6">Eddystone Mersey Consulting</p>
        <h1 className="font-body font-semibold text-2xl md:text-4xl lg:text-5xl text-ink leading-[1.1] opacity-40 mb-6 max-w-3xl">
          I take complex public services from discovery through to live.
        </h1>
        <p className="text-muted font-body font-light text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
          Product ownership, service design, and end-to-end delivery across central government and higher education. Senior-level expertise, no consultancy layers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
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
