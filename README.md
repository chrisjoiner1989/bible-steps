# Bible Steps 📖✨

**Daily Faith for Real Life** - A mobile-first spiritual formation app for young adults navigating 2026.

## Vision

Bible Steps addresses real-world challenges facing young Christian adults:
- **Digital Distraction & Shallow Faith** - 5-minute micro-devotions designed for busy lives
- **Spiritual Burnout & Mental Health** - Grace-based approach with Sabbath practices
- **Applying Faith to Real Life** - Practical action steps that bridge Sunday to Monday

## Features (MVP)

### ✅ Completed
- **Micro-Devotions** - 5-minute daily devotions with rich content and practical actions
- **Grace-Based Streak Tracker** - Visual progress tracking with grace periods (no guilt!)
- **Mobile-First Design** - Native-feeling mobile UI with bottom navigation
- **Dark Mode Support** - Automatic theme switching
- **Category-Based Content** - Anxiety & Peace, Work Ethics, Relationships, Rest & Sabbath, etc.
- **PWA Ready** - Installable as a standalone mobile app

### 🚧 Coming Soon
- Devotion detail pages with full reading experience
- Sabbath mode (app restricts itself to encourage rest)
- Community circles (3-5 person accountability groups)
- Breath prayer library with guided audio
- Decision coach with AI-assisted Scripture matching
- Real-time mood tracking before/after devotions
- Justice & action pathways

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React
- **Styling**: Tailwind CSS v4 with custom mobile-first theme
- **UI Components**: Headless UI, Framer Motion, Lucide Icons
- **TypeScript**: Full type safety
- **PWA**: Web App Manifest for mobile installation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd bible-steps

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Mobile Testing

To test on a real mobile device:
1. Start the dev server: `npm run dev`
2. Find your local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
3. On your phone's browser, visit: `http://YOUR_IP:3000`
4. For iOS: Add to Home Screen for full-screen PWA experience

## Project Structure

```
bible-steps/
├── app/                      # Next.js app router pages
│   ├── page.tsx             # Home page (today's devotion + streak)
│   ├── devotions/           # Devotions library page
│   ├── community/           # Community circles page
│   ├── sabbath/             # Sabbath mode & rest tracking
│   └── profile/             # User profile & settings
├── components/
│   ├── layout/              # Navigation, headers
│   ├── devotions/           # Devotion cards, reading UI
│   ├── steps/               # Streak tracker, progress
│   ├── community/           # Groups, posts, prayers
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── data/                # Sample data, mock content
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utility functions
└── types/                   # TypeScript type definitions
```

## Design Philosophy

### Anti-Hustle
- Rest is celebrated, not guilt-tripped
- Grace periods for missed days
- Sabbath mode actively encourages putting the phone down

### Mental Health Aware
- Destigmatizes therapy alongside prayer
- Mood tracking integrated naturally
- "Mental Health Mode" silences all notifications

### Action-Oriented
- Every devotion includes a practical step
- Steps are specific, achievable, and real-world focused

### Grace-Based
- No shame mechanics or guilt-trip notifications
- Progress over perfection messaging
- Focus on celebration, not condemnation

## Color Palette

```css
/* Light Mode */
--primary: #7c3aed     /* Purple - spiritual, modern */
--secondary: #ec4899   /* Pink - joy, community */
--accent: #f59e0b      /* Amber - energy, action */
--grace: #a78bfa       /* Light purple - compassion */
--success: #10b981     /* Green - growth */

/* Theme adapts automatically for dark mode */
```

## Next Steps for Development

1. **Backend Setup** - Choose Firebase or Supabase
2. **Authentication** - Email/Google/Apple sign-in
3. **Content Management** - Integrate headless CMS for devotions
4. **Devotion Reader** - Build full reading experience with animations
5. **Community Features** - Real-time group chat and prayer walls
6. **Push Notifications** - Grace-based reminders system
7. **Analytics** - Privacy-first tracking of engagement

## Contributing

This app is designed for real people facing real challenges. When contributing:
- Keep mobile performance top priority
- Test on actual devices, not just desktop browsers
- Maintain the grace-based, anti-guilt tone
- Consider accessibility (screen readers, font sizing)

## License

[Your chosen license]

---

Built with ❤️ for young Christians navigating faith in 2026.
