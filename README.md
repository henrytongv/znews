# ZNews - Latest News Application

A modern, accessible news application built with Next.js, React, and Material-UI that displays the latest news from newsdata.io API.

## Features

### Current (Phase 1)
- ✅ Professional UI with Material-UI cold color palette (blues, teals, grays)
- ✅ Server-side API integration with newsdata.io
- ✅ Two-column news layout with images and truncated descriptions
- ✅ Responsive design (mobile-first)
- ✅ WCAG accessibility compliance
- ✅ Click-through to article detail pages
- ✅ Full article view with link to source
- ✅ User-friendly error handling
- ✅ Loading states with skeleton screens
- ✅ AI Developer Workflows (AIDW) custom skills

### Planned (Phase 2)
- Light/dark theme toggle
- Search functionality
- Category filtering
- Database integration
- User preferences

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material-UI v6
- **Language**: TypeScript
- **API**: newsdata.io
- **Deployment**: Vercel
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 20+ installed
- newsdata.io API key (get one at https://newsdata.io/)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Edit `.env.local` and add your newsdata.io API key:
   ```env
   NEWSDATA_API_KEY=your_actual_api_key_here
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## AI Developer Workflows (AIDW)

This project includes custom Claude Code skills for streamlined development:

- `/build` - Build and type-check the project
- `/plan` - Create implementation plans for features
- `/test` - Run tests and verify functionality
- `/push` - Push changes to GitHub with verification
- `/chore` - Handle maintenance tasks
- `/feature` - Guide feature implementation workflow
- `/implement` - Execute implementation plans step-by-step

## Project Structure

```
znews/
├── .claude/skills/          # AIDW custom skills
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout with MUI provider
│   │   ├── page.tsx         # Home page (news list)
│   │   ├── article/[id]/    # Article detail page
│   │   └── api/news/        # API routes
│   ├── components/          # React components
│   │   ├── NewsCard.tsx     # Individual news card
│   │   ├── NewsList.tsx     # List of news cards
│   │   └── ErrorMessage.tsx # Error display
│   ├── lib/                 # Utilities
│   │   ├── newsApi.ts       # newsdata.io integration
│   │   ├── errorHandler.ts  # Error handling
│   │   └── textUtils.ts     # Text utilities
│   ├── types/news.ts        # TypeScript types
│   └── theme/theme.ts       # MUI cold color theme
├── public/                  # Static assets
├── .env.local               # Local environment variables (gitignored)
├── .env.example             # Environment template
└── vercel.json              # Vercel deployment config
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial ZNews implementation"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `NEWSDATA_API_KEY`: Your newsdata.io API key

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Preview deployments created for feature branches

## Development Guidelines

### Accessibility

- Use semantic HTML
- Include ARIA labels on interactive elements
- Ensure proper heading hierarchy
- Maintain WCAG AA color contrast (4.5:1 minimum)
- Support keyboard navigation
- Provide alt text for images

### Responsive Design

- Mobile-first approach
- Test at breakpoints: 600px (tablet), 900px (desktop)
- Use MUI's responsive sx props
- Optimize images with Next.js Image component

### Error Handling

- Log technical errors server-side only
- Display user-friendly error messages
- Never expose API keys or stack traces
- Provide retry mechanisms

## API Integration

The application uses server-side API routes to securely integrate with newsdata.io:

- `GET /api/news` - Fetch latest news
  - Query params: `page`, `category`, `language`, `q`, `country`

- `GET /api/news/[id]` - Fetch single article by ID

API keys are never exposed to the client and all requests are proxied through Next.js API routes.

## License

MIT License - see LICENSE file for details
