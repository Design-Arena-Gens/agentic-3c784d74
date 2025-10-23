import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGame } from '../lib/db'
import { Game } from '../lib/types'

export function GameHistory() {
  const { id } = useParams()
  const [game, setGame] = useState<Game | undefined>()
  useEffect(() => { if (id) getGame(id).then(setGame) }, [id])
  if (!game) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl">History</h1>
        <Link to={`/game/${game.id}`} className="text-accent">Back</Link>
      </div>
      <div className="bg-neutral-900 rounded-xl p-4 space-y-3">
        {game.turns.map((t, i) => (
          <div key={i} className="border border-neutral-800 rounded-lg p-3">
            <div className="font-semibold">Turn {i+1}: {game.players.find(p => p.id === t.playerId)?.name}</div>
            <div className="text-sm text-neutral-400">Break: {t.breakPoints}</div>
            <div className="flex gap-2 flex-wrap mt-2">
              {t.breakEntries.map((e, idx) => (
                <span key={idx} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: colorBg(e.color), color: e.color === 'yellow' || e.color === 'green' ? '#000' : '#fff' }}>{e.color} +{e.points}</span>
              ))}
            </div>
            {t.fouls.length > 0 && (
              <div className="text-sm text-red-400 mt-2">Fouls: {t.fouls.map(f => `${f.type} (${f.points})`).join(', ')}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function colorBg(color: string) {
  switch (color) {
    case 'red': return '#ff0000'
    case 'yellow': return '#ffff00'
    case 'green': return '#00ff00'
    case 'brown': return '#964B00'
    case 'blue': return '#0000ff'
    case 'pink': return '#ff69b4'
    case 'black': return '#000000'
    default: return '#333'
  }
}
