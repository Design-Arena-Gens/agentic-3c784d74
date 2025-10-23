import { Link } from 'react-router-dom'

export function Settings() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-xl">Settings</h1>
      <div className="bg-neutral-900 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div>Sound & Haptics</div>
          <input type="checkbox" defaultChecked className="accent-accent" />
        </div>
        <div className="flex items-center justify-between">
          <div>Theme</div>
          <select className="bg-black border border-neutral-700 rounded p-2">
            <option>Dark</option>
          </select>
        </div>
        <Link to="/help" className="text-accent">Help</Link>
      </div>
    </div>
  )
}
