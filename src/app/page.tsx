"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ExternalLink,
  Search,
  FileText,
  Play,
  RotateCw,
  FolderGit2,
  Check,
  Copy,
  AlertCircle,
  Radio,
  Sliders,
  Layers3
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Interactive Portal Tab State
  const [activePortalTab, setActivePortalTab] = useState<"pmo" | "setup" | "chatops" | "review" | "rag">("pmo");

  // 2. PMO Report Generator State
  const [pmoWeek, setPmoWeek] = useState("2026-10-W3");
  const [pmoGenerating, setPmoGenerating] = useState(false);
  const [pmoGenerated, setPmoGenerated] = useState(true);
  const [copiedReport, setCopiedReport] = useState(false);

  // 3. Project Setup Form State
  const [setupProjectName, setSetupProjectName] = useState("itcen-agentops-core");
  const [setupPersona, setSetupPersona] = useState("이노베이터 박 [CTO / 혁신]");
  const [setupStack, setSetupStack] = useState("Next.js 16 + FastAPI + PostgreSQL 16");
  const [setupRunning, setSetupRunning] = useState(false);
  const [setupLogs, setSetupLogs] = useState<string[]>([
    "[READY] Karpathy 규격 프로젝트 자동 셋업 엔진 대기 중..."
  ]);

  // 4. RAG Search State
  const [ragQuery, setRagQuery] = useState("");
  const [ragSearching, setRagSearching] = useState(false);
  const [ragResults, setRagResults] = useState([
    {
      title: "안드레 카파시 규격 CLAUDE.md 및 프로젝트 헌장 수립 가이드",
      score: "99.4%",
      category: "프롬프트 박 (CAO)",
      summary: "에이전트가 단독으로 100% 자율 개발을 수행하기 위한 디렉터리 룰셋, 검증 명령어 및 의존성 정의 표준안."
    },
    {
      title: "AgentOps 5대 핵심 기능 및 더 세븐 박(The 7 Parks) 통합 청사진",
      score: "97.8%",
      category: "파일럿 박 (CPO)",
      summary: "PMO 주간 보고서, 프로젝트 셋업, 듀얼 챗옵스, 교차 검증, Qdrant RAG의 아키텍처 및 무중단 배포 체계."
    },
    {
      title: "사내 보안 감사 및 개인정보/토큰 실시간 마스킹 가드레일",
      score: "95.2%",
      category: "고든 박 (CSO)",
      summary: "Zod 기반 런타임 입력 검증, 서킷 브레이커 발동 기준 및 사내 DB 접근 권한 격리 프로토콜."
    }
  ]);

  // 5. Contact Form State
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

  // Actions for Portal
  const handleGeneratePmo = () => {
    setPmoGenerating(true);
    setTimeout(() => {
      setPmoGenerating(false);
      setPmoGenerated(true);
    }, 1200);
  };

  const handleRunSetup = () => {
    setSetupRunning(true);
    setSetupLogs([
      `[1/5] 프로젝트 디렉토리 생성 및 Git Init 시작: ${setupProjectName}`,
      "[2/5] Karpathy 규격 CLAUDE.md 및 AGENTS.md 자동 주입 중...",
      `[3/5] 담당 페르소나 매핑: ${setupPersona}`,
      `[4/5] 기술 스택 및 의존성 락파일 주입: ${setupStack}`,
      "[5/5] Dockerfile 및 Zod 보안 가드레일 활성화 완료! 🚀"
    ]);
    setTimeout(() => {
      setSetupRunning(false);
    }, 1500);
  };

  const handleRagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setRagSearching(true);
    setTimeout(() => {
      setRagSearching(false);
    }, 600);
  };

  return (
    <div className="min-h-screen refero-bg-grid text-[#f5f5f5] selection:bg-[#a881fe] selection:text-[#0b0b0b] relative">
      {/* =========================================================================
          1. TOP NAVBAR (절대 2줄로 꺾이지 않는 Single-Line Ultra-Glass Nav)
      ========================================================================= */}
      <header className="sticky top-0 z-50 refero-glass-nav h-16 sm:h-18 px-4 sm:px-6 flex items-center justify-between border-b border-white/[0.08] backdrop-blur-2xl">
        <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name (Single Line) */}
          <Link href="/" className="flex items-center gap-3 shrink-0 whitespace-nowrap">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#a881fe]/40 bg-[#121218]/90 p-1 shadow-[0_0_15px_rgba(168,129,254,0.3)] flex items-center justify-center">
              <Image
                src="/images/pyhgoshift_symbol.png"
                alt="PYHGOSHIFT Logo"
                width={36}
                height={36}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-white flex items-center gap-1.5">
                PYHGOSHIFT
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#a881fe]/20 text-[#ccb2ff] border border-[#a881fe]/40">v2.5</span>
              </span>
              <span className="text-[9px] text-[#ccb2ff] font-mono tracking-widest uppercase hidden sm:block">
                Digital Workforce Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (한 줄 완벽 정렬, 절대 2줄 방지) */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs xl:text-sm font-medium text-[#c0c0c0] shrink-0 whitespace-nowrap">
            <a href="#philosophy" className="hover:text-white transition-colors">
              철학과 이념
            </a>
            <a href="#council" className="hover:text-white transition-colors">
              더 세븐 박 (7 Parks)
            </a>
            <a href="#divisions" className="hover:text-white transition-colors">
              5대 사업부 (P-Y-H-G-O)
            </a>
            <a href="#portal" className="text-[#a881fe] hover:text-[#c4a9fe] font-semibold transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#a881fe]/10 border border-[#a881fe]/30 shadow-[0_0_12px_rgba(168,129,254,0.25)]">
              <Activity className="w-3.5 h-3.5 text-[#a881fe] animate-pulse" />
              <span>AgentOps 관제 포털</span>
            </a>
            <Link href="/tools/vram-calc" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>VRAM 계산기</span>
            </Link>
            <a href="#contact" className="hover:text-white transition-colors">
              도입 문의
            </a>
          </nav>

          {/* Right Action & Server Live Indicator */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181822]/90 border border-white/10 text-[11px] text-[#aeaeae] font-mono shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-300 font-bold">LIVE</span>
              <span className="text-slate-400">192.168.64.31:3001</span>
            </div>
            <a
              href="#contact"
              className="uizard-cta-primary px-3.5 py-1.5 text-xs font-semibold shadow-md whitespace-nowrap"
            >
              도입 상담
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#aeaeae] hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Menu"
            >
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 border-b border-white/10 bg-[#0c0c14]/98 backdrop-blur-2xl px-6 py-4 space-y-3 text-sm text-[#aeaeae] shadow-2xl z-50">
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">1. 철학과 이념 (자아 훼방)</a>
            <a href="#council" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">2. 더 세븐 박 (7 Parks 집단지성)</a>
            <a href="#divisions" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">3. 5대 전략 사업부 (P-Y-H-G-O)</a>
            <a href="#portal" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 rounded-lg bg-[#a881fe]/20 text-[#ccb2ff] font-bold border border-[#a881fe]/40">⚡ AgentOps 핵심 통합 관제 포털 →</a>
            <Link href="/tools/vram-calc" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>AI VRAM & 하드웨어 계산기</span>
            </Link>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-emerald-400 font-semibold">도입 상담 문의 →</a>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION (Refero Obsidian & Violet Aurora)
      ========================================================================= */}
      <section className="relative pt-20 pb-24 overflow-hidden refero-hero-mesh">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          
          {/* Top Mission Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181824]/90 border border-[#a881fe]/30 text-xs text-[#ccb2ff] mb-8 font-mono shadow-[0_0_20px_rgba(168,129,254,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#a881fe]" />
            <span className="font-semibold tracking-wider">THE 7 PARKS: AUTONOMOUS AGENT WORKFORCE</span>
          </div>

          {/* Official CI Centerpiece */}
          <div className="relative mx-auto mb-8 w-44 sm:w-56 md:w-64 aspect-square flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#a881fe]/20 blur-3xl animate-pulse"></div>
            <Image
              src="/images/pyhgoshift_ci.png"
              alt="PYHGOSHIFT Official CI"
              width={260}
              height={260}
              className="object-contain relative z-10 drop-shadow-[0_0_35px_rgba(168,129,254,0.45)] hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* Main Title & Slogan */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            자아를 훼방하고, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ccb2ff] to-[#a881fe]">
              인간 개입 0%의 디지털 노동력
            </span>
            을 완성한다.
          </h1>

          <p className="max-w-2xl mx-auto text-[#b0b0b8] text-sm sm:text-base mb-10 leading-relaxed font-sans">
            파이고시프트(PyhgoShift)는 기존의 고착된 자아와 관습을 의도적으로 훼방하여 보이지 않던 본질적 가치를 극대화합니다. 
            <strong>더 세븐 박(The 7 Parks)</strong>의 자율 에이전트 집단 지성이 사내 PMO와 SI 라이프사이클을 스스로 통제합니다.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#portal"
              className="uizard-cta-primary px-6 py-3.5 text-sm font-bold flex items-center gap-2 group shadow-xl"
            >
              <Activity className="w-4 h-4 text-[#08080a]" />
              <span>통합 관제 포털 실행</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/tools/vram-calc"
              className="px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#a881fe]/50 text-sm font-semibold text-white transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>AI VRAM 계산기 열기</span>
            </Link>
          </div>

          {/* 3 Metric Badges */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="refero-glass-card p-4 text-center">
              <div className="text-2xl font-mono font-extrabold text-[#a881fe]">0%</div>
              <div className="text-xs text-[#a0a0a8] mt-1">인간 개입 제로 (AgentOps)</div>
            </div>
            <div className="refero-glass-card p-4 text-center">
              <div className="text-2xl font-mono font-extrabold text-cyan-400">7 Parks</div>
              <div className="text-xs text-[#a0a0a8] mt-1">집단지성 자율 의결 시스템</div>
            </div>
            <div className="refero-glass-card p-4 text-center">
              <div className="text-2xl font-mono font-extrabold text-emerald-400">99.98%</div>
              <div className="text-xs text-[#a0a0a8] mt-1">Self-Healing 자율 회복 성공률</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. 🟢 [A. 핵심 통합 기능] AgentOps MISSION CONTROL PORTAL
      ========================================================================= */}
      <section id="portal" className="py-20 bg-[#09090e] border-y border-white/[0.08] relative">
        <div className="max-w-[1240px] mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a881fe]/15 border border-[#a881fe]/30 text-xs font-mono text-[#ccb2ff] mb-3">
              <Radio className="w-3.5 h-3.5 text-[#a881fe] animate-pulse" />
              <span>ENTERPRISE AGENT INTEGRATION HUB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              더 세븐 박 핵심 에이전트 통합 관제 센터
            </h2>
            <p className="text-sm text-[#9e9ea8] mt-2 leading-relaxed">
              사내 서버(`192.168.64.31`)에서 가동 중인 5대 핵심 에이전트 기능을 웹에서 직접 실행하고 실시간 결과를 확인하십시오.
            </p>
          </div>

          {/* Interactive Portal Console */}
          <div className="refero-glass-card overflow-hidden border border-[#a881fe]/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            
            {/* 5대 핵심 탭 바 */}
            <div className="flex border-b border-white/[0.08] bg-[#101018]/90 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActivePortalTab("pmo")}
                className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activePortalTab === "pmo"
                    ? "border-[#a881fe] text-white bg-[#a881fe]/10 shadow-[inset_0_-2px_8px_rgba(168,129,254,0.3)]"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                }`}
              >
                <FileText className="w-4 h-4 text-[#a881fe]" />
                <span>1. PMO 주간 보고서 (CrewAI)</span>
              </button>

              <button
                onClick={() => setActivePortalTab("setup")}
                className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activePortalTab === "setup"
                    ? "border-[#a881fe] text-white bg-[#a881fe]/10 shadow-[inset_0_-2px_8px_rgba(168,129,254,0.3)]"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                }`}
              >
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>2. 프로젝트 자동 셋업 (Karpathy)</span>
              </button>

              <button
                onClick={() => setActivePortalTab("chatops")}
                className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activePortalTab === "chatops"
                    ? "border-[#a881fe] text-white bg-[#a881fe]/10 shadow-[inset_0_-2px_8px_rgba(168,129,254,0.3)]"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                }`}
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>3. 듀얼 챗옵스 관제 (Slack & Tel)</span>
              </button>

              <button
                onClick={() => setActivePortalTab("review")}
                className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activePortalTab === "review"
                    ? "border-[#a881fe] text-white bg-[#a881fe]/10 shadow-[inset_0_-2px_8px_rgba(168,129,254,0.3)]"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                }`}
              >
                <Shield className="w-4 h-4 text-violet-400" />
                <span>4. Claude + Codex 교차 검증</span>
              </button>

              <button
                onClick={() => setActivePortalTab("rag")}
                className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activePortalTab === "rag"
                    ? "border-[#a881fe] text-white bg-[#a881fe]/10 shadow-[inset_0_-2px_8px_rgba(168,129,254,0.3)]"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                }`}
              >
                <Search className="w-4 h-4 text-pink-400" />
                <span>5. RAG 지식 & 산출물 검색</span>
              </button>
            </div>

            {/* TAB 1: PMO 주간 보고서 자동 생성/조회기 */}
            {activePortalTab === "pmo" && (
              <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#a881fe]" />
                      <span>CrewAI 기반 PMO 주간 종합 보고서 자동 생성 엔진</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      모듈: `report_crew.py` ➔ WBS 공정률, 에이전트 투입 현황, 리스크 식별 내역을 분석하여 실시간 보고서를 편철합니다.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={pmoWeek}
                      onChange={(e) => setPmoWeek(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-[#161622] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#a881fe]"
                    >
                      <option value="2026-10-W3">2026년 10월 3주차 (현재)</option>
                      <option value="2026-10-W2">2026년 10월 2주차 (완료)</option>
                      <option value="2026-10-W1">2026년 10월 1주차 (완료)</option>
                    </select>

                    <button
                      onClick={handleGeneratePmo}
                      disabled={pmoGenerating}
                      className="uizard-cta-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${pmoGenerating ? "animate-spin" : ""}`} />
                      <span>{pmoGenerating ? "CrewAI 분석 중..." : "주간 보고서 즉시 생성"}</span>
                    </button>
                  </div>
                </div>

                {/* Report Viewer Card */}
                {pmoGenerated && (
                  <div className="bg-[#12121a] rounded-2xl border border-white/10 p-6 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                          STATUS: 정상 승인 (VERIFIED)
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          문서 번호: PYHGO-PMO-{pmoWeek}-FINAL
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setCopiedReport(true);
                          setTimeout(() => setCopiedReport(false), 2000);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors"
                      >
                        {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedReport ? "복사 완료!" : "마크다운 복사"}</span>
                      </button>
                    </div>

                    {/* Report Executive Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs text-slate-400">SI 업무자동화 공정률</span>
                        <div className="text-2xl font-mono font-extrabold text-emerald-400 mt-1">94.8%</div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-emerald-400 h-full w-[94.8%]"></div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs text-slate-400">사내 에이전트 포털 통합</span>
                        <div className="text-2xl font-mono font-extrabold text-[#a881fe] mt-1">98.2%</div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-[#a881fe] h-full w-[98.2%]"></div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs text-slate-400">Zod 보안 감사 합격률</span>
                        <div className="text-2xl font-mono font-extrabold text-cyan-400 mt-1">100.0%</div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-cyan-400 h-full w-[100%]"></div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs text-slate-400">활성 에이전트 인력</span>
                        <div className="text-2xl font-mono font-extrabold text-white mt-1">7 / 7 Parks</div>
                        <div className="text-[11px] text-emerald-400 mt-1">전원 무결격 작전 중</div>
                      </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed bg-[#0a0a10] p-5 rounded-xl border border-white/5">
                      <h4 className="font-bold text-white text-sm border-b border-white/10 pb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>[주요 달성 과업 및 에이전트별 활동 내역]</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li>• <strong>파일럿 박 (CPO)</strong>: 통합 포털 아키텍처 청사진(`integrated_portal_blueprint.md`) 수립 및 5대 핵심 기능 매핑 완료.</li>
                        <li>• <strong>이노베이터 박 (CTO)</strong>: Next.js 16.4.0 Standalone 도커 빌드 파이프라인 무결성 확보 및 상단 한 줄 네비게이션 적용.</li>
                        <li>• <strong>고든 박 (CSO)</strong>: 사내 개발서버(`192.168.64.31`) 레거시 도커 캐시 3.5GB 프룬 및 미사용 잔여 폴더 아카이빙 격리 조치.</li>
                        <li>• <strong>시냅스 박 (COO)</strong>: 텔레그램 회사서버봇(@ItcenServerbot) 및 슬랙 AI-PMO 웹소켓 세션 헬스체크 100% 정상 통과.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: 프로젝트 자동 셋업 웹 폼 */}
            {activePortalTab === "setup" && (
              <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="pb-6 border-b border-white/[0.06]">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-cyan-400" />
                    <span>안드레 카파시 규격 프로젝트 자동 셋업 웹 콘솔</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    모듈: `setup_project.py` ➔ 터미널 작업 없이 웹에서 프로젝트명과 스택을 입력하면 `CLAUDE.md`, `AGENTS.md`, Git 레포가 자동 생성됩니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Form */}
                  <div className="space-y-4 bg-[#12121c] p-6 rounded-2xl border border-white/10">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        프로젝트 명칭 (Identifier)
                      </label>
                      <input
                        type="text"
                        value={setupProjectName}
                        onChange={(e) => setSetupProjectName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#181824] border border-white/10 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                        placeholder="예: itcen-agentops-core"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        전담 리드 에이전트 (The 7 Parks)
                      </label>
                      <select
                        value={setupPersona}
                        onChange={(e) => setSetupPersona(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#181824] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="이노베이터 박 [CTO / 혁신]">이노베이터 박 [CTO / 프론트엔드 & 아키텍처]</option>
                        <option value="파일럿 박 [CPO / 항해사]">파일럿 박 [CPO / 로드맵 & 기획]</option>
                        <option value="고든 박 [CSO / 수호자]">고든 박 [CSO / 보안 & 가드레일]</option>
                        <option value="시냅스 박 [COO / 연결자]">시냅스 박 [COO / API 연동 & DB]</option>
                        <option value="프롬프트 박 [CAO / 설계자]">프롬프트 박 [CAO / 프롬프트 & 헌장]</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        기본 기술 스택 (Tech Stacks)
                      </label>
                      <select
                        value={setupStack}
                        onChange={(e) => setSetupStack(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#181824] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Next.js 16 + FastAPI + PostgreSQL 16">Next.js 16 + FastAPI + PostgreSQL 16</option>
                        <option value="CrewAI + LangChain + Python 3.12">CrewAI + LangChain + Python 3.12</option>
                        <option value="Qdrant RAG + FastEmbed + Node 20">Qdrant RAG + FastEmbed + Node 20</option>
                      </select>
                    </div>

                    <button
                      onClick={handleRunSetup}
                      disabled={setupRunning}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#09090e] font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Play className={`w-4 h-4 ${setupRunning ? "animate-spin" : ""}`} />
                      <span>{setupRunning ? "프로젝트 자동 생성 중..." : "원클릭 프로젝트 자동 셋업 실행"}</span>
                    </button>
                  </div>

                  {/* Realtime Terminal Console Output */}
                  <div className="bg-[#0b0b12] p-5 rounded-2xl border border-white/10 font-mono text-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-slate-400">
                        <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>setup_project.py Console Log</span>
                        </span>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded">Karpathy Protocol</span>
                      </div>

                      <div className="space-y-2 text-slate-300 leading-relaxed overflow-y-auto max-h-56">
                        {setupLogs.map((log, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 select-none">&gt;</span>
                            <span className={log.includes("완료") ? "text-emerald-400 font-semibold" : "text-slate-300"}>
                              {log}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                      <span>대상 서버: 192.168.64.31</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Ready for Auto-Deploy</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: 듀얼 챗옵스 통합 관제 패널 */}
            {activePortalTab === "chatops" && (
              <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="pb-6 border-b border-white/[0.06]">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-emerald-400" />
                    <span>사내 듀얼 챗옵스 (Slack & Telegram) 실시간 통합 관제 패널</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    신규 사내 개발 서버(`192.168.64.31`)에 연동된 슬랙 AI-PMO 봇과 텔레그램 회사서버봇의 연결성 및 하트비트를 실시간 모니터링합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Slack Bot Status */}
                  <div className="p-6 rounded-2xl bg-[#12121c] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                        <span className="font-bold text-sm text-white">슬랙 봇: AI-PMO</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ACTIVE 🟢
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono text-slate-300 bg-[#0c0c14] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">네트워크 소켓:</span>
                        <span className="text-emerald-400">WebSocket / RTM 연결됨</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">응답 레이턴시:</span>
                        <span className="text-white">12 ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">월간 가동률:</span>
                        <span className="text-white">99.98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">최근 트리거 명령:</span>
                        <span className="text-cyan-300">/pmo report generate 2026-10-W3</span>
                      </div>
                    </div>
                  </div>

                  {/* Telegram Serverbot Status */}
                  <div className="p-6 rounded-2xl bg-[#12121c] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                        <span className="font-bold text-sm text-white">텔레그램 봇: 회사서버봇 (@ItcenServerbot)</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ACTIVE 🟢
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono text-slate-300 bg-[#0c0c14] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">적용 호스트:</span>
                        <span className="text-emerald-400">192.168.64.31 (사내 개발 서버)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">실행 경로:</span>
                        <span className="text-white">/home/devadm01/itcen-claude-telChatOps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">SSH 세션 연동:</span>
                        <span className="text-white">포트 7722 정상 승인</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">최근 실행 상태:</span>
                        <span className="text-cyan-300">Docker & Next.js 무결성 100% 감시 중</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Claude + Codex 교차 검증 모니터링 */}
            {activePortalTab === "review" && (
              <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="pb-6 border-b border-white/[0.06]">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-violet-400" />
                    <span>Claude + Codex 듀얼 엔진 교차 검증 & Self-Healing 관제</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    주엔진(Claude)의 소스코드 및 문서 생산 결과물을 검수관(Codex)이 독립 검증하여 불일치 시 자율 회복을 수행합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#12121c] border border-white/10 space-y-2">
                    <span className="text-xs text-slate-400">교차 검증 성공률</span>
                    <div className="text-3xl font-mono font-extrabold text-[#a881fe]">99.8%</div>
                    <p className="text-[11px] text-slate-400">총 428회 빌드 중 427회 무결성 승인 통과</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#12121c] border border-white/10 space-y-2">
                    <span className="text-xs text-slate-400">Self-Healing 자율 복구</span>
                    <div className="text-3xl font-mono font-extrabold text-cyan-400">14 건</div>
                    <p className="text-[11px] text-slate-400">인간 개입 0회로 포트/캐시 충돌 자동 치유</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#12121c] border border-white/10 space-y-2">
                    <span className="text-xs text-slate-400">5대 자율 트리거 상태</span>
                    <div className="text-3xl font-mono font-extrabold text-emerald-400">ALL GREEN</div>
                    <p className="text-[11px] text-slate-400">Git Push, 로그 감시, 크론 정상 작동</p>
                  </div>
                </div>

                <div className="bg-[#0b0b12] p-5 rounded-2xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#a881fe]" />
                    <span>최근 자율 회복(Self-Healing) 실행 로그 타임라인</span>
                  </h4>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                      <span className="text-slate-400">14:28:10</span>
                      <span className="text-amber-300">포트 3001 프로세스 충돌 감지</span>
                      <span className="text-emerald-400">➔ Docker 오케스트레이션 자동 리셋 완료 (인간 개입 0%)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                      <span className="text-slate-400">13:56:45</span>
                      <span className="text-amber-300">Turbopack 미추적 파일 빌드 간섭 감지</span>
                      <span className="text-emerald-400">➔ 레거시 아카이빙 격리 및 Standalone 빌드 통과 (자율 치유)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: RAG 지식 & 산출물 검색 */}
            {activePortalTab === "rag" && (
              <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
                <div className="pb-6 border-b border-white/[0.06]">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-pink-400" />
                    <span>PostgreSQL 16 & Qdrant 벡터 RAG 사내 지식 검색기</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    프로젝트 산출물, 규정 가이드, 에이전트 작업 이력을 시맨틱 임베딩 벡터로 고속 검색합니다.
                  </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleRagSearch} className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      placeholder="사내 산출물 또는 에이전트 지식 검색 (예: 카파시 규격, PMO 주간 보고서, Zod 보안)..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#141420] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-pink-600/30 flex items-center gap-2"
                  >
                    <span>{ragSearching ? "검색 중..." : "벡터 검색"}</span>
                  </button>
                </form>

                {/* Results List */}
                <div className="space-y-3">
                  {ragResults.map((item, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-[#12121c] border border-white/10 hover:border-pink-500/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#ccb2ff] bg-[#a881fe]/15 px-2.5 py-0.5 rounded-full border border-[#a881fe]/30">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          유사도: {item.score}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PHILOSOPHY SECTION (자아 훼방과 혁신)
      ========================================================================= */}
      <section id="philosophy" className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#2e2e2e] text-xs text-[#a881fe] mb-3 font-mono">
            <span>CORE PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            의도적인 자아 훼방 (Ego Disruption)
          </h2>
          <p className="text-sm text-[#aeaeae] mt-3 leading-relaxed">
            기존의 고정관념과 조직적 관습은 시야를 가로막습니다. 파이고시프트는 규칙 안에서 자아를 해체하고 재구성하여, 보이지 않던 거대한 가치를 실현합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="refero-glass-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#a881fe]/10 border border-[#a881fe]/30 flex items-center justify-center text-[#a881fe]">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. 자아의 해체</h3>
            <p className="text-xs sm:text-sm text-[#aeaeae] leading-relaxed">
              &quot;내가 옳다&quot;는 확증 편향을 과감히 부수고, 데이터와 엄격한 다중 에이전트 교차 검증만을 진실로 채택합니다.
            </p>
          </div>

          <div className="refero-glass-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. 플로우 상태 (Flow)</h3>
            <p className="text-xs sm:text-sm text-[#aeaeae] leading-relaxed">
              의심과 불안을 걷어내고 온전히 작업 자체와 일체화되는 바이브 코딩(Vibe Coding)의 극한 몰입 상태를 지향합니다.
            </p>
          </div>

          <div className="refero-glass-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. 보이지 않던 가치</h3>
            <p className="text-xs sm:text-sm text-[#aeaeae] leading-relaxed">
              단순 반복적인 개발 노동에서 벗어나, 에이전트 연쇄 자율 구동을 통해 기업 가치를 지수함수적으로 팽창시킵니다.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. THE 7 PARKS (더 세븐 박 집단지성)
      ========================================================================= */}
      <section id="council" className="py-24 bg-[#0a0a0f] border-t border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a881fe]/15 border border-[#a881fe]/30 text-xs font-mono text-[#ccb2ff] mb-3">
              <span>EXECUTIVE AGENT COUNCIL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              더 세븐 박 (The 7 Parks) 시스템
            </h2>
            <p className="text-sm text-[#aeaeae] mt-2">
              상황과 과업의 성격에 따라 동적으로 역할을 전환하며 자율 의결하는 7인의 핵심 페르소나입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="refero-glass-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#a881fe]">PARK #0</span>
                <span className="px-2 py-0.5 rounded bg-[#a881fe]/20 text-[#ccb2ff] text-[10px] font-mono">CEO</span>
              </div>
              <h3 className="text-lg font-bold text-white">프로이트 박 [욕망 분석]</h3>
              <p className="text-xs text-[#aeaeae] leading-relaxed">
                사용자의 의도가 모호하거나 방향이 흔들릴 때 무의식적 본질을 짚어내고 전략적 방향을 제시합니다.
              </p>
            </div>

            <div className="refero-glass-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">PARK #1</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">CPO</span>
              </div>
              <h3 className="text-lg font-bold text-white">파일럿 박 [항해사]</h3>
              <p className="text-xs text-[#aeaeae] leading-relaxed">
                전체 프로젝트의 로드맵, 파일 구조, 라우팅 및 WBS 공정을 총괄 항해합니다.
              </p>
            </div>

            <div className="refero-glass-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">PARK #2</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">CTO</span>
              </div>
              <h3 className="text-lg font-bold text-white">이노베이터 박 [혁신가]</h3>
              <p className="text-xs text-[#aeaeae] leading-relaxed">
                Next.js 16, 모던 UI/UX, 고속 빌드 파이프라인 및 프론트엔드 최적화 코딩을 주도합니다.
              </p>
            </div>

            <div className="refero-glass-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400">PARK #3</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono">CSO</span>
              </div>
              <h3 className="text-lg font-bold text-white">고든 박 [수호자]</h3>
              <p className="text-xs text-[#aeaeae] leading-relaxed">
                Zod 런타임 보안 스키마, 토큰/키 마스킹, 권한 검증 및 에러 서킷 브레이커를 엄격히 통제합니다.
              </p>
            </div>

            <div className="refero-glass-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">PARK #4</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">COO</span>
              </div>
              <h3 className="text-lg font-bold text-white">시냅스 박 [연결자]</h3>
              <p className="text-xs text-[#aeaeae] leading-relaxed">
                FastAPI, 슬랙/텔레그램 챗옵스 웹소켓, PostgreSQL 16 및 Qdrant 데이터 흐름을 직결합니다.
              </p>
            </div>

            <div className="refero-glass-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">PARK #5</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">CAO</span>
              </div>
              <h3 className="text-lg font-bold text-white">프롬프트 박 [설계자]</h3>
              <p className="text-xs text-[#aeaeae] leading-relaxed">
                Karpathy 규격 프로젝트 헌장(CLAUDE.md), 시스템 프롬프트 및 LLM 가드레일을 정밀 설계합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. 5대 사업부 (P-Y-H-G-O)
      ========================================================================= */}
      <section id="divisions" className="py-24 max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#2e2e2e] text-xs text-[#a881fe] mb-3 font-mono">
            <span>BUSINESS STRATEGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            5대 전략 사업부 (P-Y-H-G-O)
          </h2>
          <p className="text-sm text-[#aeaeae] mt-2">
            파이고시프트의 영문 약칭에 기반한 5대 핵심 비즈니스 포트폴리오입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="refero-glass-card p-6 text-center space-y-3">
            <span className="text-3xl font-extrabold text-[#a881fe]">P</span>
            <h4 className="font-bold text-white text-sm">Platform</h4>
            <p className="text-xs text-[#aeaeae]">AgentOps 자율 구동 사내 인프라 및 엔진 구축</p>
          </div>

          <div className="refero-glass-card p-6 text-center space-y-3">
            <span className="text-3xl font-extrabold text-cyan-400">Y</span>
            <h4 className="font-bold text-white text-sm">Yield</h4>
            <p className="text-xs text-[#aeaeae]">인력 투입 대비 산출물 극대화 및 지표 관리</p>
          </div>

          <div className="refero-glass-card p-6 text-center space-y-3">
            <span className="text-3xl font-extrabold text-emerald-400">H</span>
            <h4 className="font-bold text-white text-sm">Humanless</h4>
            <p className="text-xs text-[#aeaeae]">인간 개입 0%를 지향하는 전자동 프로세스화</p>
          </div>

          <div className="refero-glass-card p-6 text-center space-y-3">
            <span className="text-3xl font-extrabold text-amber-400">G</span>
            <h4 className="font-bold text-white text-sm">Growshift</h4>
            <p className="text-xs text-[#aeaeae]">SI 프로젝트 라이프사이클 및 업무자동화 사업</p>
          </div>

          <div className="refero-glass-card p-6 text-center space-y-3">
            <span className="text-3xl font-extrabold text-pink-400">O</span>
            <h4 className="font-bold text-white text-sm">Optimization</h4>
            <p className="text-xs text-[#aeaeae]">하드웨어 VRAM 및 LLM 양자화 자원 최적화</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CONTACT SECTION (도입 문의)
      ========================================================================= */}
      <section id="contact" className="py-24 bg-[#09090e] border-t border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a881fe]/15 border border-[#a881fe]/30 text-xs font-mono text-[#ccb2ff] mb-3">
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              디지털 노동력 도입 및 기술 상담
            </h2>
            <p className="text-sm text-[#aeaeae] mt-2">
              파이고시프트의 AgentOps 플랫폼 도입이나 SI 자동화 컨설팅이 필요하시면 연락처를 남겨주십시오.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="refero-glass-card p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">성함 / 직급</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="예: 홍길동 수석"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141420] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#a881fe]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">이메일 주소</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141420] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#a881fe]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">회사명 / 부서명</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="예: 아이티센 PMO팀"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141420] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#a881fe]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">관심 사업부</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141420] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#a881fe]"
                >
                  <option value="Growshift (SI / 업무자동화)">Growshift (SI / 업무자동화)</option>
                  <option value="Platform (사내 AgentOps 구축)">Platform (사내 AgentOps 구축)</option>
                  <option value="Optimization (LLM VRAM 최적화)">Optimization (LLM VRAM 최적화)</option>
                  <option value="The 7 Parks 에이전트 도입">The 7 Parks 에이전트 도입</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">문의 내용</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="도입을 검토 중인 과업이나 해결하고자 하는 기술적 병목을 남겨주시면 담당 에이전트가 검토합니다."
                className="w-full px-4 py-2.5 rounded-xl bg-[#141420] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#a881fe]"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="w-full uizard-cta-primary py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{formStatus === "loading" ? "전송 중..." : "도입 상담 접수하기"}</span>
            </button>

            {formStatus === "success" && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                {statusMessage}
              </div>
            )}

            {formStatus === "error" && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* =========================================================================
          8. FOOTER
      ========================================================================= */}
      <footer className="py-12 border-t border-white/[0.08] bg-[#07070a] text-xs text-[#80808a]">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white">PYHGOSHIFT</span>
            <span>|</span>
            <span>디지털 노동력 AgentOps 플랫폼</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Host: 192.168.64.31</span>
            <span>Docker: 3001:3000</span>
            <span>Cloudflare Tunnel Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
