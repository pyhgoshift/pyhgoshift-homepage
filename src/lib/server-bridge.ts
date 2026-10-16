import { Client } from "ssh2";

export interface ServerExecResult {
  stdout: string;
  stderr: string;
  code: number;
}

const SERVER_CONFIG = {
  host: process.env.AGENT_SERVER_HOST || "192.168.64.31",
  port: Number(process.env.AGENT_SERVER_PORT) || 7722,
  username: process.env.AGENT_SERVER_USER || "devadm01",
  password: process.env.AGENT_SERVER_PASSWORD || "!!0i0i0iPS",
};

/**
 * 사내 개발 서버(192.168.64.31)에 안전하게 SSH 접속하여 명령어를 실행하고 결과를 반환합니다.
 */
export async function executeServerCommand(
  cmd: string,
  timeoutMs: number = 30000
): Promise<ServerExecResult> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    let isFinished = false;

    const timer = setTimeout(() => {
      if (!isFinished) {
        isFinished = true;
        try {
          conn.end();
        } catch {
          // ignore
        }
        reject(new Error(`Server execution timed out after ${timeoutMs}ms: ${cmd}`));
      }
    }, timeoutMs);

    conn
      .on("ready", () => {
        conn.exec(cmd, (err, stream) => {
          if (err) {
            clearTimeout(timer);
            isFinished = true;
            conn.end();
            return reject(err);
          }

          let stdoutData = "";
          let stderrData = "";

          stream
            .on("close", (code: number) => {
              clearTimeout(timer);
              if (!isFinished) {
                isFinished = true;
                conn.end();
                resolve({
                  stdout: stdoutData,
                  stderr: stderrData,
                  code: code ?? 0,
                });
              }
            })
            .on("data", (data: Buffer) => {
              stdoutData += data.toString("utf8");
            })
            .stderr.on("data", (data: Buffer) => {
              stderrData += data.toString("utf8");
            });
        });
      })
      .on("error", (err) => {
        clearTimeout(timer);
        if (!isFinished) {
          isFinished = true;
          reject(err);
        }
      })
      .connect(SERVER_CONFIG);
  });
}
