'use client'
import {supabase} from '@/lib/supabaseClient'
import {useState} from 'react'

export default function Page() {
  const [entry, setEntry] = useState('')

  const handleSubmit = async () => {
  if (!entry.trim()) return

  const { error } = await supabase.from('entries').insert({
    text: entry,
  })

  if (error) {
    console.error('Failed to save:', error.message)
    alert('Something went wrong.')
  } else {
    console.log('Entry saved!')
    setEntry('')
    alert('Your journal has been saved!')
  }
}

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">How are you feeling today?</h1>

        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your thoughts here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Submit
        </button>
      </div>
    </div>
  )
}