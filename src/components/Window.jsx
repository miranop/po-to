import { useRef, useEffect } from 'react'

// ドラッグで移動でき、クリックで最前面に来る Win98 風ウィンドウ
export default function Window({
  title,
  icon,
  width,
  x,
  y,
  z,
  minimized,
  onFocus,
  onClose,
  onMinimize,
  onMove,
  children,
}) {
  // ドラッグ中のマウスとウィンドウ左上のオフセットを保持
  const drag = useRef(null)

  const onTitleMouseDown = (e) => {
    // タイトルバーのボタン上では移動を開始しない
    if (e.target.closest('button')) return
    onFocus()
    drag.current = { dx: e.clientX - x, dy: e.clientY - y }
    e.preventDefault()
  }

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!drag.current) return
      const nextX = e.clientX - drag.current.dx
      const nextY = e.clientY - drag.current.dy
      // 画面外に飛び出しすぎないよう軽くクランプ
      const clampedX = Math.min(Math.max(nextX, -width + 80), window.innerWidth - 40)
      const clampedY = Math.min(Math.max(nextY, 0), window.innerHeight - 60)
      onMove(clampedX, clampedY)
    }
    const onMouseUp = () => {
      drag.current = null
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [width, onMove])

  return (
    <div
      className="window win98-window"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        zIndex: z,
        display: minimized ? 'none' : 'block',
      }}
      onMouseDown={onFocus}
    >
      <div className="title-bar" onMouseDown={onTitleMouseDown}>
        <div className="title-bar-text">
          <img className="title-bar-icon" src={icon} alt="" draggable={false} />
          {title}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize}></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  )
}
