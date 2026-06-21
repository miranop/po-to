import { useState, useEffect, useRef } from 'react'

// 画面下部のタスクバー。スタートボタン・起動中ウィンドウ・時計を表示。
export default function Taskbar({ openWins, defById, startItems, onTaskClick, onOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState(formatTime())
  const startRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  // メニューの外側をクリックしたら閉じる
  useEffect(() => {
    if (!menuOpen) return
    const onDocClick = (e) => {
      if (startRef.current && !startRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [menuOpen])

  const topZ = openWins.length ? Math.max(...openWins.map((w) => w.z)) : 0

  return (
    <div className="taskbar">
      <div className="taskbar-start" ref={startRef}>
        <button
          className={`taskbar-start-button${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="start-flag">🪟</span>
          <strong>スタート</strong>
        </button>

        {menuOpen && (
          <div className="start-menu window">
            <div className="start-menu-side">My&nbsp;Portfolio</div>
            <ul className="start-menu-list">
              {startItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    onOpen(item.id)
                    setMenuOpen(false)
                  }}
                >
                  <span className="start-menu-icon">{item.icon}</span>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="taskbar-divider" />

      <div className="taskbar-tasks">
        {openWins.map((w) => {
          const def = defById[w.id]
          const active = !w.minimized && w.z === topZ
          return (
            <button
              key={w.id}
              className={`taskbar-task${active ? ' active' : ''}`}
              onClick={() => onTaskClick(w.id)}
            >
              <span className="taskbar-task-icon">{def.icon}</span>
              <span className="taskbar-task-label">{def.title}</span>
            </button>
          )
        })}
      </div>

      <div className="taskbar-tray status-bar-field">{time}</div>
    </div>
  )
}

function formatTime() {
  return new Date().toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
