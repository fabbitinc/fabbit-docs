import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const planningDir = path.resolve(__dirname, "..");

interface ScreenInfo {
  policies: string[];
}

interface FeatureData {
  planning: boolean;
  policy: boolean;
  screens: Record<string, ScreenInfo>;
  flows: string[];
}

function featureScanPlugin() {
  function scanTree(): Record<string, Record<string, FeatureData>> {
    const tree: Record<string, Record<string, FeatureData>> = {};

    const modules = fs.readdirSync(planningDir).filter((name) => {
      const full = path.join(planningDir, name);
      return fs.statSync(full).isDirectory() && !name.startsWith(".");
    });

    for (const mod of modules) {
      tree[mod] = {};
      const modPath = path.join(planningDir, mod);

      const features = fs.readdirSync(modPath).filter((name) => {
        const full = path.join(modPath, name);
        return fs.statSync(full).isDirectory();
      });

      for (const feat of features) {
        const featPath = path.join(modPath, feat);
        const files = fs.readdirSync(featPath);
        const hasPlanning = files.includes("기획.md");
        const hasPolicy = files.includes("정책.md");

        // screens/ 폴더 스캔: .tsx = 화면, {screen}-*.md = 해당 화면의 정책
        const screens: Record<string, ScreenInfo> = {};
        const screensDir = path.join(featPath, "screens");
        if (fs.existsSync(screensDir) && fs.statSync(screensDir).isDirectory()) {
          const allFiles = fs.readdirSync(screensDir);
          const tsxFiles = allFiles.filter((f) => f.endsWith(".tsx"));
          const mdFiles = allFiles.filter((f) => f.endsWith(".md"));

          for (const tsx of tsxFiles) {
            const screenName = tsx.replace(/\.tsx$/, "");
            // {screenName}-*.md 패턴으로 매칭
            const policies = mdFiles.filter((md) => md.startsWith(screenName + "-"));
            screens[screenName] = { policies };
          }
        }

        let flows: string[] = [];
        const flowsDir = path.join(featPath, "flows");
        if (fs.existsSync(flowsDir) && fs.statSync(flowsDir).isDirectory()) {
          flows = fs
            .readdirSync(flowsDir)
            .filter((f) => f.endsWith(".tsx"))
            .map((f) => f.replace(/\.tsx$/, ""))
            .sort((a, b) => a.localeCompare(b, "ko"));
        }

        tree[mod][feat] = { planning: hasPlanning, policy: hasPolicy, screens, flows };
      }
    }

    return tree;
  }

  return {
    name: "feature-scan",
    configureServer(server: any) {
      server.middlewares.use("/api/tree", (_req: any, res: any) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(scanTree()));
      });

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
      "@planning": planningDir,
      "@wire": path.resolve(__dirname, "./src/components/wire"),
    },
  },
  server: {
    fs: {
      allow: [__dirname, planningDir],
    },
  },
});
