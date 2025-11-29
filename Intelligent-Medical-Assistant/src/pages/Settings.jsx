import React, { useState } from 'react';
import styles from '../styles/Settings.module.css';
import useAuthStore from '../stores/authStore';

export default function Settings() {
  const { user, setUser } = useAuthStore();
  const [avatar, setAvatar] = useState(user.avatar || '/default-avatar.png');
  const [username, setUsername] = useState(user.name || '');
  const [signature, setSignature] = useState(user.signature || '');
  const [uploadPreview, setUploadPreview] = useState(null);
  const [loadingAiAvatar, setLoadingAiAvatar] = useState(false);

  // 选择本地文件
  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 生成本地预览
      const url = URL.createObjectURL(file);
      setUploadPreview(url);
      setAvatar(url);
    }
  };

  // 模拟调用 AI 生成头像
  const generateAiAvatar = async () => {
    setLoadingAiAvatar(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const aiAvatarUrl = `https://i.pravatar.cc/150?u=${Date.now()}`;
      setAvatar(aiAvatarUrl);
      setUploadPreview(null);
    } catch (err) {
      alert('AI头像生成失败，请重试');
    } finally {
      setLoadingAiAvatar(false);
    }
  };

  const handleSave = () => {
    setUser({
      ...user,
      avatar,
      name: username,
      signature,
    });
    alert('保存成功');
  };

  return (
    <div className={styles.container}>
      <h2>设置用户信息</h2>

      <div className={styles.avatarSection}>
        <img src={avatar} alt="头像" className={styles.avatarImage} />
        <div className={styles.avatarButtons}>
          <label className={styles.uploadLabel}>
            本地上传
            <input type="file" accept="image/*" onChange={handleUploadChange} hidden />
          </label>
          <button onClick={generateAiAvatar} disabled={loadingAiAvatar}>
            {loadingAiAvatar ? '生成中...' : 'AI生成头像'}
          </button>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>用户名：</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={20}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>个性签名：</label>
        <textarea
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          rows={3}
          maxLength={100}
        />
      </div>

      <button className={styles.saveBtn} onClick={handleSave}>
        保存修改
      </button>
    </div>
  );
}
