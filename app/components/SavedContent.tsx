'use client'

import { motion } from 'framer-motion'

interface Card {
  id: string
  title: string
  description: string
  category: string
  content: string
  url?: string
}

interface SavedContentProps {
  cards: Card[]
  onClose: () => void
}

export default function SavedContent({ cards, onClose }: SavedContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 max-h-[600px] overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Saved Content</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      {cards.length === 0 ? (
        <p className="text-gray-300 text-center py-8">
          No saved content yet. Swipe right on cards you like!
        </p>
      ) : (
        <div className="space-y-4">
          {cards.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20"
            >
              <span className="inline-block px-2 py-1 bg-purple-500 text-white text-xs rounded-full mb-2">
                {card.category}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{card.description}</p>
              {card.url && (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 text-sm underline"
                >
                  Learn more →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
