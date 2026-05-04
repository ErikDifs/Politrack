# Sandcastle Configuration for PoliTrack

Sandcastle is an AI orchestration system for automating coding tasks using Claude Code (with Claude subscription).

## Setup

### 1. Generate Claude OAuth Token

Run this command once to generate your OAuth token:

```bash
claude setup-token
```

Copy the token and add it to `.sandcastle/.env`:

```
CLAUDE_CODE_OAUTH_TOKEN=<your-token-here>
GH_TOKEN=<your-github-token-here>
```

### 2. Configure GitHub Token

Add your GitHub personal access token to `.env` (needs `repo` and `workflow` scopes).

## Usage

Run Sandcastle with:

```bash
pnpm sandcastle
```

Or run directly:

```bash
npx tsx .sandcastle/main.ts
```

## Architecture

- `main.ts` - Entry point that configures and runs the agent
- `prompt.md` - System prompt for the Claude agent
- `.env` - Configuration (OAuth token, GitHub token)
- `tsconfig.json` - TypeScript configuration for Node.js runtime

## How It Works

1. Sandcastle initializes a Docker sandbox with your project
2. Claude Code agent reads the prompt
3. Agent processes tasks iteratively
4. Changes are committed and verified
5. Results are reported

See `prompt.md` for task instructions.
