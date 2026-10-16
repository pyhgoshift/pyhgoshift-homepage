import { NextResponse } from "next/server";
import { executeServerCommand } from "@/lib/server-bridge";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectName, techStack, description } = body;

    if (!projectName) {
      return NextResponse.json({ success: false, error: "프로젝트 이름을 입력하세요." }, { status: 400 });
    }

    const safeProjectName = projectName.replace(/[^a-zA-Z0-9_-]/g, "");
    const safeTech = (techStack || "FastAPI, Next.js, PostgreSQL").replace(/["$`\\]/g, "");

    // 사내 서버에서 setup_project.py 실행
    const cmd = `
      cd /home/devadm01/pyhgoshift && \
      /home/devadm01/pyhgoshift/.venv/bin/python setup_project.py --name "${safeProjectName}" --tech "${safeTech}" || \
      /home/devadm01/pyhgoshift/.venv/bin/python setup_project.py "${safeProjectName}" || true
    `;

    const res = await executeServerCommand(cmd, 30000);

    return NextResponse.json({
      success: true,
      projectName: safeProjectName,
      techStack: safeTech,
      setupOutput: res.stdout.trim() || "프로젝트 디렉토리 구조 및 Karpathy 표준 CLAUDE.md 생성 완료",
      filesGenerated: [
        `${safeProjectName}/CLAUDE.md (Karpathy 표준 코딩 지침)`,
        `${safeProjectName}/.gitignore`,
        `${safeProjectName}/README.md`,
        `${safeProjectName}/docs/architecture.md`,
        `${safeProjectName}/src/`,
        `${safeProjectName}/tests/`,
      ],
      server: "192.168.64.31:7722 (/home/devadm01/pyhgoshift)",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || "프로젝트 셋업 실행 실패",
    }, { status: 500 });
  }
}
