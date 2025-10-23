import { create } from 'zustand'
import { Game } from '../lib/types'

type State = {
  currentGame?: Game
}

type Actions = {
  setGame: (game?: Game) => void
}

export const useGameStore = create<State & Actions>((set) => ({
  currentGame: undefined,
  setGame: (game) => set({ currentGame: game }),
}))
