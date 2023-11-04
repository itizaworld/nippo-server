# ベースとなるNode.jsのイメージを指定します。ここではノードのバージョンを指定していますが、必要に応じて変更してください。
FROM node:20

# アプリケーションのソースコードを含むディレクトリを指定します。
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピーします。
COPY package*.json ./

# アプリの依存関係をインストールします。
RUN npm install

# アプリケーションのソースコードをコンテナにコピーします。
COPY . .

# アプリケーションがバインドするポートを指定します。
EXPOSE 8080

# アプリケーションを起動します。
CMD ["node", "app.js"]
