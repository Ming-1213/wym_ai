import { getApiClient } from '../services/apiClient';

/** 头像生成 */
export async function generateAvatar(prompt = '健康风格头像') {
  try {
    const client = getApiClient();
    const res = await client.post('/llm/generate-avatar', { prompt });
    if (!res.data || !res.data.dataUrl) {
      throw new Error('返回格式不对');
    }
    return { dataUrl: res.data.dataUrl };
  } catch (e) {
    console.error('generateAvatar error', e);
    throw e;
  }
}

/** AI 聊天 */
export async function chat(messages, onChunk = () => {}) {
  try {
    const client = getApiClient();
    const promptMessages = Array.isArray(messages) ? messages : [{ role: 'user', content: messages }];
    const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

    let full = '';

    if (DEEPSEEK_API_KEY) {
      // 调用 DeepSeek 官方正确接口
      const resp = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: promptMessages,
          stream: false,
        }),
      });

      if (!resp.ok) {
        throw new Error(`DeepSeek 请求失败 status=${resp.status}`);
      }
      const data = await resp.json();

      // deepseek 返回兼容 OpenAI 格式: choices[0].message.content
      full = data.choices?.[0]?.message?.content || data.assistant || '';
    } else {
      // fallback to mock
      const res = await client.post('/llm/chat‑stream', { prompt: promptMessages });
      full = res.data.assistant || res.data.message || '';
    }

    // 流式模拟输出（可选）
    const chunkSize = 50;
    let accumulated = '';
    for (let i = 0; i < full.length; i += chunkSize) {
      const chunk = full.slice(i, i + chunkSize);
      accumulated += chunk;
      onChunk(accumulated);
      await new Promise((r) => setTimeout(r, 50));
    }

    return { code: 0, content: full };
  } catch (e) {
    console.error('chat error', e);
    onChunk('（AI 响应失败）');
    return { code: 1, content: '' };
  }
}