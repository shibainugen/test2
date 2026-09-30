# じゃんけんゲーム ✊✌️🖐️

ブラウザで遊べるシンプルなじゃんけんゲームです。「グー」「チョキ」「パー」のボタンを押すと、コンピューターがランダムに手を出して勝敗を判定します。

## 遊び方

`index.html` をブラウザで開くだけで遊べます。

## GitHub Pagesで公開する

1. GitHubリポジトリの **Settings > Pages** を開く
2. **Source** を `GitHub Actions` に設定する
3. `main` ブランチにpushすると、`.github/workflows/deploy-pages.yml` が自動でサイトをデプロイします

デプロイ後は `https://<ユーザー名>.github.io/<リポジトリ名>/` でアクセスできます。

## ファイル構成

- `index.html` - ゲーム画面
- `style.css` - デザイン
- `script.js` - ゲームロジック
