import { ArrowUp } from 'lucide-react'
import Magnetic from './Magnetic'
import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-10">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-chalk/15 pt-6 text-sm text-chalk/60 md:flex-row">
        <p className="text-lg text-chalk">
          Thanks for scrolling all the way down ✦
        </p>
        <p>© 2026 {profile.name} · built with React + Tailwind</p>
        <Magnetic>
          <a href="#top" className="flex items-center gap-1.5 hover:text-chalk">
            Back to top <ArrowUp size={15} />
          </a>
        </Magnetic>
      </div>
    </footer>
  )
}
