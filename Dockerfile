# ベースイメージ
FROM node:12.16-alpine as base
WORKDIR /src
ENV NUXT_HOST 0.0.0.0

# ビルド用イメージ
FROM base as builder
# キャッシュされるように必要なファイルだけで依存解決する
COPY package.json yarn.lock ./
RUN yarn
# 本ビルド
COPY . .
RUN yarn build

# 実行用のイメージ
FROM base as runner
COPY --from=builder /src /src
# ポート番号はデフォルトでは設定ファイル nuxt.config.ts の値になっています
# 環境変数 NUXT_PORT で外部からポートを変更できます。
# `docker run -p 80:80 -e NUXT_PORT=80 -it haseko-minaie-front`

CMD ["yarn", "start"]
