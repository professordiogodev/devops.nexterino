# NEXTERINO

**A minimal Next.js “Hello World” app with runtime-configurable path, number, and healthcheck, packaged as a multi-architecture Docker image.**

---

## Features

- **Dynamic Path & Number**: Uses `DESIRED_PATH` and `NUMBER` environment variables to customize the greeting.
- **Healthcheck Endpoint**: Built‑in `/api/healthcheck` route returning HTTP 200 "It works!".
- **Next.js App Router**: Server‑side rendering with the App Router (`app/` directory).
- **Standalone Output**: `next.config.js` set to `output: 'standalone'` for minimal runtime bundle.
- **Multi‑Arch Docker**: Single Docker manifest supporting both x86\_64 and ARM64 platforms (via optionalDependencies).

---

## Environment Variables

| Name           | Default | Description                                                           |
| -------------- | ------- | --------------------------------------------------------------------- |
| `DESIRED_PATH` | `/`     | Prefix path for the greeting page (e.g. `/demo` → served at `/demo`). |
| `NUMBER`       | `0`     | Arbitrary number interpolated into the greeting.                      |
| `PORT`         | `3000`  | Port for the Next.js server.                                          |

---

## Getting Started (Development)

### 1. Install dependencies

```bash
npm install
