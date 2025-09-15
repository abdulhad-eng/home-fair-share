# System Requirements

This document outlines the system requirements and dependencies needed to run the Home Fair Share application.

## Prerequisites

### System Requirements
- **Operating System**: macOS, Windows, or Linux
- **Node.js**: Version 18.x or higher (recommended: 18.17.0 or later)
- **Package Manager**: npm (comes with Node.js) or yarn
- **Git**: For version control and cloning the repository

### Node.js Installation
If you don't have Node.js installed, we recommend using nvm (Node Version Manager):

```bash
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Install nvm (Windows - use nvm-windows)
# Download from: https://github.com/coreybutler/nvm-windows

# Install Node.js
nvm install 18
nvm use 18
```

## Project Dependencies

### Runtime Dependencies (43 packages)
The project uses the following main frameworks and libraries:

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Framework**: shadcn/ui (Radix UI components)
- **Styling**: Tailwind CSS 3.4.17
- **Backend Service**: Supabase (Database & Authentication)
- **State Management**: TanStack Query 5.83.0
- **Routing**: React Router DOM 6.30.1
- **Form Handling**: React Hook Form 7.61.1 with Zod validation
- **Date Handling**: date-fns 3.6.0
- **Charts**: Recharts 2.15.4

### Development Dependencies (16 packages)
- **TypeScript**: 5.8.3
- **ESLint**: 9.32.0 with React plugins
- **PostCSS & Autoprefixer**: For CSS processing
- **Vite Plugins**: React SWC for fast compilation

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd home-fair-share
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Verify installation**
   - Development server should start on http://localhost:5173
   - Build process: `npm run build`
   - Linting: `npm run lint`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

## Environment Configuration

The application connects to Supabase for backend services. The Supabase configuration is already set up in the codebase with public credentials for the development environment.

## Troubleshooting

### Common Issues

1. **Node.js version compatibility**
   - Ensure you're using Node.js 18.x or higher
   - Use `node --version` to check your current version

2. **npm install failures**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json, then reinstall

3. **Port conflicts**
   - Default port is 5173, ensure it's not in use
   - Vite will automatically find an available port if needed

## Technology Stack Summary

- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database + Auth)
- **State Management**: TanStack Query
- **Routing**: React Router
- **Forms**: React Hook Form + Zod
- **Development**: ESLint + TypeScript