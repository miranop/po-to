import DesktopIcon from './DesktopIcon.jsx'

// デスクトップ：背景の上にショートカットアイコンを並べる
export default function Desktop({ icons, onOpen }) {
  return (
    <div className="desktop">
      <div className="desktop-icons">
        {icons.map((def) => (
          <DesktopIcon
            key={def.id}
            label={def.title}
            icon={def.icon}
            onOpen={() => onOpen(def.id)}
          />
        ))}
      </div>
    </div>
  )
}
