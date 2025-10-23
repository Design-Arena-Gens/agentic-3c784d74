import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGame, saveGame } from '../lib/db'
import { BallColor, Game as GameType } from '../lib/types'
import { commitFoul, endBreak, getActivePlayer, potColor, potRed } from '../lib/rules'

function vibrate() {
  try { navigator.vibrate?.(50) } catch {}
}

const BALLS: { color: BallColor; label: string }[] = [
  { color: 'red', label: 'Red 1' },
  { color: 'yellow', label: 'Yellow 2' },
  { color: 'green', label: 'Green 3' },
  { color: 'brown', label: 'Brown 4' },
  { color: 'blue', label: 'Blue 5' },
  { color: 'pink', label: 'Pink 6' },
  { color: 'black', label: 'Black 7' },
]

export function Game() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState<GameType | undefined>()

  useEffect(() => {
    if (!id) return
    getGame(id).then(setGame)
  }, [id])

  if (!game) return <div>Loading...</div>

  const active = getActivePlayer(game)

  const onRed = async () => {
    const r = potRed(game)
    if (r.ok) {
      vibrate()
      await saveGame({ ...game })
      setGame({ ...game })
    }
  }
  const onColor = async (c: Exclude<BallColor, 'red'>) => {
    const r = potColor(game, c)
    if (r.ok) {
      vibrate()
      await saveGame({ ...game })
      setGame({ ...game })
    }
  }

  const onFoul = async () => {
    // Simple foul modal replacement: assign 4 by default on red, can extend
    commitFoul(game, 'wrongBallFirst', 'black')
    await saveGame({ ...game })
    setGame({ ...game })
  }

  const onEndBreak = async () => {
    endBreak(game)
    await saveGame({ ...game })
    setGame({ ...game })
  }

  return (
    <div className="space-y-4">
      <div className="bg-neutral-900 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-400">Current Player</div>
          <Link to={`/game/${game.id}/history`} className="text-accent text-sm">History</Link>
        </div>
        <div className="mt-1 text-xl font-heading">{active.name}</div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {game.players.map((p) => (
            <div key={p.id} className={'rounded-lg p-3 border ' + (p.id === active.id ? 'border-accent' : 'border-neutral-800 bg-neutral-800')}>
              <div className="font-semibold">{p.name}</div>
              <div className="font-mono text-2xl">{game.scores[p.id] ?? 0}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-neutral-400">Reds remaining: {game.redsRemaining}</div>
      </div>

      <div className="bg-neutral-900 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-3">
          {BALLS.map((b) => (
            <button
              key={b.color}
              onClick={() => (b.color === 'red' ? onRed() : onColor(b.color as any))}
              className="rounded-xl py-4 font-semibold" style={{
                backgroundColor: ballBg(b.color),
                color: b.color === 'yellow' || b.color === 'green' ? '#000' : '#fff',
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button onClick={onFoul} className="bg-secondary rounded-xl py-3 font-semibold">Foul</button>
          <button onClick={onEndBreak} className="bg-neutral-800 rounded-xl py-3 font-semibold">End Turn</button>
        </div>
      </div>

      {game.state === 'completed' && (
        <div className="bg-primary rounded-xl p-4 text-black">
          <div className="font-heading text-lg">Frame complete</div>
          <button onClick={() => navigate('/')} className="mt-2 underline">Back to Home</button>
        </div>
      )}
    </div>
  )
}

function ballBg(color: BallColor) {
  switch (color) {
    case 'red': return '#ff0000'
    case 'yellow': return '#ffff00'
    case 'green': return '#00ff00'
    case 'brown': return '#964B00'
    case 'blue': return '#0000ff'
    case 'pink': return '#ff69b4'
    case 'black': return '#000000'
  }
}
