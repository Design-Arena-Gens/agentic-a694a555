'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'

interface Card {
  id: string
  title: string
  description: string
  category: string
  content: string
  url?: string
}

interface SwipeCardsProps {
  preferences: string[]
  onSave: (card: Card) => void
}

export default function SwipeCards({ preferences, onSave }: SwipeCardsProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [direction, setDirection] = useState<string | null>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  useEffect(() => {
    if (preferences.length > 0 && cards.length === 0) {
      fetchContent()
    }
  }, [preferences])

  useEffect(() => {
    if (currentIndex >= cards.length - 2 && cards.length > 0 && !loading) {
      fetchContent()
    }
  }, [currentIndex])

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences })
      })
      const data = await response.json()
      setCards(prev => [...prev, ...data.cards])
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        setDirection('right')
        onSave(cards[currentIndex])
      } else {
        setDirection('left')
      }

      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        setDirection(null)
        x.set(0)
      }, 200)
    } else {
      x.set(0)
    }
  }

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir)
    if (dir === 'right') {
      onSave(cards[currentIndex])
    }
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDirection(null)
      x.set(0)
    }, 200)
  }

  if (currentIndex >= cards.length && !loading) {
    return (
      <div className="text-center text-white bg-black/30 backdrop-blur-lg rounded-2xl p-8">
        <p className="text-xl">🔄 Loading more content...</p>
      </div>
    )
  }

  const currentCard = cards[currentIndex]

  if (!currentCard) {
    return (
      <div className="text-center text-white bg-black/30 backdrop-blur-lg rounded-2xl p-8">
        <p className="text-xl">🔄 Generating content...</p>
      </div>
    )
  }

  return (
    <div className="relative h-[500px] w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-full h-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={direction ? {
            x: direction === 'right' ? 500 : -500,
            opacity: 0
          } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <span className="inline-block px-3 py-1 bg-purple-500 text-white text-xs rounded-full mb-3">
                {currentCard.category}
              </span>
              <h2 className="text-2xl font-bold text-white mb-4">{currentCard.title}</h2>
              <p className="text-gray-200 mb-4">{currentCard.description}</p>
              <div className="text-gray-300 text-sm leading-relaxed">
                {currentCard.content}
              </div>
              {currentCard.url && (
                <a
                  href={currentCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-300 hover:text-blue-200 underline"
                >
                  Learn more →
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-[-80px] left-0 right-0 flex justify-center gap-8">
        <button
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white text-3xl flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          ✕
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white text-3xl flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          ♥
        </button>
      </div>

      <div className="absolute top-[-60px] left-0 right-0 text-center text-white">
        <p className="text-sm opacity-70">Card {currentIndex + 1} of {cards.length}</p>
      </div>
    </div>
  )
}
