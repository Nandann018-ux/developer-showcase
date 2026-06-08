import Reveal from './Reveal'

// Standard section shell with an animated kicker + heading.
export default function Section({ id, kicker, title, children, className = 'py-24 md:py-32' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 ${className}`}>
      <Reveal>
        <p className="mb-3 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-200/80">
          <span className="h-px w-8 bg-gradient-to-r from-chalk/70 to-transparent" />
          {kicker}
        </p>
        <h2 className="font-display text-4xl font-bold text-balance md:text-5xl">
          <span className="gradient-text">{title}</span>
        </h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}
