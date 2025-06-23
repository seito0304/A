# React + TypescriptのDocker環境構築

## 概要
React.js + TypescriptのDocker開発環境構築サンプル

## 環境
node v14.17

## クローン
```
git clone https://github.com/hiromu-kon/docker-react-ts-app.git

cd docker-react-ts-app
```

## インストール
```
docker-compose run --rm frontend sh -c 'cd frontend && yarn'
```

## コンテナ起動
```
docker-compose up -d --build
```

`localhost:3000`にアクセスするとReact.jsのページが表示される

開発用サーバーの停止は`control + c`
