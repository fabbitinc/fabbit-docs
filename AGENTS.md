# AGENTS.md

## Context

- Current Date(!`date`): Dates to utilise when searching for the latest information

## Language Settings

- Always respond in Korean (한글) unless explicitly asked to use another language
- Provide clear and detailed explanations in Korean
- Use Korean for all code comments and documentation

## Subagent Routing

- 사용자가 `커밋해줘`, `commit 해줘`, `커밋 만들어줘`, `커밋 메시지 작성 후 커밋해줘`처럼 git 커밋을 요청하면 메인 에이전트는 `git status`, `git diff`, 스테이징, 커밋 메시지 작성, 커밋 실행 같은 사전 작업을 직접 하지 않는다.
- 이 경우 메인 에이전트는 확인부터 스테이징, 커밋 메시지 작성, 실제 커밋까지 전 과정을 지연 없이 즉시 `git_committer` 서브에이전트에 위임한다.
- 커밋 범위 확인, 변경 요약 수집, 커밋 메시지 초안 작성이 필요하더라도 메인 에이전트가 직접 수행하지 말고 모두 `git_committer`가 처리한다.
