import { NextResponse } from "next/server";
import { executeServerCommand } from "@/lib/server-bridge";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const reportType = body.reportType || "weekly"; // weekly or monthly

    // 사내 서버의 실제 Python 가상환경 및 report_crew.py 실행
    const cmd = `
      cd /home/devadm01/pyhgoshift && \
      /home/devadm01/pyhgoshift/.venv/bin/python report_crew.py --type ${reportType} || \
      /home/devadm01/pyhgoshift/.venv/bin/python -c "
from report_crew import generate_report
print(generate_report('${reportType}'))
"
    `;

    const res = await executeServerCommand(cmd, 60000);

    return NextResponse.json({
      success: true,
      reportType,
      generatedAt: new Date().toISOString(),
      executionOutput: res.stdout.trim() || res.stderr.trim(),
      status: "COMPLETED",
      server: "192.168.64.31:7722",
    });
  } catch (error: any) {
    // 만약 실행 시 오류가 발생하더라도 상세 에러와 fallback 리포트를 전달
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "PMO 보고서 실행 에러",
        status: "FALLBACK_GENERATED",
      },
      { status: 500 }
    );
  }
}
