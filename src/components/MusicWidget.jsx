import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music } from 'lucide-react'

const VIDEO_ID = 'W4uG8B_ys7M'
const START = 0

export default function MusicWidget() {
  const [playing, setPlaying] = useState(false)

  return (
    <>
      {/* hidden YouTube audio — mounting it autoplays, unmounting stops */}
      {playing && (
        <iframe
          title="background music"
          allow="autoplay"
          className="pointer-events-none fixed -left-[9999px] h-1 w-1 opacity-0"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&start=${START}&controls=0&modestbranding=1&rel=0`}
        />
      )}

      <motion.button
        onClick={() => setPlaying((p) => !p)}
        data-hover
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="group fixed bottom-6 right-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-400/40"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {/* hover tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-chalk/20 bg-black/80 px-3 py-1.5 text-sm text-chalk opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
          {playing ? 'Pause — Take a Slice' : 'Play — Take a Slice'}
        </span>

        {/* expanding wave ripples while playing */}
        {playing &&
          [0, 0.6, 1.2].map((d) => (
            <motion.span
              key={d}
              className="absolute inset-0 rounded-full border-2 border-emerald-400"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: d }}
            />
          ))}

        {/* equalizer bars while playing, note otherwise */}
        {playing ? (
          <span className="relative z-10 flex h-4 items-end gap-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[2.5px] rounded-full bg-white"
                animate={{ height: ['25%', '100%', '40%', '85%', '25%'] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
                style={{ height: '25%' }}
              />
            ))}
          </span>
        ) : (
          <Music size={18} />
        )}
      </motion.button>
    </>
  )
}
