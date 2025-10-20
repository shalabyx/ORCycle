# Surgical Stages Management System

Healthcare surgical workflow tracking system built with Next.js, React, and Tailwind CSS.

## Features

- Multi-stage surgical workflow tracking (Approval → Pre-Op → Anesthesia → Booking → Admission → Reporting → Billing → Post-Op)
- Executive dashboard with KPIs and analytics
- Patient order management
- Real-time status updates
- Branch and specialist performance tracking
- Advanced filtering and search

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Deploy to Vercel

### Option 1: Deploy from GitHub

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Next.js - click "Deploy"

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

## Build

```bash
npm run build
npm start
```

## Project Structure

```
surgical-stages-app/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   └── SurgicalStagesUI.tsx  # Main component
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Environment Variables

No environment variables required for demo. For production with backend API:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## License

Proprietary - Healthcare Internal Use
