import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// 기획 폴더 하위의 폴더 트리를 스캔하는 플러그인
function featureScanPlugin() {
  const planningDir = path.resolve(__dirname, "..");

  function scanTree() {
    const tree: Record<string, Record<string, { wireframe: boolean; policy: boolean; policies: string[] }>> = {};

    const modules = fs.readdirSync(planningDir).filter((name) => {
      const full = path.join(planningDir, name);
      return fs.statSync(full).isDirectory() && !name.startsWith(".");
    });

    for (const mod of modules) {
      tree[mod] = {};
      const modPath = path.join(planningDir, mod);
      if (!fs.statSync(modPath).isDirectory()) continue;

      const features = fs.readdirSync(modPath).filter((name) => {
        const full = path.join(modPath, name);
        return fs.statSync(full).isDirectory();
      });

      for (const feat of features) {
        const featPath = path.join(modPath, feat);
        const files = fs.readdirSync(featPath);
        const hasWireframe = files.includes("와이어프레임.html");
        const hasPolicy = files.includes("정책.md");

        let policies: string[] = [];
        const policiesDir = path.join(featPath, "policies");
        if (fs.existsSync(policiesDir) && fs.statSync(policiesDir).isDirectory()) {
          policies = fs.readdirSync(policiesDir).filter((f) => f.endsWith(".md"));
        }

        tree[mod][feat] = { wireframe: hasWireframe, policy: hasPolicy, policies };
      }
    }

    return tree;
  }

  return {
    name: "feature-scan",
    configureServer(server: any) {
      // API: 트리 정보
      server.middlewares.use("/api/tree", (_req: any, res: any) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(scanTree()));
      });

      // 기획 폴더의 정적 파일 서빙
      server.middlewares.use("/files", (req: any, res: any) => {
        const filePath = path.join(planningDir, decodeURIComponent(req.url || ""));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath);
          const mimeTypes: Record<string, string> = {
            ".html": "text/html; charset=utf-8",
            ".md": "text/plain; charset=utf-8",
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".svg": "image/svg+xml",
          };
          res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
          fs.createReadStream(filePath).pipe(res);
        } else {
          res.statusCode = 404;
          res.end("Not found");
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), featureScanPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
