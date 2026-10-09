import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PYHGOSHIFT (파이고시프트) | Autonomous AgentOps Platform",
  description: "박용희 두뇌의 외부 확장 시스템이자 인간의 개입을 0으로 만드는 AgentOps 플랫폼. 자아 훼방(Ego Disruption) 철학으로 숨은 가치를 발굴하고 극대화합니다.",
  keywords: [
    "PYHGOSHIFT",
    "파이고시프트",
    "AgentOps",
    "AI 에이전트",
    "자아훼방",
    "Ego Disruption",
    "더 세븐 박",
    "Growshift",
    "디지털 노동력",
    "SI 자동화",
    "박용희"
  ],
  authors: [{ name: "PYHGOSHIFT / 박용희" }],
  openGraph: {
    title: "PYHGOSHIFT | 자아 훼방과 AgentOps 디지털 노동력",
    description: "규칙 안에서 자아를 훼방시켜 보이지 않던 가치를 발굴·극대화하는 자율 에이전트 기업 파이고시프트 공식 대표 웹사이트",
    url: "https://www.pyhgoshift.com",
    siteName: "PYHGOSHIFT",
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body className="antialiased bg-[#05070f] text-slate-100 selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
