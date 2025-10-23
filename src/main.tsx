import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AppLayout } from './ui/AppLayout'
import { Home } from './pages/Home'
import { NewGame } from './pages/NewGame'
import { Game } from './pages/Game'
import { Games } from './pages/Games'
import { Settings } from './pages/Settings'
import { Help } from './pages/Help'
import { Stats } from './pages/Stats'
import { GameHistory } from './pages/GameHistory'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'game/new', element: <NewGame /> },
      { path: 'game/:id', element: <Game /> },
      { path: 'game/:id/history', element: <GameHistory /> },
      { path: 'games', element: <Games /> },
      { path: 'stats', element: <Stats /> },
      { path: 'settings', element: <Settings /> },
      { path: 'help', element: <Help /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
