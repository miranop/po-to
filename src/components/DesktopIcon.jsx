import { useState } from 'react'

// デスクトップ上のショートカット。シングルクリックで選択、ダブルクリックで開く。
export default function DesktopIcon({ label, icon, onOpen }) {
  const [selected, setSelected] = useState(false)

  return (
    <button
      type="button"
      className={`desktop-icon${selected ? ' selected' : ''}`}
      onClick={() => setSelected(true)}
      onDoubleClick={onOpen}
      onBlur={() => setSelected(false)}
    >
      <img className="desktop-icon-glyph" src={icon} alt="" draggable={false} />
      <span className="desktop-icon-label">{label}</span>
    </button>
  )
}
