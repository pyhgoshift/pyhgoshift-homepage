"use client";

import React, { useState } from "react";
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
  Workflow
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
        setStatusMessage(data.message || "문의가 성공적으로 접수되었습니다.");
        setFormData({ name: "", email: "", company: "", division: "Growshift (SI / 업무자동화)", message: "" });
      } else {
        setFormStatus("error");
        setStatusMessage(data.error || "제출 중 문제가 발생했습니다.");
      }
    } catch {
      setFormStatus("error");
      setStatusMessage("네트워크 연결에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#04060d] text-slate-100 cyber-grid selection:bg-cyan-500 selection:text-black">
      {/* 1. TOP STATUS BAR & NAVBAR */}
      <div className="bg-slate-950/80 border-b border-cyan-900/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  PYHGOSHIFT
                </span>
                <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest -mt-1 uppercase">
                  AgentOps Platform
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-300">
              <a href="#philosophy" className="hover:text-cyan-400 transition-colors">철학과 이념</a>
              <a href="#council" className="hover:text-cyan-400 transition-colors">더 세븐 박 (7 Parks)</a>
              <a href="#divisions" className="hover:text-cyan-400 transition-colors">5대 사업부 (P-Y-H-G-O)</a>
              <a href="#architecture" className="hover:text-cyan-400 transition-colors">기술 아키텍처</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">문의 및 도입</a>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs text-cyan-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Ops: 192.168.64.31</span>
              </div>
              <a
                href="#contact"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
              >
                도입 상담하기
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-white p-2"
              >
                <Terminal className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-cyan-900/30 bg-[#070b18]/95 px-4 pt-3 pb-5 space-y-3 font-medium text-sm text-slate-300">
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-400">철학과 이념</a>
            <a href="#council" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-400">더 세븐 박 (7 Parks)</a>
            <a href="#divisions" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-400">5대 사업부 (P-Y-H-G-O)</a>
            <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-400">기술 아키텍처</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-400">문의 및 도입</a>
          </div>
        )}
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/15 blur-[140px] pointer-events-none rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 mb-8 font-mono shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="font-semibold tracking-wide">DIGITAL WORKFORCE & AUTONOMOUS AGENT PLATFORM</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-none">
            자아를 훼방시켜, <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              규칙 안 숨겨진 가치
            </span>
            를 발굴·극대화한다
          </h1>

          <p className="mt-8 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            파이고시프트(PYHGOSHIFT)는 박용희 창업자의 두뇌를 외부로 확장한 지능형 시스템이자,
            <span className="text-cyan-300 font-medium"> 인간의 개입을 0으로 만드는 자율 에이전트(AgentOps)</span> 플랫폼입니다.
            더 세븐 박(The 7 Parks)의 집단 지성이 현실의 복잡한 비즈니스를 자율적으로 정복합니다.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group"
            >
              <span>에이전트 도입 상담</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#council"
              className="px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>더 세븐 박 임원진 보기</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-panel p-5 rounded-2xl">
              <div className="text-cyan-400 text-2xl font-bold font-mono">The 7 Parks</div>
              <div className="text-xs text-slate-400 mt-1">7인 아바타 임원진 집단 지성</div>
            </div>
            <div className="glass-panel p-5 rounded-2xl">
              <div className="text-sky-400 text-2xl font-bold font-mono">P-Y-H-G-O</div>
              <div className="text-xs text-slate-400 mt-1">5대 전략 사업부 수직 계열화</div>
            </div>
            <div className="glass-panel p-5 rounded-2xl">
              <div className="text-emerald-400 text-2xl font-bold font-mono">0-Click KB</div>
              <div className="text-xs text-slate-400 mt-1">Karpathy 5계층 자율 지식 누적</div>
            </div>
            <div className="glass-panel p-5 rounded-2xl">
              <div className="text-blue-400 text-2xl font-bold font-mono">Port 80 Ready</div>
              <div className="text-xs text-slate-400 mt-1">사내 Nginx 및 글로벌 도메인 연동</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY & NORTH STAR */}
      <section id="philosophy" className="py-24 border-t border-slate-800/80 bg-[#060914]/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Core Identity & Mission</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              파이고시프트 핵심 철학: <span className="text-cyan-400">자아 훼방 (Ego Disruption)</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              PYHGOSHIFT는 규칙을 파괴하지 않습니다. 규칙과 규정의 테두리 안에서, 우리가 굳게 믿고 있는
              스스로의 고정관념(자아)을 일시적으로 흔들어 그동안 보이지 않던 숨겨진 가치를 발굴하고 극대화합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* 자아훼방 4단계 루프 */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">자아훼방 4단계 의사결정 프로세스</h3>
                    <p className="text-xs text-slate-400 font-mono">Ego Disruption 4-Step Cycle</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">1</div>
                    <div>
                      <div className="text-sm font-bold text-white">규칙 인식 (Rule Recognition)</div>
                      <div className="text-xs text-slate-300 mt-1">현재 시장·기술·법률·인프라의 한계와 규정을 명확히 파악합니다.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">2</div>
                    <div>
                      <div className="text-sm font-bold text-white">자아 훼방 (Ego Disruption)</div>
                      <div className="text-xs text-slate-300 mt-1">"원래 이렇게 하는 거다"라는 개발자와 경영진의 고정관념을 고의로 흔듭니다.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">3</div>
                    <div>
                      <div className="text-sm font-bold text-white">숨은 가치 발굴 (Hidden Value Discovery)</div>
                      <div className="text-xs text-slate-300 mt-1">정해진 규칙 안에서 아무도 보지 못했던 혁신 기회와 틈새를 찾아냅니다.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">4</div>
                    <div>
                      <div className="text-sm font-bold text-white">가치 극대화 (Value Maximization)</div>
                      <div className="text-xs text-slate-300 mt-1">인간의 개입 없는 자율 솔루션과 자동화 파이프라인으로 구현하여 성과를 확장합니다.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-mono flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>원칙: 자아 해방(X) 및 자아 초월(X)을 지양하고, 현실 규범 안에서 가치를 창출합니다.</span>
              </div>
            </div>

            {/* 북극성 (North Star) & 지식 5계층 */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-500/30 text-blue-400">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">북극성 (North Star)과 영구 지식 복리</h3>
                    <p className="text-xs text-slate-400 font-mono">Karpathy 2nd Brain Architecture</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border border-cyan-800/40 mb-6">
                  <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest">Ultimate Vision</div>
                  <div className="text-lg font-bold text-white mt-1 italic">
                    "내가 죽어도 PYHGOSHIFT KB는 계속 자라야 한다"
                  </div>
                  <div className="text-xs text-slate-300 mt-2">
                    단일 인물의 부재에도 멈추지 않는 자율 의회와 지식 자가 증식 엔진
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    5계층 지식 분류 체계 (Metadata Standard)
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                      <span className="font-bold text-cyan-400">fact</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">영구 보존되는 불변의 진실</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                      <span className="font-bold text-sky-400">insight</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">박용희 창업자의 직관과 통찰</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                      <span className="font-bold text-amber-400">opinion</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">시간에 따라 변하는 의견 (1년 주기 검토)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                      <span className="font-bold text-purple-400">hypothesis</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">검증 대기 가설 (6개월 주기 검증)</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 text-xs">
                    <span className="font-bold text-emerald-400">decision</span>
                    <span className="text-slate-400 text-[11px] ml-2">의사결정 결과 영구 기록 및 불변 감사 추적</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-mono flex items-center justify-between">
                <span>0클릭 수집: 텔레그램봇 · 노션 · 음성STT</span>
                <span className="text-cyan-400">외부 순환 활성화</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 7 PARKS EXECUTIVE COUNCIL */}
      <section id="council" className="py-24 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Autonomous Leadership</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              더 세븐 박 <span className="text-cyan-400">(The 7 Parks)</span> 디지털 노동력
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              파이고시프트는 한 명의 독단이 아닌, 7인의 고도로 전문화된 AI 아바타 임원진이 상호 견제와
              반대 의무(Obligation to Dissent)를 수행하며 최선의 의사결정을 도출합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 0. 프로이트 박 */}
            <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                  00_CHAIRMAN / CEO
                </span>
                <span className="text-[11px] font-mono text-slate-400">Codex Sonnet</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                프로이트 박 (Freud Park)
              </h3>
              <div className="text-xs text-purple-400 font-medium mb-3">욕망 분석 & 방향 설정</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                사용자의 의도가 모호할 때 개입하여 깊은 심연의 본질을 밝혀냅니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-purple-200 italic">
                "당신의 진짜 욕망은 이것입니까?"
              </div>
            </div>

            {/* 1. 파일럿 박 */}
            <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-sky-950/80 border border-sky-500/40 text-sky-300 text-xs font-mono font-bold">
                  01_CPO / NAVIGATOR
                </span>
                <span className="text-[11px] font-mono text-slate-400">Nemotron 253B</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                파일럿 박 (Pilot Park)
              </h3>
              <div className="text-xs text-sky-400 font-medium mb-3">기획, 라우팅 & 아키텍처 설계</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                폴더 구조를 잡고, 프로젝트 라우팅과 전체 서비스 기획 항로를 제시합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-sky-200 italic">
                "항로를 설정합니다."
              </div>
            </div>

            {/* 2. 이노베이터 박 */}
            <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                  02_CTO / INNOVATOR
                </span>
                <span className="text-[11px] font-mono text-slate-400">Kimi K2 / Sonnet</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                이노베이터 박 (Innovator Park)
              </h3>
              <div className="text-xs text-cyan-400 font-medium mb-3">모던 프론트엔드, UI/UX & 최적화</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Next.js, Tailwind, 초고속 렌더링과 극상의 시각적 사용자 경험을 코딩합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-cyan-200 italic">
                "최신 기술로 구현합니다."
              </div>
            </div>

            {/* 3. 고든 박 */}
            <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold">
                  03_CSO / GUARDIAN
                </span>
                <span className="text-[11px] font-mono text-slate-400">Llama 3.3 70B</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                고든 박 (Gordon Park)
              </h3>
              <div className="text-xs text-rose-400 font-medium mb-3">보안 검증, 미들웨어 & 무결성</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Zod 스키마, 권한 제어, API 보안 취약점을 엄격히 차단하고 무결성을 수호합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-rose-200 italic">
                "보안 승인 완료. 데이터 무결성을 수호합니다."
              </div>
            </div>

            {/* 4. 시냅스 박 */}
            <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  04_COO / CONNECTOR
                </span>
                <span className="text-[11px] font-mono text-slate-400">Mixtral 8x22B</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                시냅스 박 (Synapse Park)
              </h3>
              <div className="text-xs text-emerald-400 font-medium mb-3">API 신경망, DB & 백엔드 연동</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                N8N, PostgreSQL, 소켓 통신 및 분산 데이터 스트림을 결합합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-emerald-200 italic">
                "데이터 흐름을 연결했습니다."
              </div>
            </div>

            {/* 5. 프롬프트 박 */}
            <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  05_CAO / ARCHITECT
                </span>
                <span className="text-[11px] font-mono text-slate-400">Nemotron 70B</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                프롬프트 박 (Prompt Park)
              </h3>
              <div className="text-xs text-amber-400 font-medium mb-3">AI 오케스트레이션 & 시스템 프롬프트</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                에이전트 헌법(Constitution) 및 LLM 다중 연쇄 프롬프트 로직을 조율합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-amber-200 italic">
                "지능형 프롬프트 오케스트레이션을 완성합니다."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 5 STRATEGIC DIVISIONS (P-Y-H-G-O) */}
      <section id="divisions" className="py-24 border-t border-slate-800/80 bg-[#060914]/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Business Portfolio</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              5대 전략 사업부 <span className="text-cyan-400">(P-Y-H-G-O)</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              파이고시프트는 여행, 퀀트 금융, 헬스케어, 엔터프라이즈 SI 자동화, 자율 마케팅까지
              다양한 실물 도메인에 디지털 노동력을 즉시 실전 투입합니다.
            </p>
          </div>

          <div className="space-y-6">
            {/* GROWSHIFT - FLAGSHIP HIGHLIGHT */}
            <div className="glass-panel p-8 rounded-3xl border-2 border-cyan-500/40 relative overflow-hidden bg-gradient-to-r from-slate-950 via-[#0a1428] to-slate-950">
              <div className="absolute top-0 right-0 px-5 py-1.5 bg-gradient-to-l from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-bl-xl font-mono">
                Flagship Division ⭐ Phase 1 Core
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg font-mono">
                      G
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Growshift (그로우시프트)
                    </h3>
                  </div>
                  <div className="text-sm font-semibold text-cyan-400 mb-4">
                    엔터프라이즈 SI · PMO 통합 관리 · 지능형 업무 자동화
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    경기교육청 정보자원통합사업 등 대규모 공공/기업 SI 프로젝트의 PMO, WBS 진척 관리,
                    음성 회의 자동 녹음 및 STT 요약, 액션아이템 도출을 인간의 손길 없이 100% 자동화하는
                    파이고시프트의 핵심 주력 사업부입니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> STT 회의록 자동화
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">로컬 Whisper 기반 기밀 회의 실시간 요약</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> PMO WBS 자동 감시
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">일정 지연 및 이슈 사전 조기 경보</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 공공 SI 산출물 검증
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">요구사항 추적표 및 문서 정합성 AI 검토</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1 p-6 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-center flex flex-col justify-center">
                  <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2">Lead Persona</div>
                  <div className="text-xl font-bold text-white">시냅스 박 & 파일럿 박</div>
                  <div className="text-xs text-slate-300 mt-2 leading-relaxed">
                    시스템 통합부터 사내 인프라 연동까지 원스톱으로 구축합니다.
                  </div>
                  <a
                    href="#contact"
                    className="mt-5 inline-block py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-cyan-500/20"
                  >
                    SI 자동화 PoC 상담 요청
                  </a>
                </div>
              </div>
            </div>

            {/* OTHER 4 DIVISIONS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* P: Plannershift */}
              <div className="glass-panel p-6 rounded-2xl hover:border-slate-700 transition-all">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono mb-4">
                  P
                </div>
                <h4 className="text-lg font-bold text-white">Plannershift</h4>
                <div className="text-xs text-sky-400 font-medium mb-2">스마트 여행 & 라이프 플래닝</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  개인의 취향과 실시간 기상, 항공, 로컬 동선을 계산하여 최적의 자율 일정표를 생성합니다.
                </p>
              </div>

              {/* Y: Yieldshift */}
              <div className="glass-panel p-6 rounded-2xl hover:border-slate-700 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono mb-4">
                  Y
                </div>
                <h4 className="text-lg font-bold text-white">Yieldshift</h4>
                <div className="text-xs text-emerald-400 font-medium mb-2">주식·투자 퀀트 자동매매</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  다중 지표 분석과 리스크 통제 수칙을 적용한 알고리즘 기반 자동 포트폴리오 운용.
                </p>
              </div>

              {/* H: Healshift */}
              <div className="glass-panel p-6 rounded-2xl hover:border-slate-700 transition-all">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono mb-4">
                  H
                </div>
                <h4 className="text-lg font-bold text-white">Healshift</h4>
                <div className="text-xs text-rose-400 font-medium mb-2">헬스케어 & 생체 데이터 지능</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  웨어러블 및 건강검진 데이터를 기반으로 맞춤형 루틴 및 예방적 건강 가이드를 제공합니다.
                </p>
              </div>

              {/* O: Outreachshift */}
              <div className="glass-panel p-6 rounded-2xl hover:border-slate-700 transition-all">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-mono mb-4">
                  O
                </div>
                <h4 className="text-lg font-bold text-white">Outreachshift</h4>
                <div className="text-xs text-purple-400 font-medium mb-2">마케팅 & 지식 외부 선순환</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  사내 KB에서 추출한 안전한 통찰을 콘텐츠화하여 독자 피드백을 다시 두뇌로 환류시킵니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INFRASTRUCTURE & ARCHITECTURE */}
      <section id="architecture" className="py-24 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Enterprise Tech Stack</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              사내 인프라 및 기술 아키텍처
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              사내 프라이빗 서버(192.168.64.31)와 Nginx 게이트웨이, Cloudflare 보안 터널을 통한
              엔터프라이즈급 24/7 무중단 운영 체계를 갖추고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 w-fit mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">서버 인프라 & 게이트웨이</h3>
              <ul className="mt-4 space-y-2 text-xs text-slate-300 font-mono">
                <li>• 서버 IP: 192.168.64.31 (사내망/SSLVPN)</li>
                <li>• Nginx 포트 80 웹 게이트웨이 바인딩</li>
                <li>• Cloudflare Tunnel (도메인 SSL HTTPS 보안)</li>
                <li>• PostgreSQL 16 DB (포트 5432 연동)</li>
              </ul>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-500/30 text-blue-400 w-fit mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">N8N 자동화 신경망</h3>
              <ul className="mt-4 space-y-2 text-xs text-slate-300 font-mono">
                <li>• 이벤트 트리거 & 액션 기반 파이프라인</li>
                <li>• Slack / Telegram / 이메일 실시간 노티</li>
                <li>• NAS Docker 기반 자율 워크플로우 구동</li>
                <li>• 예외 상황 발생 시 7인 의회 자동 소집</li>
              </ul>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 w-fit mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">모던 풀스택 & CI/CD</h3>
              <ul className="mt-4 space-y-2 text-xs text-slate-300 font-mono">
                <li>• Next.js App Router & Tailwind CSS</li>
                <li>• GitHub Actions 자동 빌드 & 배포</li>
                <li>• 모바일 / 태블릿 / PC 100% 반응형</li>
                <li>• Zod 기반 데이터 무결성 & XSS 방어</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT US & CONSULTATION FORM */}
      <section id="contact" className="py-24 border-t border-slate-800/80 bg-[#060914]/80 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">Connect With The 7 Parks</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              에이전트 도입 및 프로젝트 상담
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              귀사의 SI 과업, PMO 자동화, 지능형 에이전트 도입에 관해 문의를 남겨주시면
              담당 에이전트가 검토 후 신속히 연락드립니다.
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800">
            {formStatus === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">문의가 정상 접수되었습니다!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">{statusMessage}</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition-colors"
                >
                  추가 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">성함 / 직책 *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="예: 홍길동 팀장"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">이메일 주소 *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contact@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">소속 회사 / 기관명</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="예: 아이티센 / 경기교육청 등"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">관심 분야 / 사업부</label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-sm"
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
                  <label className="block text-xs font-medium text-slate-300 mb-2">문의 상세 내용 *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="프로젝트 개요, 도입 희망 영역, 일정 등을 자유롭게 기술해 주세요."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-sm resize-none"
                  ></textarea>
                </div>

                {formStatus === "error" && (
                  <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300">
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
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
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-cyan-500 flex items-center justify-center">
                  <Brain className="w-3.5 h-3.5 text-black" />
                </div>
                <span className="font-bold text-white text-base tracking-wider">PYHGOSHIFT</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
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
                <li>이메일: pyhgoshift@gmail.com</li>
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
                <li>• 서버: 192.168.64.31 (Port 80)</li>
                <li>• Nginx Gateway & Cloudflare Tunnel</li>
                <li>• PostgreSQL 16 (Port 5432)</li>
                <li>• Karpathy 5계층 지식 분류 아키텍처</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>© 2025-2026 PYHGOSHIFT Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
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
