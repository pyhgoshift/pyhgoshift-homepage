import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Cpu, Home, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI-LLMCheck | 로컬 LLM VRAM 계산기 & 하드웨어 진단 엔진 - PYHGOSHIFT',
  description: '내 PC 하드웨어 실시간 진단 및 102종 최신 LLM(Qwen 3, Llama 3.3, DeepSeek R1) VRAM 요구량 정밀 계산 도구',
};

export default function VramCalcPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] flex flex-col text-white">
      {/* 1. 상단 글로벌 네비게이션 바 (메인 홈페이지 복귀 헤더) */}
      <header className="sticky top-0 z-50 h-16 bg-[#0b0b12]/95 border-b border-white/10 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between shadow-2xl">
        {/* 좌측: 홈으로 돌아가기 버튼 & 로고 */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[#a881fe]/20 border border-white/10 hover:border-[#a881fe]/50 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 text-[#a881fe] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden xs:inline">홈으로</span>
            <span>돌아가기</span>
          </Link>

          <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#a881fe]/40 bg-[#121218] p-0.5">
              <Image
                src="/images/pyhgoshift_symbol.png"
                alt="PYHGOSHIFT Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                PYHGOSHIFT
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#a881fe]/20 text-[#ccb2ff]">Portal</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest hidden md:block">
                Digital Workforce Platform
              </span>
            </div>
          </Link>
        </div>

        {/* 중앙: 도구 명칭 및 뱃지 */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-xs font-medium text-violet-300">
          <Cpu className="w-3.5 h-3.5 text-violet-400" />
          <span>AI-LLMCheck: 온프레미스 LLM & VRAM 하드웨어 계산기</span>
        </div>

        {/* 우측: 메뉴 링크들 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#council"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>더 세븐 박</span>
          </Link>

          <Link
            href="/#divisions"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>5대 사업부</span>
          </Link>

          <Link
            href="/#contact"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#a881fe] hover:bg-[#9266fc] text-[#0b0b12] text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,129,254,0.4)]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>도입 문의</span>
          </Link>
        </div>
      </header>

      {/* 2. 하부 iframe 뷰어 (전체 화면 높이에서 헤더 64px 제외) */}
      <main className="flex-1 w-full relative">
        <iframe
          src="/vram-calc.html?v=20261015_nav"
          className="w-full h-full border-none block"
          style={{ width: '100%', height: 'calc(100vh - 64px)', border: 'none' }}
          title="AI-LLMCheck VRAM Calculator"
        />
      </main>
    </div>
  );
}
