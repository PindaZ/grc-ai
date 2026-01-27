# Agent Skills Infrastructure (No-API Implementation)

This project now supports the **Anthropic Agent Skills** standard (`skills/**/SKILL.md`).
The implementation is currently running in **Mock Mode**, meaning it loads and parses skills correctly but simulates the AI response to demonstrate functionality without needing an API key.

## Components

1.  **Skills Directory**: `skills/`
    -   Contains standard agent skills.
    -   Example: `skills/compliance-checker/SKILL.md`

2.  **Skill Loader**: `src/lib/agent/skill-loader.ts`
    -   Scans the `skills` directory.
    -   Parses YAML frontmatter (Level 1 Metadata).
    -   Returns tool definitions compatible with OpenAI/Anthropic SDKs.

3.  **Agent API**: `/api/agent` (`src/app/api/agent/route.ts`)
    -   **Current Status**: MOCK
    -   Loads skills likely a real agent would.
    -   Injects skill descriptions into the "System Prompt" (preview).
    -   Simulates a skill trigger if you ask about "compliance".

## How to Verify

Run the included test script:

```bash
node scripts/test-agent.js
```

You should see:
1.  **Generic Hello**: The agent loads 0 skills (or just list them) and says hello.
2.  **Compliance Request**: The agent detects "compliance" usage, loads the `compliance-checker` skill, and prints its instructions.

## Next Steps (When ready for Real AI)

To switch to a real LLM (Claude, OpenAI, or Local Ollama):
1.  Open `src/app/api/agent/route.ts`.
2.  Replace the "Mock Logic" section with a real call to your LLM SDK.
3.  Pass the `skills` array as `tools`.
