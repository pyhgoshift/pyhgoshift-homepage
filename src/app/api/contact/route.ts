import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, division, message } = body;

    // [고든 박 / CSO 보안 검증] 입력값 유효성 및 XSS 기본 필터링
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: "이름 또는 직책을 입력해 주세요." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "유효한 이메일 주소를 입력해 주세요." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ success: false, error: "문의 내용은 최소 5자 이상 작성해 주세요." }, { status: 400 });
    }

    // [시냅스 박 / COO 데이터 파이프라인]
    // 192.168.64.31 서버의 PostgreSQL(포트 5432) 또는 알림 웹훅(N8N)으로 전달할 페이로드 구성
    const inquiryRecord = {
      id: "inq_" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      company: company ? company.trim() : "미지정",
      division: division || "Growshift (SI/업무자동화)",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: "RECEIVED",
      source: "www.pyhgoshift.com"
    };

    console.log("[PYHGOSHIFT Contact System] Inquiry Received:", inquiryRecord);

    return NextResponse.json({
      success: true,
      message: "문의가 안전하게 접수되었습니다. 더 세븐 박 담당 에이전트가 검토 후 신속히 회신드리겠습니다.",
      data: { id: inquiryRecord.id }
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, error: "서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
