import { useState } from 'react'
import { nanoid } from 'nanoid/non-secure'
import { createNewGame } from '../lib/rules'
import { saveGame } from '../lib/db'
import { useNavigate } from 'react-router-dom'
import { SkillLevel } from '../lib/types'

const skillLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced']

export function NewGame() {
  const [count, setCount] = useState(2)
  const [name, setName] = useState('')
  const [players, setPlayers] = useState(
    Array.from({ length: 4 }).map((_, i) => ({
      name: '',
      avatarUrl: '',
      skill: 'Beginner' as SkillLevel,
      enabled: i < 2,
    }))
  )
  const navigate = useNavigate()

  const start = async () => {
    const gameId = nanoid()
    const gameName = name || `Game ${new Date().toLocaleString()}`
    const selected = players
      .slice(0, count)
      .map((p) => ({ id: nanoid(), name: p.name || 'Player', avatarUrl: p.avatarUrl, skill: p.skill }))
    const game = createNewGame(gameId, gameName, selected)
    await saveGame(game)
    navigate(`/game/${gameId}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-xl">New Game</h1>
      <div className="bg-neutral-900 rounded-xl p-4 space-y-4">
        <label className="block">Game Name
          <input className="mt-1 w-full bg-black border border-neutral-700 rounded p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional"/>
        </label>
        <label className="block">Players
          <select className="mt-1 w-full bg-black border border-neutral-700 rounded p-2" value={count} onChange={(e) => setCount(parseInt(e.target.value))}>
            {[2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <div className="grid gap-3">
          {players.slice(0, count).map((p, i) => (
            <div key={i} className="bg-neutral-800 rounded-lg p-3 space-y-2">
              <div className="font-semibold">Player {i+1}</div>
              <input className="w-full bg-black border border-neutral-700 rounded p-2" value={p.name} onChange={(e) => setPlayers(prev => { const n=[...prev]; n[i]={...n[i], name:e.target.value}; return n })} placeholder="Name"/>
              <select className="w-full bg-black border border-neutral-700 rounded p-2" value={p.skill} onChange={(e) => setPlayers(prev => { const n=[...prev]; n[i]={...n[i], skill:e.target.value as SkillLevel}; return n })}>
                {skillLevels.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={start} className="w-full bg-primary py-3 rounded-xl font-semibold">Start Game</button>
      </div>
    </div>
  )
}
