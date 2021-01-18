# DanDanPlay Resource API for Node.js

Node.js 版 DanDanPlay 資源查詢 API server

## 支援資料來源

* [動漫花園](https://share.dmhy.org/)

## 使用

直接安裝並啟動 Server，預設為 `8123` port：

```bash
npx dandanplay-resource-api
```

或者安裝全局套件來啟動 Server：

```bash
npm install -g dandanplay-resource-api
dandanplay-resource-api
```

開啟 [弹弹play](http://www.dandanplay.com/) 设置中心 > 网络与更新，修改「API 端点」和「资源搜索节点」為 `http://localhost:8123`，即可使用資源搜索和自動下載功能了！

## 選項

監聽在 `3000` port：

```bash
dandanplay-resource-api --port=3000
```

## 開發

用 Git 下載專案到本地並安裝完依賴後，即可啟動 Server：

```bash
npx ts-node dandanplay-resource-api
```

編譯資產：

```bash
npm run build
```

## 參考資料

* [Python 實現 API 代碼](https://pastebin.ubuntu.com/p/mGP7JRpBtd/)
* [弹弹play搜索服自行搭建方法](https://jump2.bdimg.com/p/7192130039)
* [弹弹play资源搜索节点API规范](https://github.com/kaedei/dandanplay-libraryindex/blob/master/api/ResourceService.md)
