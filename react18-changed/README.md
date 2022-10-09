# React18 での変更点

## プロジェクト作成

```bash
yarn create react-app projectname --template typescript
```

## 変更点

### 破壊的変更

1. index.tsx の ReactDOM の import 先が違う
   root の作成方法が違う

```tsx
// React18
import ReactDOM from "react-dom/client";

// React17
import ReactDOM from "react-dom";
```

2. StrictMode の挙動
   今後の React の機能追加を想定し、コンポーネントが表示された瞬間に一度破棄し、またすぐに表示するという処理を行なっている
   オフスクリーンという機能追加のため。(今後追加予定)
   オフスクリーン機能の表示切り替えを行うと、コンポーネントそのものが再マウントする挙動をとるようになるため、
   それに備えての挙動となる。useEffect も 2 回実行される

```tsx
// App.tsx 下記をコメントアウトするとオフにできる
<React.StrictMode>
```

### 自動バッチング

set 関数が呼び出されるたびに今までは再レンダリングされていた
イベントハンドラ内で state の更新が行われても、再レンダリングが一度しか起きないようになった

### flushSync

Automatic Batching を意図的に止める処理 使う機会はあまりない

### Transition

startTransition を使うことで、優先度の高くない state 更新であると react に伝えることができる
useTransition を使うことで、isPending を使用できるようになる
useDeferredValue の中に緊急性の高くない値を入れる component に分けた時に使用

### Suspense

ロード中という状態を宣言的に記述できるようになる transitionAPI と組み合わせ可
API 実行時のローディングの状態記述がより宣言的にできる
Suspense を適切に分割することで UX の向上を狙える

- データ取得中のローディングを宣言的に記述できる
- Suspense 単位でストリーミングされたり、ハイドレーションされるので、どの範囲を Suspense で囲むかという設計が重要
- コンポーネントごとに SSR できるようになる

#### SSR

1. URL をサーバーに問い合わせ
2. データリクエスト
3. データレスポンス
4. 取得データを基に HTML を構築
5. HTML を返却

画面遷移でのクリック時に、元々の画面が表示され続ける
SSR 対象のページを表示するには「データの取得」「HTML の構築」がサーバー側で必要なので
全てが完了するまで何も構築できない

_SSR のメリット_

- クライアント側にリソースをおかなくて良いので、初期バンドルサイズを小さくできる
- レンダリングをサーバー側で行うので、クライアントのマシンスペックに依存しない
- SEO で有利
- 動的な OGP の設定なども可能になる
- 最初に全ての JS を読み込む必要がなくなるので、初回起動が速くなる

_SSR のデメリット_

- リクエストごとにサーバー側で「データ取得」「HTML の構築 ⇨ 返却」が行われるので
  画面遷移した際など、コンテンツの表示が遅くなる

#### Streaming HTML

データの取得が必要ない要素はすぐに SSR でコンテンツを返却
データの取得が必要な箇所はまずフォールバックコンテンツを SSR で返却
データ取得と HTML の構築が出来次第、Suspense 単位で HTML 要素を返却
SSR なのに特定の範囲ごとに HTML の変更が行われる
⇨ Streaming HTML

#### Selective Hydration

- 特定のハイドレーション処理を一時中断、別の箇所のハイドレーション処理を優先的に進めれる機能
  ユーザーがクリックを行うと自動的に React 側が判定し、クリックを行ったコンポーネントや、タグの箇所を
  先にハイドレーションし、インタラクティブな状態にする

_Hydration_
サーバー側で生成された HTML に js のロジックを接続していくこと
普通はタグの上から順に Hydration される

## 参考 URL

[https://ja.reactjs.org/blog/2022/03/29/react-v18.html]
