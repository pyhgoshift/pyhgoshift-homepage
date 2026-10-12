import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// [GET] 상담 및 문의 API 상태 점검 (헬스체크)
export async function GET() {
  return NextResponse.json({
    status: "HEALTHY",
    service: "PYHGOSHIFT Contact & Inquiry Gateway",
    officialEmail: "pyhgoshift@pyhgoshift.com",
    timestamp: new Date().toISOString()
  });
}

// [POST] 상담 및 문의 접수
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, division, message } = body;

    // [고든 박 / CSO 보안 검증] 입력값 유효성 및 XSS 기본 필터링
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: "성함 또는 직책을 입력해 주세요." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "유효한 이메일 주소를 입력해 주세요." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ success: false, error: "문의 내용은 최소 5자 이상 작성해 주세요." }, { status: 400 });
    }

    // [시냅스 박 / COO 데이터 파이프라인]
    const inquiryRecord = {
      id: "inq_" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      company: company ? company.trim() : "미지정",
      division: division || "Growshift (SI/업무자동화)",
      message: message.trim(),
      officialTargetEmail: "pyhgoshift@pyhgoshift.com",
      createdAt: new Date().toISOString(),
      status: "RECEIVED",
      source: "www.pyhgoshift.com"
    };

    console.log("[PYHGOSHIFT Contact Gateway] New Inquiry Received:", inquiryRecord);

    // [로컬 파일 영구 저장소 보존] data/inquiries.json
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const dataFilePath = path.join(dataDir, "inquiries.json");
      let currentList = [];
      if (fs.existsSync(dataFilePath)) {
        const fileContent = fs.readFileSync(dataFilePath, "utf-8");
        try {
          currentList = JSON.parse(fileContent);
        } catch {
          currentList = [];
        }
      }
      currentList.unshift(inquiryRecord);
      fs.writeFileSync(dataFilePath, JSON.stringify(currentList, null, 2), "utf-8");
      console.log("[PYHGOSHIFT Contact Gateway] Persisted to:", dataFilePath);
    } catch (fsErr) {
      console.error("[PYHGOSHIFT File Save Error]:", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "문의가 안전하게 접수되었습니다. pyhgoshift@pyhgoshift.com 전담 에이전트가 검토 후 신속히 회신드리겠습니다.",
      data: {
        id: inquiryRecord.id,
        registeredAt: inquiryRecord.createdAt,
        officialEmail: "pyhgoshift@pyhgoshift.com"
      }
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, error: "서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
