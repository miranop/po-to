/*
 * Web Audio API で起動音を「その場で合成」して鳴らします。
 * 音源ファイルを一切使わないので著作権の心配がありません。
 * Windows 98 起動音のような「ふわっと広がる上昇コード」を狙った、完全オリジナルのチャイムです。
 */

export function playStartupChime() {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return

  const ctx = new Ctx()
  // ユーザー操作直後でも稀に suspended なことがあるので明示的に resume
  if (ctx.state === 'suspended') ctx.resume()

  const now = ctx.currentTime

  // 全体の音量エンベロープ（さっと立ち上がり、ゆっくり消える）
  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, now)
  master.gain.exponentialRampToValueAtTime(0.5, now + 0.05)
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)
  master.connect(ctx.destination)

  // 角を取ってやわらかい音色にするローパスフィルター
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 4500
  filter.connect(master)

  // 少しずつ重なって広がる、明るいメジャー系のコード（A・C#・E・A・E）
  const chord = [
    { freq: 220.0, delay: 0.0 }, // A3
    { freq: 277.18, delay: 0.08 }, // C#4
    { freq: 329.63, delay: 0.16 }, // E4
    { freq: 440.0, delay: 0.26 }, // A4
    { freq: 659.25, delay: 0.4 }, // E5（きらめきの上声）
  ]

  for (const note of chord) {
    const start = now + note.delay
    // わずかにデチューンした2音を重ねて厚みを出す
    for (const [type, detune] of [['triangle', 0], ['sine', 4]]) {
      const osc = ctx.createOscillator()
      osc.type = type
      osc.frequency.value = note.freq
      osc.detune.value = detune

      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, start)
      g.gain.exponentialRampToValueAtTime(0.22, start + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, start + 2.4)

      osc.connect(g)
      g.connect(filter)
      osc.start(start)
      osc.stop(start + 2.6)
    }
  }

  // 再生が終わったらリソースを解放
  setTimeout(() => ctx.close().catch(() => {}), 3400)
}
