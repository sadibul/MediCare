# Project Setup Commands

## Initial Setup

```bash
# Install dependencies
npm install

# Setup Prisma
npx prisma init
npx prisma generate

# If you need to push schema changes to database
npx prisma db push

# If you want to open Prisma Studio to manage data
npx prisma studio

# Development
npm run dev

# Building for production
npm run build
npm run start
```

## Database Commands

```bash
# After making changes to schema.prisma
npx prisma generate    # Update Prisma Client
npx prisma db push    # Push schema changes to database
npx prisma migrate dev # Create a migration for changes
npx prisma migrate deploy # Deploy migrations in production
```

## Common Development Commands

```bash
# Start development server (default port 3000)
npm run dev

# Start on a different port
npm run dev -- -p 3001

# Linting
npm run lint

# Build
npm run build

# Start production server
npm run start
```

## Installing Additional Common Packages

```bash
# UI Components and Styling
npm install @radix-ui/react-dialog @radix-ui/react-slot
npm install class-variance-authority
npm install clsx
npm install tailwind-merge

# Form Handling
npm install react-hook-form
npm install zod @hookform/resolvers

# Authentication (if needed)
npm install next-auth

# API Data Fetching
npm install axios
```

## Environment Setup

Create a `.env` file in your project root with:

```env
DATABASE_URL="your_database_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
```

## Git Commands (if using version control)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repository-url
git push -u origin main
```
