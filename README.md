# DanDanPlay Resource API for Node.js

Node.js 版 DanDanPlay 資源查詢 API server

## 支援資料來源

* [動漫花園](https://share.dmhy.org/)

## 使用

安裝依賴套件：

```
npm install
```

啟動 Server：

```
npm run start
```

開啟 [弹弹play](http://www.dandanplay.com/) 设置中心 > 网络与更新，修改「API 端点」和「资源搜索节点」為 `http://localhost:8123`，即可使用資源搜索和自動下載功能了！

## 參考資料

* [Python 實現 API 代碼](https://pastebin.ubuntu.com/p/mGP7JRpBtd/)
* [弹弹play搜索服自行搭建方法](https://jump2.bdimg.com/p/7192130039)
* [弹弹play资源搜索节点API规范](https://github.com/kaedei/dandanplay-libraryindex/blob/master/api/ResourceService.md)
