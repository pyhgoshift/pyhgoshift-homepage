"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Brain,
  Shield,
  Zap,
  Cpu,
  Layers,
  Network,
  Terminal,
  Activity,
  ArrowRight,
  CheckCircle2,
  Server,
  Sparkles,
  Compass,
  Code2,
  Lock,
  MessageSquare,
  Globe,
  ChevronRight,
  TrendingUp,
  HeartPulse,
  Send,
  Workflow,
  ExternalLink
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    division: "Growshift (SI / 업무자동화)",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFormStatus("success");
        setStatusMessage(data.message || "문의가 안전하게 접수되었습니다.");
        setFormData({ name: "", email: "", company: "", division: "Growshift (SI / 업무자동화)", message: "" });
      } else {
        setFormStatus("error");
        setStatusMessage(data.error || "제출 중 문제가 발생했습니다.");
      }
    } catch {
      setFormStatus("error");
      setStatusMessage("네트워크 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div className="min-h-screen refero-bg-grid text-[#f5f5f5] selection:bg-[#a881fe] selection:text-[#0b0b0b] relative">
      {/* 1. TOP NAVBAR (Refero Ultra-Glass) */}
      <header className="sticky top-0 z-50 refero-glass-nav">
        <div className="max-w-[1240px] mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-[#a881fe]/40 bg-[#121218]/80 shadow-[0_0_18px_rgba(168,129,254,0.3)] flex items-center justify-center p-1 group transition-all duration-300 hover:border-[#a881fe] hover:shadow-[0_0_24px_rgba(168,129,254,0.6)]">
              <Image
                src="/images/pyhgoshift_symbol.png"
                alt="PYHGOSHIFT Logo"
                width={48}
                height={48}
                className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg text-white font-sans flex items-center gap-1.5">
                PYHGOSHIFT
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#a881fe]/20 text-[#ccb2ff] border border-[#a881fe]/40">v2.0</span>
              </span>
              <span className="text-[10px] text-[#ccb2ff] font-mono tracking-widest -mt-0.5 uppercase">
                Digital Workforce Hub
              </span>
            </div>
          </div>

          {/* Desktop Navigation - 5대 명확한 메뉴 구조 + AI 계산기 도구 */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#c0c0c0]">
            <a href="#philosophy" className="hover:text-white transition-colors flex items-center gap-1">
              <span>철학과 이념</span>
            </a>
            <a href="#council" className="hover:text-white transition-colors flex items-center gap-1">
              <span>더 세븐 박 (7 Parks)</span>
            </a>
            <a href="#divisions" className="hover:text-white transition-colors flex items-center gap-1">
              <span>5대 사업부 (P-Y-H-G-O)</span>
            </a>
            <a href="#architecture" className="hover:text-white transition-colors flex items-center gap-1">
              <span>AgentOps 인프라</span>
            </a>
            <a href="/tools/vram-calc" className="text-[#a881fe] hover:text-[#c4a9fe] font-semibold transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#a881fe]/10 border border-[#a881fe]/30 shadow-[0_0_12px_rgba(168,129,254,0.2)]">
              <Zap className="w-3.5 h-3.5" />
              <span>VRAM 계산기</span>
            </a>
            <a href="#contact" className="hover:text-white transition-colors flex items-center gap-1">
              <span>도입 문의</span>
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822]/80 border border-white/10 text-xs text-[#aeaeae] font-mono shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a881fe] animate-pulse"></span>
              <span>192.168.64.31:3001</span>
            </div>
            <a
              href="#contact"
              className="uizard-cta-primary px-4 py-2 text-xs uppercase tracking-wider font-semibold shadow-md"
            >
              도입 상담하기
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#aeaeae] hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
            >
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#0c0c12]/98 backdrop-blur-2xl px-6 pt-3 pb-6 space-y-3 text-sm text-[#aeaeae]">
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">1. 철학과 이념 (자아 훼방)</a>
            <a href="#council" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">2. 더 세븐 박 (7 Parks 집단지성)</a>
            <a href="#divisions" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">3. 5대 전략 사업부 (P-Y-H-G-O)</a>
            <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">4. AgentOps 기술 인프라</a>
            <a href="/tools/vram-calc" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 rounded-lg bg-[#a881fe]/15 text-[#ccb2ff] font-semibold border border-[#a881fe]/30">⚡ AI VRAM & 하드웨어 계산기 →</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#a881fe] font-semibold">5. 에이전트 도입 상담 →</a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION (Violet Aurora Over Obsidian) */}
      <section className="relative pt-24 pb-28 overflow-hidden aurora-bloom">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181b] border border-[#2e2e2e] text-xs text-[#a881fe] mb-8 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#a881fe]" />
            <span className="font-semibold tracking-wider">THE AUTONOMOUS AGENT WORKFORCE</span>
          </div>

          {/* Official CI Centerpiece */}
          <div className="relative mx-auto mb-10 w-48 sm:w-60 md:w-72 aspect-square flex items-center justify-center">
            {/* Violet Glow Aura */}
            <div className="absolute inset-0 rounded-full bg-[#a881fe]/25 blur-3xl pointer-events-none"></div>
            <div className="relative w-full h-full p-4 rounded-3xl bg-[#141414] border border-[#a881fe]/40 shadow-[0_12px_36px_-4px_rgba(168,129,254,0.35)] flex items-center justify-center hover:border-[#a881fe] transition-all duration-300 group">
              <Image
                src="/images/pyhgoshift_symbol.png"
                alt="PYHGOSHIFT Official Symbol"
                width={280}
                height={280}
                className="object-contain w-full h-full drop-shadow-[0_0_30px_rgba(168,129,254,0.6)] group-hover:scale-105 transition-all duration-300"
                priority
              />
            </div>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            자아를 훼방시켜, <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#ccb2ff] to-[#a881fe]">
              규칙 안 숨겨진 가치
            </span>
            를 발굴·극대화한다
          </h1>

          <p className="mt-8 text-base sm:text-lg text-[#aeaeae] max-w-2xl mx-auto font-normal leading-relaxed">
            파이고시프트(PYHGOSHIFT)는 박용희 창업자의 두뇌를 외부로 확장한 지능형 시스템이자,
            <span className="text-[#f5f5f5] font-medium"> 인간의 개입을 0으로 만드는 자율 에이전트(AgentOps)</span> 플랫폼입니다.
            더 세븐 박(The 7 Parks)의 집단 지성이 현실 비즈니스를 자율적으로 정복합니다.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="uizard-cta-primary px-7 py-3.5 text-sm flex items-center gap-2 group"
            >
              <span>에이전트 도입 상담</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#council"
              className="uizard-btn-secondary px-7 py-3.5 text-sm flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-[#a881fe]" />
              <span>더 세븐 박 임원진 보기</span>
            </a>
          </div>

          {/* 4 Architectural Metric Cards */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="uizard-card p-6">
              <div className="text-[#a881fe] text-2xl font-bold font-mono">The 7 Parks</div>
              <div className="text-xs text-[#aeaeae] mt-1.5">7인 아바타 임원진 집단 지성</div>
            </div>
            <div className="uizard-card p-6">
              <div className="text-white text-2xl font-bold font-mono">P-Y-H-G-O</div>
              <div className="text-xs text-[#aeaeae] mt-1.5">5대 전략 사업부 수직 계열화</div>
            </div>
            <div className="uizard-card p-6">
              <div className="text-[#a881fe] text-2xl font-bold font-mono">0-Click KB</div>
              <div className="text-xs text-[#aeaeae] mt-1.5">Karpathy 5계층 자율 지식 누적</div>
            </div>
            <div className="uizard-card p-6">
              <div className="text-white text-2xl font-bold font-mono">Port 3001</div>
              <div className="text-xs text-[#aeaeae] mt-1.5">사내 Nginx & 글로벌 터널 연동</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY & NORTH STAR (80px section gap) */}
      <section id="philosophy" className="py-20 border-t border-[#2e2e2e]/70 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono text-[#a881fe] uppercase tracking-widest mb-3">Core Identity & Mission</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              핵심 철학: <span className="text-[#a881fe]">자아 훼방 (Ego Disruption)</span>
            </h2>
            <p className="mt-4 text-[#aeaeae] text-sm sm:text-base leading-relaxed">
              PYHGOSHIFT는 규칙을 깨지 않습니다. 규칙과 규정의 범주 안에서, 자아의 고정관념을 일시적으로 흔들어
              보이지 않던 가치를 발굴·극대화합니다. (자아 해방 X, 자아 초월 X)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* 자아훼방 4단계 의사결정 프로세스 */}
            <div className="uizard-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-[#18181b] border border-[#2e2e2e] text-[#a881fe]">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">자아훼방 4단계 의사결정 프로세스</h3>
                    <p className="text-xs text-[#aeaeae] font-mono">Ego Disruption 4-Step Cycle</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] font-mono font-bold text-xs flex items-center justify-center shrink-0">1</div>
                    <div>
                      <div className="text-sm font-semibold text-white">규칙 인식 (Rule Recognition)</div>
                      <div className="text-xs text-[#aeaeae] mt-1">현재 시장·기술·법률·인프라의 규칙과 한계를 정확히 파악합니다.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] font-mono font-bold text-xs flex items-center justify-center shrink-0">2</div>
                    <div>
                      <div className="text-sm font-semibold text-white">자아 훼방 (Ego Disruption)</div>
                      <div className="text-xs text-[#aeaeae] mt-1">"원래 이렇게 하는 거다"라는 고정관념과 당연시하는 자아를 흔듭니다.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] font-mono font-bold text-xs flex items-center justify-center shrink-0">3</div>
                    <div>
                      <div className="text-sm font-semibold text-white">숨은 가치 발굴 (Hidden Value Discovery)</div>
                      <div className="text-xs text-[#aeaeae] mt-1">정해진 규칙 안에서 아무도 발견하지 못했던 혁신 기회를 도출합니다.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] font-mono font-bold text-xs flex items-center justify-center shrink-0">4</div>
                    <div>
                      <div className="text-sm font-semibold text-white">가치 극대화 (Value Maximization)</div>
                      <div className="text-xs text-[#aeaeae] mt-1">인간의 개입을 0으로 만드는 자율 실행 솔루션으로 구현하여 완결합니다.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2e2e2e] text-xs text-[#aeaeae] font-mono flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#a881fe]" />
                <span>원칙: 자아 해방(X)·초월(X)을 배제하고, 규칙 안에서 가치를 극대화합니다.</span>
              </div>
            </div>

            {/* 북극성 (North Star) & Karpathy 5계층 지식 분류 */}
            <div className="uizard-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-[#18181b] border border-[#2e2e2e] text-[#a881fe]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">북극성 (North Star) & 지식 복리 엔진</h3>
                    <p className="text-xs text-[#aeaeae] font-mono">Karpathy 2nd Brain Architecture</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] mb-5">
                  <div className="text-[11px] font-mono text-[#a881fe] uppercase tracking-wider">Ultimate Vision</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-1 italic">
                    "내가 죽어도 PYHGOSHIFT KB는 계속 자라야 한다"
                  </div>
                  <div className="text-xs text-[#aeaeae] mt-2">
                    단일 인물의 부재에도 영구히 자라나는 5계층 지식과 자율 의회 시스템
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-[#f5f5f5] uppercase tracking-wider font-mono">
                    5계층 지식 분류 체계 (Metadata Standard)
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e]">
                      <span className="font-bold text-[#a881fe]">fact</span>
                      <p className="text-[#aeaeae] text-[11px] mt-0.5">영구 보존되는 불변의 진실</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e]">
                      <span className="font-bold text-white">insight</span>
                      <p className="text-[#aeaeae] text-[11px] mt-0.5">박용희 창업자의 직관과 통찰</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e]">
                      <span className="font-bold text-[#aeaeae]">opinion</span>
                      <p className="text-[#aeaeae] text-[11px] mt-0.5">변하는 의견 (1년 주기 검토)</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e]">
                      <span className="font-bold text-[#ccb2ff]">hypothesis</span>
                      <p className="text-[#aeaeae] text-[11px] mt-0.5">검증 대기 가설 (6개월 주기 검증)</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e] text-xs">
                    <span className="font-bold text-emerald-400">decision</span>
                    <span className="text-[#aeaeae] text-[11px] ml-2">의사결정 결과 영구 기록 및 불변 감사 추적</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2e2e2e] text-xs text-[#aeaeae] font-mono flex items-center justify-between">
                <span>0클릭 수집: 텔레그램봇 · 노션 · 음성STT</span>
                <span className="text-[#a881fe]">외부 순환 환류</span>
              </div>
            </div>
          </div>

          {/* OFFICIAL BRAND IDENTITY BANNER */}
          <div className="mt-8 uizard-card p-6 md:p-8 bg-gradient-to-r from-[#141414] via-[#120e24] to-[#141414] border border-[#2e2e2e]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-44 h-44 rounded-2xl bg-[#0b0b0b] border border-[#a881fe]/40 p-3 shadow-[0_0_30px_rgba(168,129,254,0.35)] flex items-center justify-center">
                  <Image
                    src="/images/pyhgoshift_symbol.png"
                    alt="PYHGOSHIFT CI Emblem"
                    width={170}
                    height={170}
                    className="object-contain w-full h-full drop-shadow-[0_0_20px_rgba(168,129,254,0.5)]"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-[#2e2e2e] text-xs text-[#a881fe] font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#a881fe]" />
                  <span>OFFICIAL BRAND IDENTITY & SYMBOL</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  한반도의 지능형 에너지와 자아 훼방(Ego Disruption)의 나선
                </h3>
                <p className="text-[#aeaeae] text-sm leading-relaxed">
                  파이고시프트 공식 CI는 <strong>대한민국 지도 형상</strong>을 모티브로 고정관념을 흔드는 
                  네온 에너지 나선(Shift)과 결합되어 있습니다. 규정의 틀 안에서 자아를 훼방시켜 
                  숨은 가치를 극대화하고, 인간의 개입을 0으로 만드는 자율 에이전트의 강인한 생명력을 표방합니다.
                </p>
                <div className="pt-1 flex flex-wrap gap-2 text-xs font-mono text-[#a881fe]">
                  <span className="px-3 py-1 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e]">• PYH (박용희)</span>
                  <span className="px-3 py-1 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e]">• EGO (자아)</span>
                  <span className="px-3 py-1 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e]">• SHIFT (훼방과 도약)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 7 PARKS EXECUTIVE COUNCIL (Hairline 1px borders, 16px radius) */}
      <section id="council" className="py-20 border-t border-[#2e2e2e]/70 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono text-[#a881fe] uppercase tracking-widest mb-3">Autonomous Leadership</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              더 세븐 박 <span className="text-[#a881fe]">(The 7 Parks)</span> 디지털 노동력
            </h2>
            <p className="mt-4 text-[#aeaeae] text-sm sm:text-base leading-relaxed">
              파이고시프트는 한 사람의 독단이 아닌, 7인의 전문화된 AI 아바타 임원진이 상호 견제와
              반대 의무(Obligation to Dissent)를 수행하며 최선의 의사결정을 도출합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 0. 프로이트 박 */}
            <div className="uizard-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] text-xs font-mono font-semibold">
                    00_CHAIRMAN / CEO
                  </span>
                  <span className="text-[11px] font-mono text-[#aeaeae]">Codex Sonnet</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#a881fe] transition-colors">
                  프로이트 박 (Freud Park)
                </h3>
                <div className="text-xs text-[#ccb2ff] font-medium mb-3">욕망 분석 & 방향 설정</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed mb-4">
                  사용자의 의도가 모호할 때 개입하여 깊은 심연의 본질과 방향을 밝혀냅니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] font-mono text-xs text-[#ccb2ff] italic">
                "당신의 진짜 욕망은 이것입니까?"
              </div>
            </div>

            {/* 1. 파일럿 박 */}
            <div className="uizard-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181b] border border-[#2e2e2e] text-white text-xs font-mono font-semibold">
                    01_CPO / NAVIGATOR
                  </span>
                  <span className="text-[11px] font-mono text-[#aeaeae]">Nemotron 253B</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#a881fe] transition-colors">
                  파일럿 박 (Pilot Park)
                </h3>
                <div className="text-xs text-[#aeaeae] font-medium mb-3">기획, 라우팅 & 아키텍처 항로</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed mb-4">
                  폴더 구조를 잡고, 프로젝트 라우팅과 전체 서비스 기획 항로를 설계합니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] font-mono text-xs text-[#f5f5f5] italic">
                "항로를 설정합니다."
              </div>
            </div>

            {/* 2. 이노베이터 박 */}
            <div className="uizard-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] text-xs font-mono font-semibold">
                    02_CTO / INNOVATOR
                  </span>
                  <span className="text-[11px] font-mono text-[#aeaeae]">Kimi K2 / Sonnet</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#a881fe] transition-colors">
                  이노베이터 박 (Innovator Park)
                </h3>
                <div className="text-xs text-[#a881fe] font-medium mb-3">모던 프론트엔드, UI/UX & 최적화</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed mb-4">
                  Next.js, Tailwind, Uizard 디자인 시스템과 초고속 렌더링을 코딩합니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] font-mono text-xs text-[#a881fe] italic">
                "최신 기술로 구현합니다."
              </div>
            </div>

            {/* 3. 고든 박 */}
            <div className="uizard-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181b] border border-[#2e2e2e] text-rose-300 text-xs font-mono font-semibold">
                    03_CSO / GUARDIAN
                  </span>
                  <span className="text-[11px] font-mono text-[#aeaeae]">Llama 3.3 70B</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                  고든 박 (Gordon Park)
                </h3>
                <div className="text-xs text-rose-400 font-medium mb-3">보안 검증, 미들웨어 & 무결성</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed mb-4">
                  Zod 검증, 권한 통제, 취약점 차단으로 시스템과 데이터 무결성을 수호합니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] font-mono text-xs text-rose-200 italic">
                "보안 승인 완료. 데이터 무결성을 수호합니다."
              </div>
            </div>

            {/* 4. 시냅스 박 */}
            <div className="uizard-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181b] border border-[#2e2e2e] text-emerald-300 text-xs font-mono font-semibold">
                    04_COO / CONNECTOR
                  </span>
                  <span className="text-[11px] font-mono text-[#aeaeae]">Mixtral 8x22B</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  시냅스 박 (Synapse Park)
                </h3>
                <div className="text-xs text-emerald-400 font-medium mb-3">API 신경망, PostgreSQL & 인프라</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed mb-4">
                  N8N, Cloudflare Tunnel, Docker 컨테이너 및 분산 데이터 스트림을 결합합니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] font-mono text-xs text-emerald-200 italic">
                "데이터 흐름을 연결했습니다."
              </div>
            </div>

            {/* 5. 프롬프트 박 */}
            <div className="uizard-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181b] border border-[#2e2e2e] text-amber-300 text-xs font-mono font-semibold">
                    05_CAO / ARCHITECT
                  </span>
                  <span className="text-[11px] font-mono text-[#aeaeae]">Nemotron 70B</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  프롬프트 박 (Prompt Park)
                </h3>
                <div className="text-xs text-amber-400 font-medium mb-3">AI 오케스트레이션 & 에이전트 헌법</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed mb-4">
                  에이전트 헌법(Constitution) 및 LLM 다중 연쇄 프롬프트 로직을 조율합니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e] font-mono text-xs text-amber-200 italic">
                "지능형 프롬프트 오케스트레이션을 완성합니다."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 5 STRATEGIC DIVISIONS (P-Y-H-G-O) */}
      <section id="divisions" className="py-20 border-t border-[#2e2e2e]/70 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono text-[#a881fe] uppercase tracking-widest mb-3">Business Portfolio</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              5대 전략 사업부 <span className="text-[#a881fe]">(P-Y-H-G-O)</span>
            </h2>
            <p className="mt-4 text-[#aeaeae] text-sm sm:text-base leading-relaxed">
              여행, 퀀트 금융, 헬스케어, 엔터프라이즈 SI 자동화, 자율 마케팅까지
              다양한 실물 도메인에 디지털 노동력을 즉시 실전 투입합니다.
            </p>
          </div>

          <div className="space-y-6">
            {/* GROWSHIFT - FLAGSHIP HIGHLIGHT */}
            <div className="uizard-card p-8 border border-[#a881fe]/40 bg-gradient-to-r from-[#141414] via-[#161226] to-[#141414] relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#a881fe] text-[#0b0b0b] font-bold text-xs uppercase tracking-wider rounded-bl-xl font-mono">
                Flagship Division ⭐ Phase 1 Core
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#a881fe]/15 text-[#a881fe] border border-[#a881fe]/30 flex items-center justify-center font-bold text-base font-mono">
                      G
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Growshift (그로우시프트)
                    </h3>
                  </div>
                  <div className="text-sm font-semibold text-[#a881fe] mb-4">
                    엔터프라이즈 SI · PMO 통합 관리 · 지능형 업무 자동화
                  </div>
                  <p className="text-[#aeaeae] text-sm leading-relaxed mb-6">
                    경기교육청 정보자원통합사업 등 대규모 공공/기업 SI 프로젝트의 PMO, WBS 진척 관리,
                    음성 회의 자동 녹음 및 STT 요약, 액션아이템 도출을 100% 자동화하는
                    파이고시프트의 핵심 주력 사업부입니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e]">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#a881fe]" /> STT 회의록 자동화
                      </div>
                      <p className="text-[#aeaeae] text-[11px] mt-1">로컬 Whisper 기반 기밀 회의 실시간 요약</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e]">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#a881fe]" /> PMO WBS 자동 감시
                      </div>
                      <p className="text-[#aeaeae] text-[11px] mt-1">일정 지연 및 이슈 사전 조기 경보</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0b0b0b] border border-[#2e2e2e]">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#a881fe]" /> 공공 SI 산출물 검증
                      </div>
                      <p className="text-[#aeaeae] text-[11px] mt-1">요구사항 추적표 및 문서 정합성 AI 검토</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1 p-6 rounded-2xl bg-[#0b0b0b] border border-[#2e2e2e] text-center flex flex-col justify-center">
                  <div className="text-xs font-mono text-[#a881fe] uppercase tracking-widest mb-2">Lead Persona</div>
                  <div className="text-lg font-bold text-white">시냅스 박 & 파일럿 박</div>
                  <div className="text-xs text-[#aeaeae] mt-2 leading-relaxed">
                    시스템 통합부터 사내 인프라 연동까지 원스톱으로 구축합니다.
                  </div>
                  <a
                    href="#contact"
                    className="uizard-cta-primary mt-5 inline-block py-2.5 px-4 text-xs font-semibold"
                  >
                    SI 자동화 PoC 상담 요청
                  </a>
                </div>
              </div>
            </div>

            {/* OTHER 4 DIVISIONS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* P: Plannershift */}
              <div className="uizard-card p-6">
                <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#2e2e2e] text-white flex items-center justify-center font-bold font-mono mb-4">
                  P
                </div>
                <h4 className="text-base font-bold text-white">Plannershift</h4>
                <div className="text-xs text-[#a881fe] font-medium mb-2">스마트 여행 & 라이프 플래닝</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed">
                  개인 맞춤형 일정과 기상, 로컬 동선을 계산하여 최적의 자율 일정표를 생성합니다.
                </p>
              </div>

              {/* Y: Yieldshift */}
              <div className="uizard-card p-6">
                <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#2e2e2e] text-emerald-400 flex items-center justify-center font-bold font-mono mb-4">
                  Y
                </div>
                <h4 className="text-base font-bold text-white">Yieldshift</h4>
                <div className="text-xs text-emerald-400 font-medium mb-2">주식·투자 퀀트 자동매매</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed">
                  다중 지표 분석과 리스크 수칙을 적용한 알고리즘 기반 자동 포트폴리오 운용.
                </p>
              </div>

              {/* H: Healshift */}
              <div className="uizard-card p-6">
                <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#2e2e2e] text-rose-400 flex items-center justify-center font-bold font-mono mb-4">
                  H
                </div>
                <h4 className="text-base font-bold text-white">Healshift</h4>
                <div className="text-xs text-rose-400 font-medium mb-2">헬스케어 & 생체 데이터 지능</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed">
                  웨어러블 및 건강검진 데이터를 기반으로 맞춤형 예방 건강 루틴을 제공합니다.
                </p>
              </div>

              {/* O: Outreachshift */}
              <div className="uizard-card p-6">
                <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#2e2e2e] text-[#ccb2ff] flex items-center justify-center font-bold font-mono mb-4">
                  O
                </div>
                <h4 className="text-base font-bold text-white">Outreachshift</h4>
                <div className="text-xs text-[#ccb2ff] font-medium mb-2">마케팅 & 지식 외부 선순환</div>
                <p className="text-xs text-[#aeaeae] leading-relaxed">
                  사내 KB의 통찰을 안전하게 콘텐츠화하여 독자 피드백을 다시 두뇌로 환류시킵니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INFRASTRUCTURE & ARCHITECTURE */}
      <section id="architecture" className="py-20 border-t border-[#2e2e2e]/70 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono text-[#a881fe] uppercase tracking-widest mb-3">Enterprise Tech Stack</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              사내 인프라 및 기술 아키텍처
            </h2>
            <p className="mt-4 text-[#aeaeae] text-sm sm:text-base leading-relaxed">
              사내 프라이빗 서버(192.168.64.31)와 Nginx 게이트웨이, Cloudflare Zero Trust 보안 터널을 통한
              엔터프라이즈급 24/7 무중단 운영 체계.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="uizard-card p-6">
              <div className="p-2.5 rounded-xl bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] w-fit mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">서버 인프라 & 게이트웨이</h3>
              <ul className="mt-4 space-y-2 text-xs text-[#aeaeae] font-mono">
                <li>• 서버 IP: 192.168.64.31 (사내망/SSLVPN)</li>
                <li>• Nginx 포트 80 웹 게이트웨이 바인딩</li>
                <li>• Cloudflare Tunnel (포트 3001 ↔ SSL HTTPS)</li>
                <li>• PostgreSQL 16 DB (포트 5432 연동)</li>
              </ul>
            </div>

            <div className="uizard-card p-6">
              <div className="p-2.5 rounded-xl bg-[#18181b] border border-[#2e2e2e] text-white w-fit mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">N8N 자동화 신경망</h3>
              <ul className="mt-4 space-y-2 text-xs text-[#aeaeae] font-mono">
                <li>• 이벤트 트리거 & 액션 기반 파이프라인</li>
                <li>• Slack / Telegram / 이메일 실시간 노티</li>
                <li>• NAS Docker 기반 자율 워크플로우 구동</li>
                <li>• 예외 상황 발생 시 7인 의회 자동 소집</li>
              </ul>
            </div>

            <div className="uizard-card p-6">
              <div className="p-2.5 rounded-xl bg-[#18181b] border border-[#2e2e2e] text-[#a881fe] w-fit mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">모던 풀스택 & CI/CD</h3>
              <ul className="mt-4 space-y-2 text-xs text-[#aeaeae] font-mono">
                <li>• Next.js App Router (Uizard 스타일 시스템)</li>
                <li>• GitHub Actions 자동 빌드 & 테스트</li>
                <li>• 모바일 / 태블릿 / PC 100% 반응형</li>
                <li>• Zod 기반 데이터 무결성 & XSS 방어</li>
              </ul>
            </div>
          </div>

          {/* AI-LLMCheck Architecture Tool Integration Card */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#14141d] border border-[#a881fe]/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#a881fe]/15 text-[#a881fe] text-xs font-mono font-semibold">
                ⭐ New Architecture Tool
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                AI-LLMCheck : 로컬 LLM VRAM 계산 & 하드웨어 진단 도구
              </h3>
              <p className="text-sm text-[#aeaeae] max-w-2xl leading-relaxed">
                현재 접속 PC의 GPU(VRAM) 및 시스템 메모리를 실시간 진단하고, 102종 최신 LLM(Qwen 3, Llama 3.3, DeepSeek R1)의 최적 구동 가능 여부 및 파인튜닝 메모리를 정밀 시뮬레이션합니다.
              </p>
            </div>
            <a
              href="/tools/vram-calc/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#a881fe] hover:bg-[#9063f2] text-black font-bold text-sm tracking-tight transition-all shrink-0 shadow-lg shadow-[#a881fe]/20 flex items-center gap-2 group"
            >
              <span>VRAM 진단기 실행하기</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. CONTACT US & CONSULTATION FORM */}
      <section id="contact" className="py-20 border-t border-[#2e2e2e]/70 relative">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-mono text-[#a881fe] uppercase tracking-widest mb-3">Connect With The 7 Parks</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              에이전트 도입 및 프로젝트 상담
            </h2>
            <p className="mt-4 text-[#aeaeae] text-sm sm:text-base leading-relaxed">
              귀사의 SI 과업, PMO 자동화, 지능형 에이전트 도입에 관해 문의를 남겨주시면
              담당 에이전트가 검토 후 신속히 연락드립니다.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b] border border-[#2e2e2e] text-xs text-[#aeaeae] font-mono">
              <span>공식 직통 채널:</span>
              <a href="mailto:pyhgoshift@pyhgoshift.com" className="font-semibold text-white underline hover:text-[#a881fe] transition-colors">
                pyhgoshift@pyhgoshift.com
              </a>
            </div>
          </div>

          <div className="uizard-card p-8 sm:p-10">
            {formStatus === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">문의가 정상 접수되었습니다!</h3>
                <p className="text-[#aeaeae] text-sm max-w-md mx-auto">{statusMessage}</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="uizard-btn-secondary mt-4 px-6 py-2.5 text-xs font-semibold"
                >
                  추가 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-[#aeaeae] mb-2">성함 / 직책 *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="예: 홍길동 팀장"
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e] focus:border-[#a881fe] focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#aeaeae] mb-2">이메일 주소 *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contact@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e] focus:border-[#a881fe] focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-[#aeaeae] mb-2">소속 회사 / 기관명</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="예: 아이티센 / 경기교육청 등"
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e] focus:border-[#a881fe] focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#aeaeae] mb-2">관심 분야 / 사업부</label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e] focus:border-[#a881fe] focus:outline-none text-white text-sm transition-colors"
                    >
                      <option value="Growshift (SI / 업무자동화)">Growshift (SI / PMO 업무자동화)</option>
                      <option value="AgentOps 플랫폼 구축">AgentOps 자율 플랫폼 도입</option>
                      <option value="Plannershift (여행/일정)">Plannershift (라이프 플래닝)</option>
                      <option value="Yieldshift (퀀트/투자)">Yieldshift (투자 알고리즘)</option>
                      <option value="Healshift (헬스케어)">Healshift (생체 지능)</option>
                      <option value="기타 제휴 및 문의">기타 사업 제휴 문의</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#aeaeae] mb-2">문의 상세 내용 *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="프로젝트 개요, 도입 희망 영역, 일정 등을 자유롭게 기술해 주세요."
                    className="w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[#2e2e2e] focus:border-[#a881fe] focus:outline-none text-white text-sm resize-none transition-colors"
                  ></textarea>
                </div>

                {formStatus === "error" && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="uizard-cta-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === "loading" ? (
                    <span>전송 중...</span>
                  ) : (
                    <>
                      <span>문의 전송하기</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-[#2e2e2e]/70 bg-[#0b0b0b] py-12 text-[#aeaeae] text-xs">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#a881fe]/40 bg-[#141414] shadow-[0_0_12px_rgba(168,129,254,0.2)] flex items-center justify-center p-0.5">
                  <Image
                    src="/images/pyhgoshift_symbol.png"
                    alt="PYHGOSHIFT Logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="font-bold text-white text-base tracking-tight">PYHGOSHIFT</span>
              </div>
              <p className="text-[#aeaeae] text-[11px] leading-relaxed">
                자아를 훼방시켜, 규칙 안 숨겨진 가치를 발굴·극대화한다.<br />
                인간의 개입을 0으로 만드는 AgentOps 플랫폼
              </p>
            </div>

            <div>
              <div className="text-white font-semibold mb-3">회사 정보</div>
              <ul className="space-y-1.5 text-[11px]">
                <li>사명: 파이고시프트 (PYHGOSHIFT)</li>
                <li>창업자: 박용희 (Park Yong-Hee)</li>
                <li>도메인: www.pyhgoshift.com</li>
                <li>이메일: pyhgoshift@pyhgoshift.com</li>
              </ul>
            </div>

            <div>
              <div className="text-white font-semibold mb-3">주요 사업부</div>
              <ul className="space-y-1.5 text-[11px]">
                <li>• Growshift (SI / PMO 자동화)</li>
                <li>• Plannershift (여행 플래닝)</li>
                <li>• Yieldshift (퀀트 알고리즘)</li>
                <li>• Healshift (생체 지능 케어)</li>
                <li>• Outreachshift (지식 외부 순환)</li>
              </ul>
            </div>

            <div>
              <div className="text-white font-semibold mb-3">인프라 & 보안</div>
              <ul className="space-y-1.5 text-[11px]">
                <li>• 서버: 192.168.64.31 (Port 3001)</li>
                <li>• Nginx Gateway & Cloudflare Tunnel</li>
                <li>• PostgreSQL 16 (Port 5432)</li>
                <li>• Karpathy 5계층 지식 분류 아키텍처</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#2e2e2e]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>© 2025-2026 PYHGOSHIFT Inc. All rights reserved.</div>
            <div className="flex items-center gap-4 text-[#aeaeae]">
              <span>개인정보처리방침</span>
              <span>이용약관</span>
              <span>보안수칙</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
