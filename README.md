# Naveed Ahmed — Ultra-Premium 3D Developer Portfolio

A cinematic, immersive, and visually groundbreaking developer portfolio built with cutting-edge web technologies. This is not a traditional portfolio — it's a next-generation digital experience.

## Tech Stack

### Frontend
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — Utility-first styling
- **Three.js + React Three Fiber + Drei** — 3D graphics & environments
- **Framer Motion** — Advanced animations & transitions
- **Lenis** — Buttery smooth scrolling
- **GSAP** — Professional animation toolkit

### Backend
- **Python FastAPI** — High-performance async API
- **PostgreSQL** — Primary database
- **Redis** — Caching & real-time features
- **WebSocket** — Live visitor presence

### DevOps
- **Docker + Docker Compose** — Containerized deployment
- **Vercel** — Frontend hosting
- **Railway/Render** — Backend hosting

## Features

### Cinematic Hero Section
- Interactive 3D environment with floating geometries
- Dynamic particle field with 2000+ particles
- Animated camera movement & orbital controls
- Cinematic typography reveal with staggered animations

### Interactive 3D Skills Galaxy
- Orbiting technology nodes in 3D space
- Neural-network style connection lines
- Interactive hover states with skill details
- Category-based filtering

### Immersive Project Showcase
- Glassmorphic project cards with hover effects
- Cinematic modal with architecture diagrams
- Tech stack visualization
- AI-generated project explanations (via FastAPI)

### Developer Terminal
- Fully interactive command-line interface
- Command history (arrow keys)
- Hidden easter eggs (`matrix`, `hack`, `sudo`)
- Animated typing & hacker-style effects

### Experience Timeline
- Scroll-triggered cinematic animations
- Alternating layout with timeline connector
- Expandable experience cards
- Tech stack badges

### Advanced Effects
- Custom animated cursor (desktop)
- Glassmorphism throughout
- Animated gradient text
- Particle background with mouse interaction
- Grid overlay with subtle scanlines
- Noise texture overlays
- Gradient borders
- Cinematic loading screen
- Section dividers with glow effects
- Smooth scroll with Lenis

### Contact System
- Animated contact form with real-time validation
- Glowing UI elements
- Submission animations with status states
- API integration (Next.js Route Handler + FastAPI)

### Mobile Responsive
- Adaptive layouts for all screen sizes
- Mobile navigation with animated hamburger
- Touch-optimized interactions
- Performance-conscious 3D rendering

### SEO & Metadata
- OpenGraph tags
- Twitter card support
- Structured metadata
- Semantic HTML

## Getting Started

### Prerequisites
- Node.js 20+
- Python 3.12+
- Docker (optional)

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload --port 8000
```

### Docker Setup

```bash
# Build and run all services
docker compose up --build

# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/contact/     # Next.js API routes
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles & effects
│   ├── components/
│   │   ├── hero/            # 3D hero scene & section
│   │   ├── about/           # About section
│   │   ├── projects/        # Project showcase & modal
│   │   ├── skills/          # 3D skills galaxy
│   │   ├── timeline/        # Experience timeline
│   │   ├── terminal/        # Interactive terminal
│   │   ├── contact/         # Contact form
│   │   ├── navigation/      # Navbar & mobile menu
│   │   ├── loading/         # Cinematic loading screen
│   │   ├── effects/         # Cursor, particles, grid
│   │   ├── footer/          # Footer
│   │   └── common/          # Shared components
│   ├── hooks/               # Custom React hooks
│   ├── data/                # Portfolio data & content
│   └── utils/               # Utility functions
├── backend/
│   ├── app/
│   │   ├── api/             # FastAPI route handlers
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   └── services/        # Business logic
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Environment Variables

Create `.env.local` in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create `.env` in `/backend`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio
REDIS_URL=redis://localhost:6379
```

## Deployment

### Frontend (Vercel)
```bash
npx vercel --prod
```

### Backend (Railway/Render)
Deploy the `/backend` directory with the included Dockerfile.

## Performance

Despite heavy 3D visuals, the app maintains high performance through:
- Dynamic imports and code splitting
- Lazy-loaded 3D scenes
- Optimized particle counts
- DPR capping for GPU efficiency
- SSR for initial page load
- Efficient re-render prevention

## License

MIT
