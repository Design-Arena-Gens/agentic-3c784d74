import { Outlet, NavLink, useLocation } from 'react-router-dom'

export function AppLayout() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex-1 container mx-auto max-w-xl w-full px-4 pb-20">
        <header className="py-4 flex items-center justify-between">
          <div className="font-heading text-xl">Snooker Scorer</div>
          <NavLink to="/settings" className="text-sm text-accent">Settings</NavLink>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-xl mx-auto grid grid-cols-4 text-center">
          <Tab to="/" label="Home" active={pathname === '/'} />
          <Tab to="/games" label="Games" active={pathname.startsWith('/games')} />
          <Tab to="/stats" label="Stats" active={pathname.startsWith('/stats')} />
          <Tab to="/settings" label="Settings" active={pathname.startsWith('/settings') || pathname.startsWith('/help')} />
        </div>
      </nav>
    </div>
  )
}

function Tab({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <NavLink
      to={to}
      className={
        'py-3 text-sm ' + (active ? 'text-accent font-semibold' : 'text-neutral-400')
      }
    >
      {label}
    </NavLink>
  )
}
