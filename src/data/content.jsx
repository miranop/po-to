/*
 * ここを編集すれば各ウィンドウの中身を差し替えられます。
 * id        : 内部識別子（重複させないこと）
 * title     : ウィンドウ／アイコンのタイトル
 * icon      : デスクトップアイコンの絵文字（好きな画像URLに変えてもOK）
 * width     : ウィンドウの初期幅(px)
 * body      : ウィンドウ内に表示する JSX
 */

export const windows = [
  {
    id: 'profile',
    title: 'プロフィール',
    icon: '👤',
    width: 380,
    body: (
      <div>
        <p>
          <strong>名前 / Name</strong>
          <br />
          ここにお名前（例：山田 太郎 / Taro Yamada）
        </p>
        <p>
          <strong>肩書き / Title</strong>
          <br />
          ここに肩書き（例：Web エンジニア志望の学生）
        </p>
        <p>
          <strong>自己紹介 / About</strong>
          <br />
          ここに自己紹介文を書いてください。趣味・得意なこと・人柄などを
          数行でまとめると、訪問者に伝わりやすくなります。
        </p>
        <fieldset>
          <legend>スキル</legend>
          <ul className="tree-view" style={{ margin: 0 }}>
            <li>HTML / CSS</li>
            <li>JavaScript / React</li>
            <li>（ここにスキルを追加）</li>
          </ul>
        </fieldset>
      </div>
    ),
  },
  {
    id: 'works',
    title: '実績',
    icon: '🏆',
    width: 420,
    body: (
      <div>
        <p>これまでに作ったもの・参加したプロジェクトを並べます。</p>
        <fieldset>
          <legend>作品 1</legend>
          <p>
            <strong>タイトル：</strong>ここに作品名
          </p>
          <p>
            <strong>概要：</strong>どんなものを、なぜ作ったかを説明します。
          </p>
          <p>
            <a href="#" onClick={(e) => e.preventDefault()}>
              🔗 リンク（GitHub / デモなど）
            </a>
          </p>
        </fieldset>
        <fieldset>
          <legend>作品 2</legend>
          <p>
            <strong>タイトル：</strong>ここに作品名
          </p>
          <p>
            <strong>概要：</strong>説明文をここに。
          </p>
        </fieldset>
      </div>
    ),
  },
  {
    id: 'future',
    title: 'これからやりたいこと',
    icon: '🚀',
    width: 380,
    body: (
      <div>
        <p>これから挑戦したいこと・目標を書きます。</p>
        <ul className="tree-view">
          <li>やりたいこと その1（例：個人開発でアプリを公開する）</li>
          <li>やりたいこと その2（例：バックエンドを学ぶ）</li>
          <li>やりたいこと その3（例：チーム開発を経験する）</li>
        </ul>
        <p>長期的な夢や、3年後にどうなっていたいかを書くのもおすすめです。</p>
      </div>
    ),
  },
]

// 「スタート」メニューや「情報」用の固定ウィンドウ
export const aboutWindow = {
  id: 'about',
  title: 'このサイトについて',
  icon: 'ℹ️',
  width: 340,
  body: (
    <div>
      <p>
        このポートフォリオは <strong>98.css</strong> と React で作られた、
        Windows 98 風のサイトです。
      </p>
      <p>デスクトップのアイコンをダブルクリックすると、各ウィンドウが開きます。</p>
      <ul className="tree-view">
        <li>ウィンドウはドラッグで移動できます</li>
        <li>クリックすると最前面に来ます</li>
        <li>タスクバーで最小化／復元できます</li>
      </ul>
    </div>
  ),
}
