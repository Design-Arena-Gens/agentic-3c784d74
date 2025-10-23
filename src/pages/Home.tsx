import { Link } from 'react-router-dom'
import { listGames } from '../lib/db'
import { useEffect, useState } from 'react'
import { Game } from '../lib/types'

export function Home() {
  const [games, setGames] = useState<Game[]>([])
  useEffect(() => {
    listGames().then((g) => setGames(g.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 5)))
  }, [])

  return (
    <div className="space-y-6">
      <section className="mt-4">
        <Link to="/game/new" className="inline-block bg-primary px-4 py-3 rounded-xl text-white font-semibold w-full text-center">
          Start New Game
        </Link>
      </section>
      <section>
        <h2 className="font-heading text-lg mb-2">Recent Games</h2>
        {games.length === 0 ? (
          <div className="text-neutral-400">No games yet. Start your first game!</div>
        ) : (
          <div className="space-y-2">
            {games.map((g) => (
              <Link key={g.id} to={`/game/${g.id}`} className="block rounded-lg bg-neutral-900 p-3 border border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-sm text-neutral-400">{g.state}</div>
                </div>
                <div className="text-sm text-neutral-400">
                  {g.players.map((p) => p.name).join(' vs ')}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
