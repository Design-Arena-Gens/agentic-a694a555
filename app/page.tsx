'use client'

import { useState } from 'react'
import SwipeCards from './components/SwipeCards'
import PreferencesModal from './components/PreferencesModal'
import SavedContent from './components/SavedContent'

export default function Home() {
  const [preferences, setPreferences] = useState<string[]>([])
  const [showPreferences, setShowPreferences] = useState(true)
  const [showSaved, setShowSaved] = useState(false)
  const [savedCards, setSavedCards] = useState<any[]>([])

  const handleSaveCard = (card: any) => {
    setSavedCards(prev => [...prev, card])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Content Curator</h1>
          <p className="text-gray-300">Swipe to discover content tailored for you</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setShowPreferences(true)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            ⚙️ Preferences
          </button>
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
          >
            💾 Saved ({savedCards.length})
          </button>
        </div>

        {showSaved ? (
          <SavedContent cards={savedCards} onClose={() => setShowSaved(false)} />
        ) : (
          <>
            {preferences.length > 0 ? (
              <SwipeCards preferences={preferences} onSave={handleSaveCard} />
            ) : (
              <div className="text-center text-white bg-black/30 backdrop-blur-lg rounded-2xl p-8">
                <p className="text-xl mb-4">👆 Set your preferences to get started!</p>
              </div>
            )}
          </>
        )}
      </div>

      {showPreferences && (
        <PreferencesModal
          onClose={() => setShowPreferences(false)}
          onSave={(prefs) => {
            setPreferences(prefs)
            setShowPreferences(false)
          }}
          currentPreferences={preferences}
        />
      )}
    </main>
  )
}
