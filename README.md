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
```

### 2. Run in development mode

```bash
# starts at http://localhost:3000 by default
npm run dev
```

Visit `http://localhost:3000${DESIRED_PATH}` to see your greeting.

---

## Production Build & Running on a Server (Non-Docker)

**What is a "Build"?**

In Next.js, a build is the process of compiling your application for production. It takes your React components, optimizes images, minifies code, and generates a highly optimized version of your app. Because this project uses `output: 'standalone'` in `next.config.js`, the build process extracts only the necessary files and dependencies to run the server, creating a minimal footprint (perfect for standard servers and VPS hosting).

If you are deploying directly to a Linux server (like an Ubuntu VPS) without Docker, follow these steps to build and run the app on a specific port.

### 1. Install Dependencies

Once you have cloned the repository on your server, install the required Node.js packages:

```bash
npm install
```

### 2. Create the Production Build

Run the build command to compile the Next.js application:

```bash
npm run build
```

*This will generate a `.next` folder containing your compiled application, including a `.next/standalone` directory which is your optimized production server.*

### 3. Run the Server on a Specific Port

To run the built application on a specific port (e.g., `8080` or `4000`), you can pass the environment variables directly to the standalone Node.js server.

You will need to copy the `public` and `.next/static` folders into the `standalone` directory first (as Next.js standalone requires static assets to be manually moved if not using a CDN or Docker):

```bash
# Copy static files to the standalone directory
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# Run the production server on your desired port
PORT=8080 DESIRED_PATH=/demo NUMBER=42 node .next/standalone/server.js
```

*(Optional)* To keep the application running in the background even after you close the terminal, it is highly recommended to use a process manager like **PM2**:

```bash
npm install -g pm2
PORT=8080 pm2 start .next/standalone/server.js --name "nexterino-app"
```

---

## Dockerized Deployment

We use a multi-stage Dockerfile to produce a slim, standalone image, and BuildKit to target both ARM64 and x86_64. Docker automates the build and standalone asset copying mentioned above.

### Build & Run Locally (single‑arch)

```bash
# Build (x86_64 image by default on Intel/macOS hosts)
docker build -t nexterino .

# Run with custom path, number, and port (e.g., port 8080)
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

> Requires Docker Buildx and BuildKit.

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
