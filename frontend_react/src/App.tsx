import React, { useState } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('ファイルが選択されていません');
      return;
    }

    setUploadStatus('アップロード中...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('アップロード完了');
        console.log(await response.json());
      } else {
        setUploadStatus('アップロードに失敗しました');
        console.error('エラー:', response.status);
      }
    } catch (error) {
      setUploadStatus('アップロードに失敗しました');
      console.error('エラー:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>アップロード</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUploader;