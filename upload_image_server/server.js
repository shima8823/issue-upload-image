const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// multerでファイルアップロードの設定を行う
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // アップロードされたファイルを保存するディレクトリ
  },
  filename: function (req, file, cb) {
    // ファイル名を設定（オリジナルのファイル名を使用）
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// ルーティング設定
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(`requested: ${req.file.originalname}`);
  // ファイルが正常にアップロードされたら、レスポンスを送信
  res.send('ファイルがアップロードされました');
});

// サーバーを起動
app.listen(port, () => {
  console.log(`サーバーがポート${port}で起動しました。`);
});
