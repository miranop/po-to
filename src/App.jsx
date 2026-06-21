import { useState, useCallback } from 'react'
import Desktop from './components/Desktop.jsx'
import Window from './components/Window.jsx'
import Taskbar from './components/Taskbar.jsx'
import { windows as windowDefs, aboutWindow } from './data/content.jsx'

// 開けるウィンドウの一覧（デスクトップに並ぶもの＋スタートメニュー専用）
const allDefs = [...windowDefs, aboutWindow]
const defById = Object.fromEntries(allDefs.map((d) => [d.id, d]))

export default function App() {
  // 現在開いているウィンドウの状態。id をキーに位置・重なり順・最小化を持つ
  const [openWins, setOpenWins] = useState([])
  const [topZ, setTopZ] = useState(10)

  const focusWindow = useCallback((id) => {
    setTopZ((z) => {
      const next = z + 1
      setOpenWins((wins) =>
        wins.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w)),
      )
      return next
    })
  }, [])

  const openWindow = useCallback(
    (id) => {
      setOpenWins((wins) => {
        const existing = wins.find((w) => w.id === id)
        const next = topZ + 1
        setTopZ(next)
        if (existing) {
          // 既に開いている場合は最前面に出して復元
          return wins.map((w) =>
            w.id === id ? { ...w, z: next, minimized: false } : w,
          )
        }
        // 新規はカスケード配置（少しずつずらして重ねて開く）
        const offset = wins.length * 28
        return [
          ...wins,
          {
            id,
            x: 120 + offset,
            y: 80 + offset,
            z: next,
            minimized: false,
          },
        ]
      })
    },
    [topZ],
  )

  const closeWindow = useCallback((id) => {
    setOpenWins((wins) => wins.filter((w) => w.id !== id))
  }, [])

  const minimizeWindow = useCallback((id) => {
    setOpenWins((wins) =>
      wins.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    )
  }, [])

  const moveWindow = useCallback((id, x, y) => {
    setOpenWins((wins) => wins.map((w) => (w.id === id ? { ...w, x, y } : w)))
  }, [])

  // タスクバーのボタンを押したときの挙動（最小化⇔復元のトグル）
  const toggleFromTaskbar = useCallback(
    (id) => {
      const win = openWins.find((w) => w.id === id)
      if (!win) return
      const isTop = win.z === Math.max(...openWins.map((w) => w.z))
      if (win.minimized || !isTop) {
        focusWindow(id)
      } else {
        minimizeWindow(id)
      }
    },
    [openWins, focusWindow, minimizeWindow],
  )

  return (
    <div className="app-root">
      <Desktop icons={windowDefs} onOpen={openWindow} />

      {openWins.map((w) => {
        const def = defById[w.id]
        return (
          <Window
            key={w.id}
            title={def.title}
            icon={def.icon}
            width={def.width}
            x={w.x}
            y={w.y}
            z={w.z}
            minimized={w.minimized}
            onFocus={() => focusWindow(w.id)}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMove={(x, y) => moveWindow(w.id, x, y)}
          >
            {def.body}
          </Window>
        )
      })}

      <Taskbar
        openWins={openWins}
        defById={defById}
        startItems={allDefs}
        onTaskClick={toggleFromTaskbar}
        onOpen={openWindow}
      />
    </div>
  )
}
