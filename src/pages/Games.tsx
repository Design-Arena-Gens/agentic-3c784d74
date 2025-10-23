import { useEffect, useState } from 'react'
import { deleteGame, listGames } from '../lib/db'
import { Game } from '../lib/types'
import { Link } from 'react-router-dom'

export function Games() {
  const [games, setGames] = useState<Game[]>([])
  const [q, setQ] = useState('')

  useEffect(() => { listGames().then(setGames) }, [])

  const filtered = games.filter(g => g.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-xl">Game Library</h1>
      <input className="w-full bg-black border border-neutral-700 rounded p-2" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="space-y-2">
        {filtered.map(g => (
          <div key={g.id} className="bg-neutral-900 rounded-lg p-3 border border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{g.name}</div>
                <div className="text-sm text-neutral-400">{g.players.map(p => p.name).join(' vs ')}</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/game/${g.id}`} className="text-accent">Open</Link>
                <button onClick={async () => { await deleteGame(g.id); setGames(await listGames()) }} className="text-red-400">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-neutral-400">No games found.</div>}
      </div>
    </div>
  )
}
