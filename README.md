# typescript-nuxtjs-boilerplate

## Requirements

* Node.js 12.x
* Yarn v1.x

## Installation

### Node.js

Node.js v12.xをマシンへインストールします。
次のいずれかの方法でのインストールをおすすめします。

* [公式インストーラー](https://nodejs.org/dist/latest-v12.x/)
* [nodebrew](https://github.com/hokaccha/nodebrew)
* [nvm](https://github.com/nvm-sh/nvm)

```shell script
$ node -v
v12.16.2
```

### Yarn

Node.jsのパッケージマネージャー Yarn (v1.x) をインストールします。  
環境によってインストール方法が異なります。

> https://yarnpkg.com/lang/ja/docs/install/

```shell script
# for macOS
$ brew install yarn

# for Windows (with Chocolatey)
$ choco install yarn
```

なお、 `npm install -g yarn` でインストールされたYarnはパッケージの整合性チェックが脆弱なため、必ず推奨される方法でインストールしてください。

### NPM Packages

Nuxtアプリの実行に必要なnpmパッケージをインストールします。

```shell script
$ yarn install
```

### VSCodeで入れて欲しいプラグイン
VSCodeで開発する場合は以下のプラグインを入れておくことをオススメします。  

+ [MarkDown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
+ [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
+ [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
+ [editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
+ [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
+ [stylelint-plus](https://marketplace.visualstudio.com/items?itemName=hex-ci.stylelint-plus)

## Development Server

開発サーバーを起動するには、次のコマンドを実行します。

```shell script
$ yarn dev
```

http://localhost:4000 もしくは ローカルIPの4000番ポート で開発サーバーが起動します。

起動ポートは次のように指定することで変更できます。

```shell script
$ NUXT_PORT=4001 yarn dev
```

## Build

Nuxtアプリをビルドします。
そして、ビルドされたNuxtアプリを起動します。

```shell script
$ yarn build
$ yarn start
```

## 本番向けビルド

Dockerコンテナを作り、その中でNuxtアプリをビルド・起動します。

本番環境では `AWS CloudFormation` を使い、このコマンドを実行することになります。

[こちらを参考](https://github.com/team-lab/lab-standard-2019-nuxt-java/tree/master/.aws)にして、バックエンドのエンジニアにECSの構築を依頼してください。

```shell script
$ docker build .
```

ちなみに、ローカルで `docker-compose` してDockerの挙動を試す場合は以下コマンドを実行してください。

```shell script
$ yarn docker-compose
```

http://localhost:4000/ でコンテナ内で起動されたNuxtサーバーにアクセスできます。

## 環境変数

### `$ yarn dev` 時の環境変数の流れ

`nuxt.config.ts` → `.vue`で`process.env`参照

### `$ yarn docker-compose` 時の環境変数の流れ

`docker-compose.env` →️ `nuxt.config.ts` → `.vue`で`process.env`参照

※ こちらは本番では使われません。ローカルでの確認用です。

### 本番環境 `ECS` での環境変数の流れ

`ECSで設定された環境変数` →️ `nuxt.config.ts` → `.vue`で`process.env`参照



## npm-scripts

|Script|Summary|
|:---:|:---|
|`dev`|Nuxtの開発サーバーを起動します|
|`build`|Nuxtアプリをビルドします|
|`start`|ビルドされたNuxtアプリを起動します|
|`docker-compose`|docker-composeします。Dockerの挙動を確認する用です|
|`lintjs`|ESLintチェックを実行します|
|`lintjs:fix`|ESLintのチェック＋自動修正を実行します|
|`lintcss`|stylelintチェックを実行します|
|`lintcss:fix`|stylelintのチェック＋自動修正を実行します|
