# 🎬 MovieMood

A modern, responsive web application that recommends movies based on your current mood. Built with React, TypeScript, and Vite, powered by The Movie Database (TMDB) API.

**Live Demo:** [https://arnovism.github.io/movie-mood/](https://arnovism.github.io/movie-mood/)

## ✨ Features

- **Mood-Based Recommendations**: Select your current mood and get personalized movie suggestions
- **Daily Recommendations**: Curated movie picks for each day of the week
- **Movie Details**: View comprehensive information including cast, ratings, trailers, and reviews
- **Watchlist**: Save your favorite movies for later
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark Mode**: Beautiful glassmorphism UI with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ArnovisM/movie-mood.git
cd movie-mood
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:
```
VITE_TMDB_API_KEY=your_api_key_here
```

⚠️ **IMPORTANT**: Never commit your `.env` file to GitHub. It's already included in `.gitignore`.

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📦 Deployment

This project uses **GitHub Actions** for automated deployment to GitHub Pages.

### How it works

1. The workflow is defined in `.github/workflows/deploy.yml`.
2. Every push to the `main` branch triggers a build and deploy process.
3. The API key is securely injected from GitHub Secrets during the build.

### Setup for Forking/Cloning

If you want to deploy your own version:

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**.
2. Create a new repository secret named `VITE_TMDB_API_KEY` with your TMDB API key.
3. Go to **Settings** → **Pages**.
4. Under **Source**, select **GitHub Actions**.
5. Push changes to `main`.

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing (HashRouter for GitHub Pages compatibility)
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **TMDB API** - Movie data

## 📁 Project Structure

```
movie-mood/
├── src/
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── services/        # API services and utilities
│   ├── styles/          # CSS variables and global styles
│   └── utils/           # Utility functions
├── public/              # Static assets
├── .github/workflows/   # GitHub Actions configuration
├── .env.example         # Environment variables template
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🔒 Security

- Never commit your `.env` file
- Never share your TMDB API key publicly
- The `.env` file is already in `.gitignore` to prevent accidental commits
- API keys for production are managed via GitHub Secrets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ by Arnovis Montero
