# PTE Practice Bank — Encrypted Version

## 密钥（重要，妥善保存）
DATA_KEY (base64): FrrXHwIDhNtcmi5/TYGgw+W2+cLUp+jxorPE1eb3CBk=
原始 hex: 16bad71f020384db5c9a2e7f4d81a0c3e5b6f9c2d4a7e8f1a2b3c4d5e6f70819
此密钥用于解密 data.json.enc 和 audio/*.enc。泄露=全部内容可被解密。

## 部署步骤
1. GitHub Pages: 上传本目录全部文件（index.html + data.json.enc + audio/）
2. Cloudflare Worker: 部署 worker.js
   - 环境变量 CREEM_API_KEY = 你的 Creem API key
   - 环境变量 DATA_KEY = 上面的 base64 值
   - 路由: 设为 api 子域或 worker.dev
3. 编辑 index.html 的 LICENSE.CREEM_API = 你的 Worker URL
4. 重新上传 index.html
