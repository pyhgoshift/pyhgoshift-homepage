# 🏢 PYHGOSHIFT (파이고시프트) 공식 대표 웹사이트

> **"자아를 훼방시켜, 규칙 안 숨겨진 가치를 발굴·극대화한다."**  
> 공식 도메인: [www.pyhgoshift.com](https://www.pyhgoshift.com)  
> 사내 서비스 서버: `http://192.168.64.31:80` (Nginx Gateway 연동)

---

## 🌌 1. 회사 정체성 및 철학

- **회사명:** PYHGOSHIFT (파이고시프트)
- **창업자:** 박용희 (Park Yong-Hee)
- **어원:** PYH(박용희) + Ego(자아) + Shift(훼방)
- **핵심 철학:** **자아 훼방 (Ego Disruption)**
  - 규칙과 규정의 틀 안에서, 고정관념(자아)을 일시적으로 흔들어 숨겨진 가치를 발굴·극대화.
  - *자아 해방(X), 자아 초월(X) 지양*
- **본질:** 박용희 두뇌의 외부 확장 시스템이자, 인간의 개입을 0으로 만드는 **AgentOps 플랫폼 & 디지털 노동력(Digital Workforce)**.
- **북극성 (North Star):** *"내가 죽어도 PYHGOSHIFT KB는 계속 자라야 한다"* (Karpathy 5계층 지식 분류 체계).

---

## 👥 2. 더 세븐 박 (The 7 Parks) 임원진 체계

| 아바타 | 직책 | 핵심 역할 | 전담 LLM |
|---|---|---|---|
| **프로이트 박** | Chairman / CEO | 욕망 분석 & 방향 제시 | Codex Sonnet |
| **파일럿 박** | CPO / 항해사 | 폴더 구조 & 기획, 라우팅 설계 | Nemotron Ultra 253B |
| **이노베이터 박** | CTO / 혁신가 | Next.js 코딩, UI/UX, 성능 최적화 | Kimi K2 / Sonnet |
| **고든 박** | CSO / 수호자 | 보안 검증, Zod, 미들웨어, 무결성 | Llama 3.3 70B |
| **시냅스 박** | COO / 연결자 | API 신경망, PostgreSQL, N8N 연동 | Mixtral 8x22B |
| **프롬프트 박** | CAO / 설계자 | AI 로직 설계, 프롬프트 오케스트레이션 | Nemotron 70B |

---

## 🌐 3. 5대 전략 사업부 (P-Y-H-G-O)

1. **[P] Plannershift**: AI 기반 스마트 여행 & 라이프 플래닝
2. **[Y] Yieldshift**: 주식·투자 퀀트 자동매매 알고리즘
3. **[H] Healshift**: 헬스케어 및 생체 지능 데이터 분석
4. **[G] Growshift ⭐**: **핵심 주력 사업부** — 대규모 공공/기업 엔터프라이즈 SI 사업관리, PMO 자동화, STT 회의록 요약, 경기교육청 등 프로젝트
5. **[O] Outreachshift**: AI 자율 마케팅 및 지식 외부 선순환

---

## 🛠️ 4. 기술 스택 및 인프라

- **프론트엔드**: Next.js 16 (App Router) + Tailwind CSS + Lucide Icons (반응형 다크 모드)
- **백엔드/API**: Next.js API Routes (`/api/contact` 입력값 보안 검증 및 접수)
- **데이터베이스**: PostgreSQL 16 (`agentops-postgres` 포트 5432 연동)
- **웹 서버**: Nginx (`agentops-gateway` 포트 80 리버스 프록시)
- **외부 보안 터널**: Cloudflare Tunnel (`agentops-tunnel` -> `www.pyhgoshift.com`)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🚀 5. 로컬 실행 및 배포 방법

### 1) 로컬 개발 서버 실행
```bash
npm install
npm run dev
# 접속: http://localhost:3000
```

### 2) 프로덕션 빌드
```bash
npm run build
npm start
```

### 3) Docker 및 사내 서버(192.168.64.31) 배포
```bash
docker compose up -d --build
```
Nginx 게이트웨이에 `nginx/pyhgoshift.conf`를 적용하여 포트 80으로 즉시 사내/사외 정식 서빙 개시!
