import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-LLMCheck | 로컬 LLM VRAM 계산기 & 하드웨어 진단 엔진',
  description: '내 PC 하드웨어 실시간 진단 및 102종 최신 LLM(Qwen 3, Llama 3.3, DeepSeek R1) VRAM 요구량 정밀 계산 도구',
};

export default function VramCalcPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0f]">
      <iframe
        src="/vram-calc.html"
        className="w-full min-h-screen border-none block"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="AI-LLMCheck VRAM Calculator"
      />
    </div>
  );
}
