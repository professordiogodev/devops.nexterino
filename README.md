# NEXTERINO

**A minimal Next.js “Hello World” app with runtime-configurable path, number, and healthcheck, packaged as a multi-architecture Docker image.**

---

## Features

* **Dynamic Path & Number**: Uses `DESIRED_PATH` and `NUMBER` environment variables to customize the greeting.
* **Healthcheck Endpoint**: Built‑in `/api/healthcheck` route returning HTTP 200 "It works!".
* **Next.js App Router**: Server‑side rendering with the App Router (`app/` directory).
* **Standalone Output**: `next.config.js` set to `output: 'standalone'` for minimal runtime bundle.
* **Multi‑Arch Docker**: Single Docker manifest supporting both x86\_64 and ARM64 platforms (via optionalDependencies).

---

## Environment Variables

| Name           | Default | Description                                                           |
| -------------- | ------- | --------------------------------------------------------------------- |
| `DESIRED_PATH` | `/`     | Prefix path for the greeting page (e.g. `/demo` → served at `/demo`). |
| `NUMBER`       | `0`     | Arbitrary number interpolated into the greeting.                      |
| `PORT`         | `3000`  | Port for the Next.js server (`next start -p`).                        |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development mode

```bash
# starts at http://localhost:3000 by default
npm run dev
```

Visit `http://localhost:3000${DESIRED_PATH}` to see your greeting.

---

## Dockerized Deployment

We use a multi-stage Dockerfile to produce a slim, standalone image, and BuildKit to target both ARM64 and x86\_64.

### Build & Run Locally (single‑arch)

```bash
# Build (x86_64 image by default on Intel/macOS hosts)
docker build -t nexterino .

# Run with custom path, number, and port
docker run --rm -p 8080:8080 \
  -e DESIRED_PATH=/demo \
  -e NUMBER=42 \
  -e PORT=8080 \
  nexterino
```

Endpoints:

* Greeting → `http://localhost:8080/demo`
* Healthcheck → `http://localhost:8080/demo/api/healthcheck`

### Multi‑Arch Build & Push

> Requires Docker Buildx and BuildKit.

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t YOUR_REPO/nexterino:latest \
  --push .
```

Now `docker pull YOUR_REPO/nexterino:latest` will fetch the correct image for your architecture.

---

## Deploying

You can deploy this Docker image to any container platform (e.g. Kubernetes, Fly.io, Render, AWS ECS).
On Vercel, you can skip Docker entirely—just push the Next.js repo, set the environment variables in the dashboard, and it works out of the box.
