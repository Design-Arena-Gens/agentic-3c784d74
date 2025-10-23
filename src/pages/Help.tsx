export function Help() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-xl">Help & Rules</h1>
      <div className="prose prose-invert max-w-none">
        <h2>Basic Rules</h2>
        <p>Alternate potting: red then a color, repeating until reds are gone, then finish colors in order: yellow, green, brown, blue, pink, black.</p>
        <h2>Fouls</h2>
        <ul>
          <li>Potting cue ball</li>
          <li>Wrong ball first</li>
          <li>No ball contact</li>
          <li>Ball leaving table</li>
        </ul>
      </div>
    </div>
  )
}
