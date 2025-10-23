import { useEffect, useState } from 'react'
import { listGames } from '../lib/db'
import { Game } from '../lib/types'

export function Stats() {
  const [games, setGames] = useState<Game[]>([])
  useEffect(() => { listGames().then(setGames) }, [])

  const playerMap = new Map<string, { name: string; total: number; fouls: number; highest: number; wins: number; played: number }>()
  for (const g of games) {
    for (const p of g.players) {
      const entry = playerMap.get(p.id) || { name: p.name, total: 0, fouls: 0, highest: 0, wins: 0, played: 0 }
      entry.total += g.scores[p.id] || 0
      entry.fouls += p.stats.fouls
      entry.highest = Math.max(entry.highest, p.stats.highestBreak)
      entry.played += p.stats.gamesPlayed
      entry.wins += p.stats.wins
      playerMap.set(p.id, entry)
    }
  }

  const rows = Array.from(playerMap.entries()).map(([id, v]) => ({ id, ...v }))

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-xl">Statistics</h1>
      <div className="bg-neutral-900 rounded-xl p-4">
        <table className="w-full text-sm">
          <thead className="text-neutral-400">
            <tr>
              <th className="text-left">Player</th>
              <th>Points</th>
              <th>Highest</th>
              <th>Fouls</th>
              <th>W/L</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="text-center border-t border-neutral-800">
                <td className="text-left py-2">{r.name}</td>
                <td>{r.total}</td>
                <td>{r.highest}</td>
                <td>{r.fouls}</td>
                <td>{r.wins}/{r.played - r.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="text-neutral-400">No statistics yet.</div>}
      </div>
    </div>
  )
}
