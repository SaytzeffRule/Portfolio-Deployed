# Portfolio Website

A production-grade personal portfolio and resume website built with **React (Vite)**,
**Tailwind CSS**, containerized with **Docker**, and deployed automatically to **AWS EC2**
via **GitHub Actions** — with static assets served from **S3** and monitoring via **CloudWatch**.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         GitHub Repository                               │
│  ┌──────────────┐  ┌────────────────┐  ┌───────────────────────────┐  │
│  │  React App   │  │  Nginx Config  │  │  CloudWatch / IAM / Docs │  │
│  │  (Vite+TW)   │  │  Dockerfile    │  │  README                  │  │
│  └──────┬───────┘  └───────┬────────┘  └───────────────────────────┘  │
└─────────┼──────────────────┼───────────────────────────────────────────┘
          │                  │
          ▼                  ▼
┌──────────────────────────────────────┐
│         GitHub Actions (CI/CD)       │
│                                      │
│  push → main                         │
│  ┌──────────────────────────────┐    │
│  │  Job 1: Build & Push Image   │    │
│  │  - docker buildx             │    │
│  │  - tag: SHA + latest         │    │
│  │  - push to Docker Hub        │    │
│  └─────────────┬────────────────┘    │
│                │                     │
│  ┌─────────────▼────────────────┐   │
│  │  Job 2: SSH Deploy           │   │
│  │  - pull latest image         │   │
│  │  - docker compose up -d      │   │
│  │  - prune old images          │   │
│  └──────────────────────────────┘   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐     ┌──────────────────────┐
│         Docker Hub Registry          │     │   AWS S3 Bucket      │
│  ┌──────────────────────────────┐    │     │                      │
│  │  portfolio:latest            │    │     │  resume.pdf          │
│  │  portfolio:a1b2c3d           │    │     │  profile.jpg         │
│  └─────────────┬────────────────┘    │     │  (public-read)       │
└────────────────┼─────────────────────┘     └──────────────────────┘
                 │
                 ▼
┌───────────────────────────────────────────────────────────────────────┐
│                      AWS EC2 Instance                                 │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  Docker Container (Nginx on 80)                                │  │
│  │  ┌───────────────────────────────────────────────────────────┐  │  │
│  │  │  /usr/share/nginx/html/ ← built React app               │  │  │
│  │  │  /health → 200 OK                                        │  │  │
│  │  │  gzip + caching headers                                  │  │  │
│  │  └───────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  CloudWatch Agent (metrics + logs)                             │  │
│  │  - CPU / memory / disk metrics → CloudWatch Metrics            │  │
│  │  - Container logs → CloudWatch Logs (log group: portfolio-app) │  │
│  │  - Alarm: CPU > 80% for 5 min → SNS notification              │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Local Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (optional — for containerized dev)

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env` to set `VITE_RESUME_URL` and `VITE_PROFILE_IMG_URL` after you upload assets to S3 (see [S3 Setup](#s3-setup)).

### 3. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173 — hot reload is active.

### 4. (Alternative) Run with Docker Compose

```bash
# Vite dev server with hot reload
docker compose up app

# Production-like Nginx server (builds the image first)
docker compose up portfolio
```

---

## Project Structure

```
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── public/                          # Static files served as-is
├── src/
│   ├── assets/                      # Placeholder for local assets (use S3 in prod)
│   ├── components/                  # Reusable UI components
│   │   ├── Header.jsx               # Fixed nav with theme toggle
│   │   ├── Footer.jsx               # Social links + copyright
│   │   └── ThemeToggle.jsx          # Dark/light mode toggle
│   ├── sections/                    # One section per page area
│   │   ├── Hero.jsx                 # Landing section
│   │   ├── About.jsx                # Bio + photo
│   │   ├── Projects.jsx             # Project cards
│   │   ├── Skills.jsx               # Tech stack grid
│   │   ├── Resume.jsx               # Download PDF button
│   │   └── Contact.jsx              # Contact form (placeholder)
│   ├── App.jsx                      # Root component
│   ├── App.css                      # Fallback overrides
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Tailwind directives + component classes
├── nginx/default.conf               # Nginx config (gzip, caching, /health)
├── cloudwatch/
│   ├── agent-config.json            # CloudWatch agent config
│   └── alarm.json                   # CPU > 80% alarm
├── iam/deploy-user-policy.json      # Least-privilege IAM policy
├── scripts/upload-s3.sh             # Upload resume + images to S3
├── Dockerfile                       # Multi-stage build
├── docker-compose.yml               # Local dev + production-like container
├── .dockerignore
├── .gitignore
├── .env.example                     # Required environment variables
├── index.html                       # HTML entry point
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## AWS Resource Setup (Manual Steps)

You need to create the following AWS resources manually. Each section tells you exactly what to do.

### S3 Bucket (for static assets)

1. Open the S3 console → **Create bucket**.
2. **Bucket name:** `your-portfolio-assets` (must be globally unique).
3. **Region:** Choose one close to you (e.g., `us-east-1`).
4. **Block Public Access settings:** Uncheck *Block all public access* (we need public-read for resume/photo).
5. Acknowledge the warning, then click **Create bucket**.
6. Select the bucket → **Permissions** tab → **Bucket Policy** → paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-assets/*"
    }
  ]
}
```

7. Upload your `resume.pdf` and `profile.jpg` via the console or run:

```bash
aws s3 cp ./assets/resume.pdf s3://your-portfolio-assets/resume.pdf --acl public-read
aws s3 cp ./assets/profile.jpg s3://your-portfolio-assets/profile.jpg --acl public-read
```

8. Note the URLs — set them in `.env`:
   - `https://your-portfolio-assets.s3.us-east-1.amazonaws.com/resume.pdf`
   - `https://your-portfolio-assets.s3.us-east-1.amazonaws.com/profile.jpg`

### IAM Deploy User

1. Open the IAM console → **Users** → **Create user**.
2. **User name:** `github-deployer`.
3. **Attach policies directly:** Click **Create inline policy** → switch to JSON → paste the contents of `iam/deploy-user-policy.json` (replace `YOUR_BUCKET_NAME` with your bucket name).
4. Name the policy `portfolio-deploy-policy` and create the user.
5. Select the user → **Security credentials** → **Create access key**.
6. Choose **Application running outside AWS** → copy the **Access Key ID** and **Secret Access Key**.

### EC2 Instance

1. Open the EC2 console → **Launch instance**.
2. **Name:** `portfolio-app`.
3. **AMI:** Ubuntu 24.04 LTS (or Amazon Linux 2023).
4. **Instance type:** `t3.small` (free-tier eligible `t2.micro` is fine; `t3.small` gives you breathing room).
5. **Key pair:** Create or select an existing key pair (you'll download a `.pem` file).
6. **Network settings → Edit:**
   - Allow SSH (22) from your IP only.
   - Allow HTTP (80) from anywhere (0.0.0.0/0).
   - Allow HTTPS (443) from anywhere (optional for now).
7. **Configure storage:** 20 GB gp3.
8. Launch the instance.

### EC2 Setup Commands (run via SSH)

```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install -y docker-compose-plugin

# Create the project directory
mkdir ~/portfolio && cd ~/portfolio

# Copy docker-compose.yml from the repo (or scp it up)
# You'll also need to copy the .env file with your image name

# Test — pull and run the image (once a build exists)
docker pull YOUR_DOCKER_USERNAME/portfolio:latest
docker compose up -d

# Verify
curl http://localhost:80/health
# → "healthy"

# The GitHub Actions workflow will handle future updates automatically.
```

### CloudWatch Agent

```bash
# SSH into EC2
# Install the CloudWatch agent
sudo apt install -y amazon-cloudwatch-agent

# Copy the agent config from the repo (cloudwatch/agent-config.json) to
# /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json

# Start the agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json \
  -s
```

### CloudWatch Alarm

1. Open the CloudWatch console → **Alarms** → **Create alarm**.
2. **Select metric:** Browse → `PortfolioApp` → `InstanceId` → select `cpu_usage_user`.
3. **Conditions:**
   - Statistic: Average
   - Period: 5 minutes
   - Threshold: > 80
4. **Notification:** Create a new SNS topic (`portfolio-alerts`) and subscribe your email.
5. **Alarm name:** `portfolio-cpu-high`.
6. Click **Create alarm**.

Alternatively, use the AWS CLI with `cloudwatch/alarm.json` (replace placeholders first):

```bash
aws cloudwatch put-metric-alarm --cli-input-json file://cloudwatch/alarm.json
```

---

## How CI/CD Works

### Trigger

Every push to the `main` branch kicks off the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### Job 1: Build & Push (Docker Hub)

| Step | What happens |
|------|-------------|
| Checkout | Pulls the latest code from the repository |
| Docker login | Authenticates with Docker Hub using `DOCKER_USERNAME` / `DOCKER_PASSWORD` secrets |
| Build | Runs `docker buildx` with the multi-stage `Dockerfile`. The Node stage installs deps and runs `vite build`; the Nginx stage copies the output into `/usr/share/nginx/html` |
| Tag | Tags the image with the short git SHA (`portfolio:a1b2c3d`) and `portfolio:latest` |
| Push | Pushes both tags to Docker Hub |

### Job 2: Deploy (EC2)

| Step | What happens |
|------|-------------|
| SSH | Connects to EC2 via the `appleboy/ssh-action` using `EC2_HOST`, `EC2_USER`, and `SSH_PRIVATE_KEY` |
| Pull | `docker pull` fetches the `latest` image from Docker Hub |
| Restart | `docker compose up -d --force-recreate` stops the old container (if any) and starts a new one with the fresh image |
| Cleanup | `docker image prune -af --filter "until=24h"` removes unused images older than 24 hours to free disk space |

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password or personal access token |
| `EC2_HOST` | Public IP or DNS of the EC2 instance |
| `EC2_USER` | SSH username (usually `ubuntu` or `ec2-user`) |
| `SSH_PRIVATE_KEY` | The entire contents of the `.pem` private key file |

### Security Notes

- No secrets are stored in the repository — everything uses GitHub Secrets.
- The IAM deploy user has only the permissions it needs (S3 put, CloudWatch put, EC2 describe).
- The EC2 security group restricts SSH to your IP only.

---

## Customization Checklist

- [ ] Replace all `// TODO: replace with real content` comments in the source files with your actual information.
- [ ] Upload `resume.pdf` and `profile.jpg` to S3.
- [ ] Set `VITE_RESUME_URL` and `VITE_PROFILE_IMG_URL` in `.env`.
- [ ] Update social links in `src/components/Footer.jsx`.
- [ ] Replace project data in `src/sections/Projects.jsx`.
- [ ] Replace skill data in `src/sections/Skills.jsx`.
- [ ] Wire the contact form to a backend (e.g., Formspree, EmailJS, or your own API).
- [ ] Update the `index.html` `<title>` and `<meta>` description.
- [ ] (Optional) Set up a custom domain + HTTPS via CloudFront or ALB + ACM.

---

## Local Build & Preview

```bash
npm run build      # builds into dist/
npm run preview    # serves dist/ locally at http://localhost:4173
```

Or via Docker:

```bash
docker compose up portfolio   # serves at http://localhost:8080
```

---

## License

MIT
