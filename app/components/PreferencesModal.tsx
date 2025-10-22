'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PreferencesModalProps {
  onClose: () => void
  onSave: (preferences: string[]) => void
  currentPreferences: string[]
}

const SUGGESTED_TOPICS = [
  'Technology', 'Science', 'Business', 'Health', 'Entertainment',
  'Sports', 'Politics', 'Environment', 'Education', 'Art',
  'Travel', 'Food', 'Fashion', 'Gaming', 'Finance',
  'AI & Machine Learning', 'Space', 'History', 'Psychology', 'Music'
]

export default function PreferencesModal({ onClose, onSave, currentPreferences }: PreferencesModalProps) {
  const [selected, setSelected] = useState<string[]>(currentPreferences)
  const [custom, setCustom] = useState('')

  const toggleTopic = (topic: string) => {
    setSelected(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  const addCustomTopic = () => {
    if (custom.trim() && !selected.includes(custom.trim())) {
      setSelected(prev => [...prev, custom.trim()])
      setCustom('')
    }
  }

  const handleSave = () => {
    if (selected.length > 0) {
      onSave(selected)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Content Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-300 mb-4">
          Select topics you're interested in (choose at least one):
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {SUGGESTED_TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selected.includes(topic)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-sm">Add custom topic:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomTopic()}
              placeholder="e.g., Quantum Computing"
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={addCustomTopic}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-300 mb-2 text-sm">Selected topics:</p>
            <div className="flex flex-wrap gap-2">
              {selected.map(topic => (
                <span
                  key={topic}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full flex items-center gap-2"
                >
                  {topic}
                  <button
                    onClick={() => toggleTopic(topic)}
                    className="hover:text-red-300"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={selected.length === 0}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            selected.length > 0
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save Preferences ({selected.length})
        </button>
      </motion.div>
    </div>
  )
}
