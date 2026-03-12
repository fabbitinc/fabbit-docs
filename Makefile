WIREFRAME_DIR := 10_제품/기획/.wireframe

.PHONY: wireframe-dev

wireframe-dev:
	pnpm --dir "$(WIREFRAME_DIR)" run dev
