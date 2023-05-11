# DanDanPlay Resource API for Node.js

Node.js 版 彈彈play 資源查詢 API server

## 支援資料來源

* `dmhy`：*動漫花園* - share.dmhy.org
* `dmhyanoneko`：*動漫花園 anoneko* - dmhy.anoneko.com

## 使用

安裝全局套件來啟動 Server：

```bash
npm install -g dandanplay-resource-api
```

啟動 Server，預設為 `8123` port：

```bash
dandanplay-resource-api
```

> 或者一次安裝直接啟動 Server：
>
> ```bash
> npx dandanplay-resource-api
> ```

然後開啟 彈彈play 设置中心 > 网络与更新，修改「API 端点」和「资源搜索节点」為 `http://localhost:8123`，即可使用資源搜索和自動下載功能了！

## 選項

### Provider

指定其他資料來源 (目前只支援動漫花園)：

```bash
dandanplay-resource-api --provider=dmhy
```

### Port

監聽在 `3000` port：

```bash
dandanplay-resource-api --port=3000
```

## 開發

用 Git 下載專案到本地，用 Yarn 安裝依賴和啟動 Server：

```bash
yarn
yarn dev
```

編譯資產：

```bash
yarn build
```

## 參考資料

* [Python 實現 API 代碼](https://pastebin.ubuntu.com/p/mGP7JRpBtd/)
* [弹弹play搜索服自行搭建方法](https://jump2.bdimg.com/p/7192130039)
* [弹弹play资源搜索节点API规范](https://github.com/kaedei/dandanplay-libraryindex/blob/master/api/ResourceService.md)
