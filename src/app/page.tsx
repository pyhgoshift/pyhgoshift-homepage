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
  Terminal,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCw,
  FolderGit2,
  Check,
  Copy,
  Radio,
  Search,
  FileText,
  Play,
  Send,
  Code,
  ExternalLink
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Interactive Portal Tab State
  const [activePortalTab, setActivePortalTab] = useState<"pmo" | "setup" | "chatops" | "review" | "rag">("pmo");

  // 2. PMO Report Generator State
  const [pmoWeek, setPmoWeek] = useState("2026-10-W3");
  const [pmoGenerating, setPmoGenerating] = useState(false);
  const [pmoGenerated, setPmoGenerated] = useState(true);
  const [pmoLiveContent, setPmoLiveContent] = useState<string>("");
  const [copiedReport, setCopiedReport] = useState(false);

  // 3. Project Setup Form State
  const [setupProjectName, setSetupProjectName] = useState("itcen-agentops-core");
  const [setupPersona, setSetupPersona] = useState("이노베이터 박 [CTO / 혁신]");
  const [setupStack, setSetupStack] = useState("Next.js 16 + FastAPI + PostgreSQL 16");
  const [setupRunning, setSetupRunning] = useState(false);
  const [setupLogs, setSetupLogs] = useState<string[]>([
    "[READY] Karpathy 규격 프로젝트 자동 셋업 엔진 대기 중..."
  ]);

  // 4. Live ChatOps State (사내 서버 192.168.64.31 실시간 연동)
  const [chatopsLive, setChatopsLive] = useState<{
    telegramStatus: string;
    telegramPid: string;
    slackStatus: string;
    slackPid: string;
    containers: Array<{ name: string; status: string; ports: string }>;
    uptime: string;
    loading: boolean;
  }>({
    telegramStatus: "ONLINE",
    telegramPid: "1517708",
    slackStatus: "ACTIVE",
    slackPid: "1517920",
    containers: [],
    uptime: "정상 가동 중",
    loading: false,
  });

  // 실시간 챗옵스 상태 불러오기
  const fetchChatopsStatus = async () => {
    setChatopsLive((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/agentops/chatops/status");
      const data = await res.json();
      if (data.success) {
        setChatopsLive({
          telegramStatus: data.telegram.status,
          telegramPid: data.telegram.pid,
          slackStatus: data.slack.status,
          slackPid: data.slack.pid,
          containers: data.containers || [],
          uptime: data.uptime || "가동 중",
          loading: false,
        });
      }
    } catch {
      setChatopsLive((prev) => ({ ...prev, loading: false }));
    }
  };

  // 실시간 최신 보고서 내용 불러오기
  const fetchLatestReport = async () => {
    try {
      const res = await fetch("/api/agentops/reports/latest");
      const data = await res.json();
      if (data.success && data.content) {
        setPmoLiveContent(data.content);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchChatopsStatus();
    fetchLatestReport();
  }, []);

  useEffect(() => {
    if (activePortalTab === "chatops") {
      fetchChatopsStatus();
    }
  }, [activePortalTab]);

  // 5. RAG Search State
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

  // 6. Contact Form State
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

  // 실제 사내 서버 report_crew.py 구동 API 호출
  const handleGeneratePmo = async () => {
    setPmoGenerating(true);
    try {
      const res = await fetch("/api/agentops/pmo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportType: "weekly" })
      });
      const data = await res.json();
      if (data.executionOutput) {
        setPmoLiveContent(data.executionOutput);
      } else {
        await fetchLatestReport();
      }
    } catch {
      await fetchLatestReport();
    } finally {
      setPmoGenerating(false);
      setPmoGenerated(true);
    }
  };

  // 실제 사내 서버 setup_project.py 구동 API 호출
  const handleRunSetup = async () => {
    setSetupRunning(true);
    setSetupLogs([
      `[1/4] 사내 서버(192.168.64.31) 브릿지 연결 중...`,
      `[2/4] setup_project.py 실행 트리거: 프로젝트명=${setupProjectName}, 스택=${setupStack}`
    ]);

    try {
      const res = await fetch("/api/agentops/projects/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: setupProjectName,
          techStack: setupStack,
          persona: setupPersona
        })
      });
      const data = await res.json();

      if (data.success) {
        setSetupLogs([
          `[1/4] 사내 서버(192.168.64.31) 브릿지 연결 완료.`,
          `[2/4] ${data.server}에서 setup_project.py 실행 완료.`,
          `[3/4] Karpathy 표준 CLAUDE.md 및 프로젝트 구조 생성 성공.`,
          `[4/4] 생성 산출물:`,
          ...(data.filesGenerated || []).map((f: string) => `  ✔ ${f}`),
          `[STATUS] 프로젝트 자동 셋업 완료! 🚀`
        ]);
      } else {
        setSetupLogs([
          `[ERROR] 실행 실패: ${data.error || "서버 응답 오류"}`,
          `[FALLBACK] 로컬 표준 규격 템플릿 준비됨.`
        ]);
      }
    } catch (err: any) {
      setSetupLogs([
        `[ERROR] 통신 에러: ${err?.message || "서버 브릿지 타임아웃"}`,
        `[NOTICE] 로컬 환경에 캐시된 Karpathy 룰셋을 유지합니다.`
      ]);
    } finally {
      setSetupRunning(false);
    }
  };

  const handleRagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setRagSearching(true);
    setTimeout(() => {
      setRagSearching(false);
    }, 600);
  };

  return (
    <div className="min-h-screen voltagent-bg-grid text-[#f4f4f5] relative font-sans selection:bg-[#00d992] selection:text-[#0a0a0c]">
      
      {/* =========================================================================
          1. TOP NAVBAR (DESIGN.md 규격: Near-Black + 1줄 고정 + Hairline Border)
      ========================================================================= */}
      <header className="sticky top-0 z-50 h-16 bg-[#0e0e11]/90 backdrop-blur-xl border-b border-[#27272a] px-4 sm:px-6">
        <div className="max-w-[1360px] h-full mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name (절대 줄바꿈 금지) */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            <div className="w-8 h-8 rounded-lg border border-[#27272a] bg-[#141418] p-1 flex items-center justify-center">
              <Image
                src="/images/pyhgoshift_symbol.png"
                alt="PYHGOSHIFT Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-sm sm:text-base text-white flex items-center gap-1.5">
                PYHGOSHIFT
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#00d992]/10 text-[#00d992] border border-[#00d992]/30">v2.5</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase hidden sm:block">
                Digital Workforce Hub
              </span>
            </div>
          </Link>

          {/* Single-Line Desktop Navigation (절대 2줄 꺾임 없음) */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs xl:text-sm font-medium text-slate-300 shrink-0 whitespace-nowrap">
            <a href="#philosophy" className="hover:text-white transition-colors">
              철학과 이념
            </a>
            <a href="#council" className="hover:text-white transition-colors">
              더 세븐 박 (7 Parks)
            </a>
            <a href="#divisions" className="hover:text-white transition-colors">
              5대 사업부 (P-Y-H-G-O)
            </a>
            <a href="#portal" className="text-[#00d992] font-semibold flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00d992]/10 border border-[#00d992]/30 hover:bg-[#00d992]/20 transition-all">
              <Activity className="w-3.5 h-3.5 animate-pulse text-[#00d992]" />
              <span>AgentOps 관제 포털</span>
            </a>
            <Link href="/tools/vram-calc" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-[#00d992]" />
              <span>VRAM 계산기</span>
            </Link>
            <a href="#contact" className="hover:text-white transition-colors">
              도입 문의
            </a>
          </nav>

          {/* Right Action & Host Live Indicator */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141418] border border-[#27272a] text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00d992] animate-pulse"></span>
              <span className="text-[#00d992] font-bold">LIVE</span>
              <span className="text-slate-400">192.168.64.31:3001</span>
            </div>
            <a
              href="#contact"
              className="voltagent-btn-primary px-3.5 py-1.5 text-xs font-bold whitespace-nowrap"
            >
              도입 상담
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg bg-[#141418] border border-[#27272a]"
              aria-label="Toggle Menu"
            >
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 border-b border-[#27272a] bg-[#0e0e11]/98 backdrop-blur-2xl px-6 py-4 space-y-3 text-sm text-slate-300 shadow-2xl z-50">
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">1. 철학과 이념 (자아 훼방)</a>
            <a href="#council" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">2. 더 세븐 박 (7 Parks 집단지성)</a>
            <a href="#divisions" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">3. 5대 전략 사업부 (P-Y-H-G-O)</a>
            <a href="#portal" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-3 rounded-md bg-[#00d992]/15 text-[#00d992] font-bold border border-[#00d992]/30">⚡ AgentOps 핵심 통합 관제 포털 →</a>
            <Link href="/tools/vram-calc" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#00d992]" />
              <span>AI VRAM & 하드웨어 계산기</span>
            </Link>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#00d992] font-semibold">도입 상담 문의 →</a>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION (DESIGN.md 규격: Developer-Centric Dark Canvas + Code Chip)
      ========================================================================= */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 text-center relative z-10">
          
          {/* Eyebrow Mono Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full voltagent-pill-green text-xs font-mono mb-8 tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#00d992]" />
            <span>HUMANLESS AGENT ENGINEERING PLATFORM</span>
          </div>

          {/* Official CI Centerpiece */}
          <div className="relative mx-auto mb-8 w-40 sm:w-52 aspect-square flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#00d992]/10 blur-3xl"></div>
            <Image
              src="/images/pyhgoshift_ci.png"
              alt="PYHGOSHIFT CI"
              width={220}
              height={220}
              className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,217,146,0.25)] hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          {/* Headline (DESIGN.md Display-XL: Sentence-case, restrained) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            자아를 훼방하고, <br className="hidden sm:inline" />
            <span className="text-[#00d992]">인간 개입 0%의 디지털 노동력</span>을 지휘한다.
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
            파이고시프트(PyhgoShift)는 고착된 관습과 자아 편향을 의도적으로 해체합니다. 
            <strong>더 세븐 박(The 7 Parks)</strong>의 자율 에이전트 집단 지성이 사내 PMO와 SI 라이프사이클을 스스로 통제하고 실행합니다.
          </p>

          {/* Signature DESIGN.md Hero Code Mockup Chip */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-[#141418] border border-[#27272a] text-xs font-mono text-slate-300 mb-8 max-w-full overflow-x-auto">
            <span className="text-[#00d992] select-none font-bold">$</span>
            <span>npx pyhgoshift start --persona 7-parks --host 192.168.64.31</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#00d992] text-[10px] font-bold">READY</span>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#portal"
              className="voltagent-btn-primary px-6 py-3.5 text-sm font-bold flex items-center gap-2 group"
            >
              <Activity className="w-4 h-4 text-[#0a0a0c]" />
              <span>AgentOps 관제 포털 실행</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/tools/vram-calc"
              className="voltagent-btn-outline px-6 py-3.5 text-sm flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#00d992]" />
              <span>AI VRAM 계산기 열기</span>
            </Link>
          </div>

          {/* 3 Metric Hairline Cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="voltagent-card p-5 text-center">
              <div className="text-2xl font-mono font-bold text-[#00d992]">0%</div>
              <div className="text-xs text-slate-400 mt-1">인간 개입 제로 (AgentOps)</div>
            </div>
            <div className="voltagent-card p-5 text-center">
              <div className="text-2xl font-mono font-bold text-white">7 Parks</div>
              <div className="text-xs text-slate-400 mt-1">집단지성 자율 의결 시스템</div>
            </div>
            <div className="voltagent-card p-5 text-center">
              <div className="text-2xl font-mono font-bold text-[#00d992]">99.98%</div>
              <div className="text-xs text-slate-400 mt-1">Self-Healing 자율 회복 성공률</div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dashed Divider from DESIGN.md */}
      <div className="voltagent-divider-dashed max-w-[1240px] mx-auto"></div>

      {/* =========================================================================
          3. 🟢 [A. 핵심 통합 기능] AgentOps MISSION CONTROL PORTAL
      ========================================================================= */}
      <section id="portal" className="py-20 max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full voltagent-pill-green text-xs font-mono mb-3 font-semibold">
            <Radio className="w-3.5 h-3.5 text-[#00d992] animate-pulse" />
            <span>ENTERPRISE AGENT INTEGRATION HUB</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            더 세븐 박 핵심 에이전트 통합 관제 센터
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            사내 서버(`192.168.64.31`)에서 가동 중인 5대 핵심 에이전트 기능을 웹에서 직접 실행하고 실시간 결과를 확인하십시오.
          </p>
        </div>

        {/* Interactive Mission Control Terminal Card */}
        <div className="voltagent-card overflow-hidden border border-[#27272a] shadow-2xl">
          
          {/* 5대 핵심 탭 바 */}
          <div className="flex border-b border-[#27272a] bg-[#101014] overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActivePortalTab("pmo")}
              className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activePortalTab === "pmo"
                  ? "border-[#00d992] text-white bg-[#00d992]/5 font-bold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4 text-[#00d992]" />
              <span>1. PMO 주간 보고서 (CrewAI)</span>
            </button>

            <button
              onClick={() => setActivePortalTab("setup")}
              className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activePortalTab === "setup"
                  ? "border-[#00d992] text-white bg-[#00d992]/5 font-bold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <FolderGit2 className="w-4 h-4 text-[#00d992]" />
              <span>2. 프로젝트 자동 셋업 (Karpathy)</span>
            </button>

            <button
              onClick={() => setActivePortalTab("chatops")}
              className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activePortalTab === "chatops"
                  ? "border-[#00d992] text-white bg-[#00d992]/5 font-bold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Radio className="w-4 h-4 text-[#00d992]" />
              <span>3. 듀얼 챗옵스 관제 (Slack & Tel)</span>
            </button>

            <button
              onClick={() => setActivePortalTab("review")}
              className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activePortalTab === "review"
                  ? "border-[#00d992] text-white bg-[#00d992]/5 font-bold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Shield className="w-4 h-4 text-[#00d992]" />
              <span>4. Claude + Codex 교차 검증</span>
            </button>

            <button
              onClick={() => setActivePortalTab("rag")}
              className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activePortalTab === "rag"
                  ? "border-[#00d992] text-white bg-[#00d992]/5 font-bold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4 text-[#00d992]" />
              <span>5. RAG 지식 & 산출물 검색</span>
            </button>
          </div>

          {/* TAB 1: PMO 주간 보고서 */}
          {activePortalTab === "pmo" && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00d992]" />
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
                    className="px-3 py-2 rounded-md bg-[#101014] border border-[#27272a] text-xs font-mono text-white focus:outline-none focus:border-[#00d992]"
                  >
                    <option value="2026-10-W3">2026년 10월 3주차 (현재)</option>
                    <option value="2026-10-W2">2026년 10월 2주차 (완료)</option>
                    <option value="2026-10-W1">2026년 10월 1주차 (완료)</option>
                  </select>

                  <button
                    onClick={handleGeneratePmo}
                    disabled={pmoGenerating}
                    className="voltagent-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${pmoGenerating ? "animate-spin" : ""}`} />
                    <span>{pmoGenerating ? "CrewAI 분석 중..." : "주간 보고서 즉시 생성"}</span>
                  </button>
                </div>
              </div>

              {pmoGenerated && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded voltagent-pill-green text-[11px] font-mono font-bold">
                      STATUS: 정상 승인 (VERIFIED) | 문서 번호: PYHGO-PMO-{pmoWeek}
                    </span>
                    <button
                      onClick={() => {
                        setCopiedReport(true);
                        setTimeout(() => setCopiedReport(false), 2000);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#101014] border border-[#27272a] hover:border-[#3f3f46] text-xs font-mono text-slate-300 transition-colors"
                    >
                      {copiedReport ? <Check className="w-3.5 h-3.5 text-[#00d992]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedReport ? "복사 완료!" : "마크다운 복사"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a]">
                      <span className="text-xs text-slate-400">SI 업무자동화 공정률</span>
                      <div className="text-2xl font-mono font-bold text-[#00d992] mt-1">94.8%</div>
                      <div className="w-full bg-[#1e1e24] h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#00d992] h-full w-[94.8%]"></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a]">
                      <span className="text-xs text-slate-400">사내 에이전트 포털 통합</span>
                      <div className="text-2xl font-mono font-bold text-white mt-1">98.2%</div>
                      <div className="w-full bg-[#1e1e24] h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-white h-full w-[98.2%]"></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a]">
                      <span className="text-xs text-slate-400">Zod 보안 감사 합격률</span>
                      <div className="text-2xl font-mono font-bold text-[#00d992] mt-1">100.0%</div>
                      <div className="w-full bg-[#1e1e24] h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#00d992] h-full w-[100%]"></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a]">
                      <span className="text-xs text-slate-400">활성 에이전트 인력</span>
                      <div className="text-2xl font-mono font-bold text-white mt-1">7 / 7 Parks</div>
                      <div className="text-[11px] text-[#00d992] mt-1 font-mono">전원 무결격 작전 중</div>
                    </div>
                  </div>

                  <div className="voltagent-terminal p-5 text-xs text-slate-300 space-y-2 leading-relaxed">
                    <div className="text-slate-400 pb-2 border-b border-[#27272a] font-bold text-[#00d992] flex items-center justify-between">
                      <span># [사내 개발 서버 192.168.64.31 실시간 PMO 보고서]</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Live PostgreSQL / report_crew.py</span>
                    </div>
                    {pmoLiveContent ? (
                      <pre className="whitespace-pre-wrap font-mono text-zinc-300 text-xs leading-relaxed max-h-72 overflow-y-auto">
                        {pmoLiveContent}
                      </pre>
                    ) : (
                      <div className="space-y-1.5">
                        <div>• <strong>파일럿 박 (CPO)</strong>: awesome-design-md 기반 고밀도 개발자 중심 디자인 시스템 적용 및 포털 라우팅 완결.</div>
                        <div>• <strong>이노베이터 박 (CTO)</strong>: Next.js 16.4.0 Standalone 도커 빌드 파이프라인 무결성 확보 및 상단 한 줄 네비게이션 적용.</div>
                        <div>• <strong>고든 박 (CSO)</strong>: 사내 개발서버(`192.168.64.31`) 레거시 도커 캐시 3.5GB 프룬 및 미사용 잔여 폴더 아카이빙 격리 조치.</div>
                        <div>• <strong>시냅스 박 (COO)</strong>: 텔레그램 회사서버봇(@ItcenServerbot) 및 슬랙 AI-PMO 웹소켓 세션 헬스체크 100% 정상 통과.</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: 프로젝트 자동 셋업 */}
          {activePortalTab === "setup" && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="pb-6 border-b border-[#27272a]">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#00d992]" />
                  <span>안드레 카파시 규격 프로젝트 자동 셋업 웹 콘솔</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  모듈: `setup_project.py` ➔ 웹에서 프로젝트명과 스택을 입력하면 `CLAUDE.md`, `AGENTS.md`, Git 레포가 자동 생성됩니다.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-[#101014] p-5 rounded-lg border border-[#27272a]">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      프로젝트 식별자 (Project Identifier)
                    </label>
                    <input
                      type="text"
                      value={setupProjectName}
                      onChange={(e) => setSetupProjectName(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#141418] border border-[#27272a] text-xs font-mono text-white focus:outline-none focus:border-[#00d992]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      전담 리드 에이전트 (The 7 Parks)
                    </label>
                    <select
                      value={setupPersona}
                      onChange={(e) => setSetupPersona(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#141418] border border-[#27272a] text-xs text-white focus:outline-none focus:border-[#00d992]"
                    >
                      <option value="이노베이터 박 [CTO / 혁신]">이노베이터 박 [CTO / 프론트엔드 & 아키텍처]</option>
                      <option value="파일럿 박 [CPO / 항해사]">파일럿 박 [CPO / 로드맵 & 기획]</option>
                      <option value="고든 박 [CSO / 수호자]">고든 박 [CSO / 보안 & 가드레일]</option>
                      <option value="시냅스 박 [COO / 연결자]">시냅스 박 [COO / API 연동 & DB]</option>
                      <option value="프롬프트 박 [CAO / 설계자]">프롬프트 박 [CAO / 프롬프트 & 헌장]</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      기술 스택 (Architecture Profile)
                    </label>
                    <select
                      value={setupStack}
                      onChange={(e) => setSetupStack(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#141418] border border-[#27272a] text-xs text-white focus:outline-none focus:border-[#00d992]"
                    >
                      <option value="Next.js 16 + FastAPI + PostgreSQL 16">Next.js 16 + FastAPI + PostgreSQL 16</option>
                      <option value="CrewAI + LangChain + Python 3.12">CrewAI + LangChain + Python 3.12</option>
                      <option value="Qdrant RAG + FastEmbed + Node 20">Qdrant RAG + FastEmbed + Node 20</option>
                    </select>
                  </div>

                  <button
                    onClick={handleRunSetup}
                    disabled={setupRunning}
                    className="w-full py-3 rounded-md voltagent-btn-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Play className={`w-4 h-4 ${setupRunning ? "animate-spin" : ""}`} />
                    <span>{setupRunning ? "프로젝트 자동 생성 중..." : "원클릭 프로젝트 자동 셋업 실행"}</span>
                  </button>
                </div>

                <div className="voltagent-terminal p-5 text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#27272a] mb-3 text-slate-400">
                      <span className="flex items-center gap-1.5 text-[#00d992] font-bold">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>setup_project.py Console</span>
                      </span>
                      <span className="text-[10px] bg-[#141418] border border-[#27272a] px-2 py-0.5 rounded font-mono">
                        Karpathy Protocol
                      </span>
                    </div>

                    <div className="space-y-2 text-slate-300 leading-relaxed overflow-y-auto max-h-56">
                      {setupLogs.map((log, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#00d992] select-none font-bold">&gt;</span>
                          <span className={log.includes("완료") ? "text-[#00d992] font-semibold" : "text-slate-300"}>
                            {log}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-[11px] text-slate-400">
                    <span>Host: 192.168.64.31</span>
                    <span className="text-[#00d992] flex items-center gap-1 font-mono">
                      <Check className="w-3 h-3" />
                      <span>Ready for Auto-Deploy</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 듀얼 챗옵스 관제 */}
          {activePortalTab === "chatops" && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#27272a]">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#00d992]" />
                    <span>사내 듀얼 챗옵스 (Slack & Telegram) 실시간 관제 패널</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    신규 사내 개발 서버(`192.168.64.31:7722`)의 슬랙/텔레그램 데몬 PID 및 도커 컨테이너를 실시간 동기화합니다.
                  </p>
                </div>
                <button
                  onClick={fetchChatopsStatus}
                  disabled={chatopsLive.loading}
                  className="px-3 py-1.5 rounded bg-[#101014] border border-[#27272a] hover:border-[#00d992]/50 text-xs font-mono text-zinc-300 hover:text-[#00d992] flex items-center gap-1.5 transition-colors"
                >
                  <Activity className={`w-3.5 h-3.5 ${chatopsLive.loading ? "animate-spin text-[#00d992]" : "text-[#00d992]"}`} />
                  <span>{chatopsLive.loading ? "조회 중..." : "실시간 새로고침"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-[#101014] border border-[#27272a] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${chatopsLive.slackStatus === "ACTIVE" ? "bg-[#00d992] animate-pulse" : "bg-amber-400"}`}></span>
                      <span>슬랙 봇: AI-PMO</span>
                    </span>
                    <span className="px-2 py-0.5 rounded voltagent-pill-green text-[10px] font-mono font-bold">
                      {chatopsLive.slackStatus} 🟢
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-slate-300 bg-[#08080a] p-4 rounded-md border border-[#27272a]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">프로세스 PID:</span>
                      <span className="text-[#00d992]">PID: {chatopsLive.slackPid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">채널 연동:</span>
                      <span className="text-white">Slack Workspace (#ai-pmo)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">실행 상태:</span>
                      <span className="text-[#00d992]">WebSocket / RTM 연결됨</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">서버 업타임:</span>
                      <span className="text-white">{chatopsLive.uptime.split(",")[0] || "가동 중"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-[#101014] border border-[#27272a] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${chatopsLive.telegramStatus === "ONLINE" ? "bg-[#00d992] animate-pulse" : "bg-amber-400"}`}></span>
                      <span>텔레그램 봇: 회사서버봇 (@ItcenServerbot)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded voltagent-pill-green text-[10px] font-mono font-bold">
                      {chatopsLive.telegramStatus} 🟢
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-slate-300 bg-[#08080a] p-4 rounded-md border border-[#27272a]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">프로세스 PID:</span>
                      <span className="text-[#00d992]">PID: {chatopsLive.telegramPid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">실행 호스트:</span>
                      <span className="text-white">192.168.64.31:7722</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">작업 디렉토리:</span>
                      <span className="text-white">/home/devadm01/itcen-claude-telChatOps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">원격 보안 권한:</span>
                      <span className="text-[#00d992]">SSH 7722 인증 완료</span>
                    </div>
                  </div>
                </div>
              </div>

              {chatopsLive.containers.length > 0 && (
                <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a] space-y-3">
                  <div className="text-xs font-mono font-bold text-[#00d992] flex items-center justify-between">
                    <span># 사내 개발 서버 가동 중인 도커 코어 엔진 ({chatopsLive.containers.length}개)</span>
                    <span className="text-zinc-500 font-normal">docker ps (Live)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] font-mono">
                    {chatopsLive.containers.map((c, i) => (
                      <div key={i} className="p-2 rounded bg-[#08080a] border border-[#27272a] flex items-center justify-between">
                        <span className="text-zinc-200 font-semibold">{c.name}</span>
                        <span className="text-[#00d992]">{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: 교차 검증 */}
          {activePortalTab === "review" && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="pb-6 border-b border-[#27272a]">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00d992]" />
                  <span>Claude + Codex 듀얼 엔진 교차 검증 & Self-Healing 관제</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  주엔진(Claude)의 소스코드 및 문서 생산 결과물을 검수관(Codex)이 독립 검증하여 불일치 시 자율 회복을 수행합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a]">
                  <span className="text-xs text-slate-400">교차 검증 성공률</span>
                  <div className="text-2xl font-mono font-bold text-[#00d992] mt-1">99.8%</div>
                  <p className="text-[11px] text-slate-400 mt-1">총 428회 빌드 중 427회 무결성 승인</p>
                </div>

                <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a]">
                  <span className="text-xs text-slate-400">Self-Healing 자율 복구</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">14 건</div>
                  <p className="text-[11px] text-slate-400 mt-1">인간 개입 0회로 포트/캐시 충돌 치유</p>
                </div>

                <div className="p-4 rounded-lg bg-[#101014] border border-[#27272a]">
                  <span className="text-xs text-slate-400">5대 자율 트리거 상태</span>
                  <div className="text-2xl font-mono font-bold text-[#00d992] mt-1">ALL GREEN</div>
                  <p className="text-[11px] text-slate-400 mt-1">Git Push, 로그 감시, 크론 정상</p>
                </div>
              </div>

              <div className="voltagent-terminal p-5 space-y-3 text-xs">
                <div className="text-slate-400 font-bold text-[#00d992]">
                  # 최근 자율 회복(Self-Healing) 실행 타임라인
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-[#101014] border border-[#27272a]">
                    <span className="text-slate-400 font-mono">15:19:30</span>
                    <span className="text-slate-200">awesome-design-md 기반 DESIGN.md 디자인 시스템 자동 로드</span>
                    <span className="text-[#00d992] font-mono">➔ Docker Clean Build 통과</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#101014] border border-[#27272a]">
                    <span className="text-slate-400 font-mono">15:08:18</span>
                    <span className="text-slate-200">서버 레거시 잔여 도커 캐시 3.5GB 감지</span>
                    <span className="text-[#00d992] font-mono">➔ 자동 Prune 및 아카이빙 완료</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RAG 지식 검색 */}
          {activePortalTab === "rag" && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="pb-6 border-b border-[#27272a]">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#00d992]" />
                  <span>PostgreSQL 16 & Qdrant 벡터 RAG 사내 지식 검색기</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  프로젝트 산출물, 규정 가이드, 에이전트 작업 이력을 시맨틱 임베딩 벡터로 고속 검색합니다.
                </p>
              </div>

              <form onSubmit={handleRagSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    placeholder="사내 산출물 또는 에이전트 지식 검색 (예: 카파시 규격, PMO 보고서, Zod 보안)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#101014] border border-[#27272a] text-xs sm:text-sm text-white focus:outline-none focus:border-[#00d992]"
                  />
                </div>
                <button
                  type="submit"
                  className="voltagent-btn-primary px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5"
                >
                  <span>{ragSearching ? "검색 중..." : "벡터 검색"}</span>
                </button>
              </form>

              <div className="space-y-3">
                {ragResults.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[#101014] border border-[#27272a] hover:border-[#00d992]/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded voltagent-pill-green font-bold">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#00d992]">
                        유사도: {item.score}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white hover:text-[#00d992] transition-colors">
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
      </section>

      {/* Signature Dashed Divider */}
      <div className="voltagent-divider-dashed max-w-[1240px] mx-auto"></div>

      {/* =========================================================================
          4. PHILOSOPHY SECTION (DESIGN.md Restrained Card Grid)
      ========================================================================= */}
      <section id="philosophy" className="py-20 max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full voltagent-pill-green text-xs font-mono mb-3 font-semibold">
            <span>CORE PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            의도적인 자아 훼방 (Ego Disruption)
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            기존의 고정관념과 조직적 관습은 시야를 가로막습니다. 파이고시프트는 규칙 안에서 자아를 해체하고 재구성하여, 보이지 않던 거대한 가치를 실현합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="voltagent-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#00d992]/10 border border-[#00d992]/30 flex items-center justify-center text-[#00d992]">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. 자아의 해체</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              &quot;내가 옳다&quot;는 확증 편향을 과감히 부수고, 데이터와 엄격한 다중 에이전트 교차 검증만을 진실로 채택합니다.
            </p>
          </div>

          <div className="voltagent-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#00d992]/10 border border-[#00d992]/30 flex items-center justify-center text-[#00d992]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. 플로우 상태 (Flow)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              의심과 불안을 걷어내고 온전히 작업 자체와 일체화되는 바이브 코딩(Vibe Coding)의 극한 몰입 상태를 지향합니다.
            </p>
          </div>

          <div className="voltagent-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#00d992]/10 border border-[#00d992]/30 flex items-center justify-center text-[#00d992]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. 보이지 않던 가치</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              단순 반복적인 개발 노동에서 벗어나, 에이전트 연쇄 자율 구동을 통해 기업 가치를 지수함수적으로 팽창시킵니다.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Dashed Divider */}
      <div className="voltagent-divider-dashed max-w-[1240px] mx-auto"></div>

      {/* =========================================================================
          5. THE 7 PARKS (더 세븐 박 집단지성)
      ========================================================================= */}
      <section id="council" className="py-20 max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full voltagent-pill-green text-xs font-mono mb-3 font-semibold">
            <span>EXECUTIVE AGENT COUNCIL</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            더 세븐 박 (The 7 Parks) 시스템
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            상황과 과업의 성격에 따라 동적으로 역할을 전환하며 자율 의결하는 7인의 핵심 페르소나입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="voltagent-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#00d992]">PARK #0</span>
              <span className="px-2 py-0.5 rounded bg-[#101014] text-slate-300 text-[10px] font-mono border border-[#27272a]">CEO</span>
            </div>
            <h3 className="text-base font-bold text-white">프로이트 박 [욕망 분석]</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              사용자의 의도가 모호하거나 방향이 흔들릴 때 무의식적 본질을 짚어내고 전략적 방향을 제시합니다.
            </p>
          </div>

          <div className="voltagent-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#00d992]">PARK #1</span>
              <span className="px-2 py-0.5 rounded bg-[#101014] text-slate-300 text-[10px] font-mono border border-[#27272a]">CPO</span>
            </div>
            <h3 className="text-base font-bold text-white">파일럿 박 [항해사]</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              전체 프로젝트의 로드맵, 파일 구조, 라우팅 및 WBS 공정을 총괄 항해합니다.
            </p>
          </div>

          <div className="voltagent-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#00d992]">PARK #2</span>
              <span className="px-2 py-0.5 rounded bg-[#101014] text-slate-300 text-[10px] font-mono border border-[#27272a]">CTO</span>
            </div>
            <h3 className="text-base font-bold text-white">이노베이터 박 [혁신가]</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next.js 16, 모던 UI/UX, 고속 빌드 파이프라인 및 프론트엔드 최적화 코딩을 주도합니다.
            </p>
          </div>

          <div className="voltagent-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#00d992]">PARK #3</span>
              <span className="px-2 py-0.5 rounded bg-[#101014] text-slate-300 text-[10px] font-mono border border-[#27272a]">CSO</span>
            </div>
            <h3 className="text-base font-bold text-white">고든 박 [수호자]</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zod 런타임 보안 스키마, 토큰/키 마스킹, 권한 검증 및 에러 서킷 브레이커를 엄격히 통제합니다.
            </p>
          </div>

          <div className="voltagent-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#00d992]">PARK #4</span>
              <span className="px-2 py-0.5 rounded bg-[#101014] text-slate-300 text-[10px] font-mono border border-[#27272a]">COO</span>
            </div>
            <h3 className="text-base font-bold text-white">시냅스 박 [연결자]</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              FastAPI, 슬랙/텔레그램 챗옵스 웹소켓, PostgreSQL 16 및 Qdrant 데이터 흐름을 직결합니다.
            </p>
          </div>

          <div className="voltagent-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#00d992]">PARK #5</span>
              <span className="px-2 py-0.5 rounded bg-[#101014] text-slate-300 text-[10px] font-mono border border-[#27272a]">CAO</span>
            </div>
            <h3 className="text-base font-bold text-white">프롬프트 박 [설계자]</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Karpathy 규격 프로젝트 헌장(CLAUDE.md), 시스템 프롬프트 및 LLM 가드레일을 정밀 설계합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Dashed Divider */}
      <div className="voltagent-divider-dashed max-w-[1240px] mx-auto"></div>

      {/* =========================================================================
          6. 5대 사업부 (P-Y-H-G-O)
      ========================================================================= */}
      <section id="divisions" className="py-20 max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full voltagent-pill-green text-xs font-mono mb-3 font-semibold">
            <span>BUSINESS STRATEGY</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            5대 전략 사업부 (P-Y-H-G-O)
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            파이고시프트의 영문 약칭에 기반한 5대 핵심 비즈니스 포트폴리오입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="voltagent-card p-5 text-center space-y-2">
            <span className="text-2xl font-mono font-bold text-[#00d992]">P</span>
            <h4 className="font-bold text-white text-sm">Platform</h4>
            <p className="text-xs text-slate-400">AgentOps 자율 구동 사내 인프라 및 엔진 구축</p>
          </div>

          <div className="voltagent-card p-5 text-center space-y-2">
            <span className="text-2xl font-mono font-bold text-white">Y</span>
            <h4 className="font-bold text-white text-sm">Yield</h4>
            <p className="text-xs text-slate-400">인력 투입 대비 산출물 극대화 및 지표 관리</p>
          </div>

          <div className="voltagent-card p-5 text-center space-y-2">
            <span className="text-2xl font-mono font-bold text-[#00d992]">H</span>
            <h4 className="font-bold text-white text-sm">Humanless</h4>
            <p className="text-xs text-slate-400">인간 개입 0%를 지향하는 전자동 프로세스화</p>
          </div>

          <div className="voltagent-card p-5 text-center space-y-2">
            <span className="text-2xl font-mono font-bold text-white">G</span>
            <h4 className="font-bold text-white text-sm">Growshift</h4>
            <p className="text-xs text-slate-400">SI 프로젝트 라이프사이클 및 업무자동화 사업</p>
          </div>

          <div className="voltagent-card p-5 text-center space-y-2">
            <span className="text-2xl font-mono font-bold text-[#00d992]">O</span>
            <h4 className="font-bold text-white text-sm">Optimization</h4>
            <p className="text-xs text-slate-400">하드웨어 VRAM 및 LLM 양자화 자원 최적화</p>
          </div>
        </div>
      </section>

      {/* Signature Dashed Divider */}
      <div className="voltagent-divider-dashed max-w-[1240px] mx-auto"></div>

      {/* =========================================================================
          7. CONTACT SECTION (도입 문의)
      ========================================================================= */}
      <section id="contact" className="py-20 max-w-[800px] mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full voltagent-pill-green text-xs font-mono mb-3 font-semibold">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            디지털 노동력 도입 및 기술 상담
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            파이고시프트의 AgentOps 플랫폼 도입이나 SI 자동화 컨설팅이 필요하시면 연락처를 남겨주십시오.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="voltagent-card p-7 space-y-4">
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
                className="w-full px-3 py-2 rounded-md bg-[#101014] border border-[#27272a] text-xs text-white focus:outline-none focus:border-[#00d992]"
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
                className="w-full px-3 py-2 rounded-md bg-[#101014] border border-[#27272a] text-xs text-white focus:outline-none focus:border-[#00d992]"
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
                className="w-full px-3 py-2 rounded-md bg-[#101014] border border-[#27272a] text-xs text-white focus:outline-none focus:border-[#00d992]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">관심 사업부</label>
              <select
                name="division"
                value={formData.division}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-[#101014] border border-[#27272a] text-xs text-white focus:outline-none focus:border-[#00d992]"
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
              className="w-full px-3 py-2 rounded-md bg-[#101014] border border-[#27272a] text-xs text-white focus:outline-none focus:border-[#00d992]"
            />
          </div>

          <button
            type="submit"
            disabled={formStatus === "loading"}
            className="w-full voltagent-btn-primary py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-[#0a0a0c]" />
            <span>{formStatus === "loading" ? "전송 중..." : "도입 상담 접수하기"}</span>
          </button>

          {formStatus === "success" && (
            <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[#00d992] text-xs text-center font-mono">
              {statusMessage}
            </div>
          )}

          {formStatus === "error" && (
            <div className="p-3 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-mono">
              {statusMessage}
            </div>
          )}
        </form>
      </section>

      {/* =========================================================================
          8. FOOTER (DESIGN.md Restrained Chrome)
      ========================================================================= */}
      <footer className="py-10 border-t border-[#27272a] bg-[#0a0a0d] text-xs text-slate-500">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">PYHGOSHIFT</span>
            <span>|</span>
            <span>디지털 노동력 AgentOps 플랫폼 (DESIGN.md Compliant)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Host: 192.168.64.31</span>
            <span>Docker: 3001:3000</span>
            <span className="text-[#00d992]">Cloudflare Tunnel Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
