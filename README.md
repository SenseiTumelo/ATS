# Tumie's ATS Score Checker

An AI-powered tool that analyzes your CV against a job description and provides a detailed compatibility report with actionable improvement tips.

## 📋 Project Overview

**Tumie's ATS Score Checker** helps job seekers optimize their CVs for Applicant Tracking Systems (ATS). Upload your CV, paste a job description, and get:
- Overall ATS compatibility score (0-100%)
- Section-by-section breakdown (Skills, Experience, Education, Keywords)
- Prioritized improvement tips to boost your score

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Install Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Install Git](https://git-scm.com/)

### Installation Steps

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd ATS
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root with the following variables:
   ```
   VITE_SUPABASE_URL="https://yttsbdqfmngowvqpzbwf.supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0dHNiZHFmbW5nb3d3cXB6YndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTM4MzAsImV4cCI6MjA4NzE2OTgzMH0.ekxox6lLQovK5RAsB3kahkIWXLy_fzsqtqoSozlRpgk"
   VITE_SUPABASE_PROJECT_ID="yttsbdqfmngowvqpzbwf"
   ```
   
   **Note:** These credentials are also available in `env.txt` if needed.

4. **Start the development server**
   ```sh
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## 📖 Available Commands

```sh
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Preview production build locally
npm preview

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Lint code for style issues
npm lint
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite 5** - Lightning-fast build tool
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn-ui** - Pre-built, customizable components
- **Framer Motion** - Smooth animations
- **React Router v6** - Client-side routing

### Backend & Services
- **Supabase** - PostgreSQL database + edge functions
- **TanStack React Query** - Server state management

### Form & Validation
- **React Hook Form** - Lightweight form management
- **Zod** - Schema validation

### Testing & Linting
- **Vitest** - Unit test framework
- **ESLint** - Code quality
- **Testing Library** - Component testing

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   └── ui/             # shadcn-ui component library
├── pages/              # Route pages (Index, NotFound)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript interfaces
├── integrations/       # External service integrations (Supabase)
├── test/               # Test files
└── main.tsx            # React entry point

supabase/
└── functions/          # Backend edge functions
    └── analyze-cv/     # AI analysis function

public/                 # Static assets
```

## 🔧 Configuration Files

- **vite.config.ts** - Vite build configuration
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **eslint.config.js** - ESLint rules
- **vitest.config.ts** - Testing configuration

## 🌐 How to Deploy

### Deploy to Production

1. **Build the project**
   ```sh
   npm run build
   ```

2. Choose your deployment platform:

   **Vercel** (Recommended)
   - Connect your GitHub repo to [Vercel](https://vercel.com)
   - Deployments happen automatically on push
   - Add environment variables in Vercel dashboard

   **Netlify**
   - Connect GitHub repo to [Netlify](https://netlify.com)
   - Set build command: `npm run build`
   - Set publish directory: `dist`

   **Other Platforms**
   - Upload the `dist/` folder to your hosting service
   - Ensure environment variables are set

## 📝 Development Workflow

1. Create a new branch for your feature
   ```sh
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally
   ```sh
   npm run dev
   ```

3. Run linting and tests
   ```sh
   npm lint
   npm test
   ```

4. Commit and push
   ```sh
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

## ⚠️ Troubleshooting

**Issue: Environment variables not loading**
- Ensure `.env.local` is in the project root (same level as `package.json`)
- Restart the dev server after adding `.env.local`

**Issue: Port 5173 already in use**
- Run: `npm run dev -- --port 3000` to use a different port

**Issue: CSS errors with Tailwind imports**
- Ensure `@import` statements come before `@tailwind` directives in CSS files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn-ui Documentation](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
