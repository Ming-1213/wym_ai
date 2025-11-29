import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/ChatAI.module.css';
import { chat } from '../llm/index.js';

export default function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // 添加用户消息
    const userMsg = { role: 'user', content: trimmedInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    // 添加“AI生成中…”提示
    setMessages((prev) => [...prev, { role: 'assistant', content: 'AI 生成中...', streaming: true }]);

    try {
      const response = await chat([{ role: 'user', content: trimmedInput }]);

      if (response.code === 0) {
        // 更新 AI 回复
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: response.content, streaming: false };
          return updated;
        });
      } else {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: 'AI生成失败', streaming: false };
          return updated;
        });
      }
    } catch (e) {
      console.error('Chat error:', e);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: 'AI生成失败', streaming: false };
        return updated;
      });
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sending) sendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <h2>AI 医疗助手</h2>
      <div className={styles.chatWindow} ref={scrollRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === 'user' ? styles.userBubble : styles.assistantBubble}
          >
            <div className={styles.meta}>{m.role === 'user' ? '你' : '助手'}</div>
            <div className={styles.content}>{m.content}</div>
          </div>
        ))}
        {sending && <div className={styles.loading}>AI 生成中...</div>}
      </div>
      <div className={styles.inputBar}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="描述症状、药物咨询、健康问题..."
          rows={2}
        />
        <button onClick={sendMessage} disabled={sending || !input.trim()}>
          发送
        </button>
      </div>
    </div>
  );
}
