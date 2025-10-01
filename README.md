# Next.js 14+ CRUD Application with Prisma & PostgreSQL

A modern full-stack CRUD (Create, Read, Update, Delete) application built with Next.js 14, showcasing Server Actions, Server Components, and Prisma ORM with PostgreSQL database.

## 🚀 Features

- ✅ **Server Actions** - No API routes needed for data mutations
- ✅ **Server Components** - Server-side rendering with direct database access
- ✅ **Form Validation** - Client & server-side validation with Zod
- ✅ **Type Safety** - Full TypeScript support throughout
- ✅ **Modern UI** - Shadcn/ui components with Tailwind CSS
- ✅ **Data Tables** - Sortable, filterable, paginated tables with TanStack Table
- ✅ **Toast Notifications** - User feedback with Sonner
- ✅ **Cache Management** - Automatic revalidation and cache invalidation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17 or higher) - [Download Node.js](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download PostgreSQL](https://www.postgresql.org/download/)
- **npm** or **pnpm** or **yarn** (comes with Node.js)
- **Git** - [Download Git](https://git-scm.com/downloads)

## 🛠️ Technology Stack

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **Next.js** | 14+ | React Framework | [Next.js Docs](https://nextjs.org/docs) |
| **Prisma** | Latest | ORM for Database | [Prisma Docs](https://www.prisma.io/docs) |
| **PostgreSQL** | 12+ | Database | [PostgreSQL Docs](https://www.postgresql.org/docs/) |
| **TypeScript** | 5+ | Type Safety | [TypeScript Docs](https://www.typescriptlang.org/docs/) |
| **Tailwind CSS** | 3+ | Styling | [Tailwind Docs](https://tailwindcss.com/docs) |
| **Shadcn/ui** | Latest | UI Components | [Shadcn/ui Docs](https://ui.shadcn.com/) |
| **Zod** | Latest | Validation | [Zod Docs](https://zod.dev/) |

## 📦 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder-name>
```

### Step 2: Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install
```

### Step 3: Set Up PostgreSQL Database

#### Option A: Local PostgreSQL Installation

1. **Install PostgreSQL** from [official website](https://www.postgresql.org/download/)
2. **Create a new database**:

```sql
-- Open PostgreSQL shell (psql) and run:
CREATE DATABASE your_database_name;
```

3. **Note your database credentials**:
   - Host: `localhost`
   - Port: `5432` (default)
   - Username: `postgres` (default) or your username
   - Password: Your PostgreSQL password
   - Database: `your_database_name`

#### Option B: Using Docker (Recommended for Development)

```bash
# Pull and run PostgreSQL container
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=your_database_name \
  -p 5432:5432 \
  -d postgres:15
```

#### Option C: Cloud Database Services

- **Neon** (Free tier): [neon.tech](https://neon.tech/) - Serverless PostgreSQL
- **Supabase** (Free tier): [supabase.com](https://supabase.com/) - PostgreSQL with extras
- **Railway**: [railway.app](https://railway.app/) - Simple deployment
- **Render**: [render.com](https://render.com/) - Free PostgreSQL database

### Step 4: Configure Environment Variables

1. **Create `.env` file** in the root directory:

```bash
touch .env
```

2. **Add your database connection string**:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

# For cloud databases, use the connection string provided:
# DATABASE_URL="postgresql://user:pass@host.region.provider.com:5432/dbname"

# Environment
NODE_ENV="development"
```

**Connection String Format:**
```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
```

**Example:**
```env
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/myapp_dev?schema=public"
```

### Step 5: Set Up Prisma

#### Initialize Prisma (if not already set up)

```bash
npx prisma init
```

#### Create Database Schema

Your `prisma/schema.prisma` should look like this:



#### Run Database Migration

```bash
# Generate Prisma Client and create database tables
npx prisma migrate dev --name init

# This command will:
# 1. Create migration files
# 2. Apply migrations to your database
# 3. Generate Prisma Client
```

#### Optional: Seed Database with Sample Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Bob Johnson', email: 'bob@example.com' },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Run seed:

```bash
npx prisma db seed
```

### Step 6: Run the Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
project-root/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Migration history
├── src/
│   └── app/
│       ├── actions.ts         # Server Actions (CRUD operations)
│       ├── page.tsx           # Home page (Create User)
│       ├── components/
│       │   ├── user-form.tsx           # Create user form
│       │   └── edit-user-form.tsx      # Edit user form
│       ├── lib/
│       │   └── prisma.ts      # Prisma client singleton
│       ├── schemas/
│       │   └── user.ts        # Zod validation schemas
│       └── users/
│           ├── page.tsx                # Users list (Server Component)
│           ├── users-table-client.tsx  # Interactive table (Client Component)
│           └── edit/
│               └── [id]/
│                   └── page.tsx        # Edit user page
├── .env                       # Environment variables (DO NOT COMMIT)
├── .env.example               # Example env file (safe to commit)
├── package.json
└── tsconfig.json
```

## 🔧 Useful Prisma Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name description_of_change

# Apply migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

## 🎯 Available Features

### 1. Create User
- Navigate to `/` (home page)
- Fill in name and email
- Submit form
- See success notification

### 2. View All Users
- Navigate to `/users`
- See sortable, filterable table
- Search by email
- Paginated results

### 3. Edit User
- Click "Actions" dropdown on any user
- Select "Edit"
- Modify details
- Save changes

### 4. Delete User
- Click "Actions" dropdown
- Select "Delete"
- Confirm deletion
- User removed instantly

## 🐛 Troubleshooting

### Database Connection Issues

**Error: `Can't reach database server`**
- Verify PostgreSQL is running: `pg_isready`
- Check connection string in `.env`
- Ensure database exists
- Verify credentials

**Error: `Authentication failed`**
- Double-check username and password
- Ensure user has database permissions

### Prisma Issues

**Error: `Prisma Client not generated`**
```bash
npx prisma generate
```

**Error: `Migration failed`**
```bash
# Reset and rerun
npx prisma migrate reset
npx prisma migrate dev
```

```

## 📄 License

This project is open-source and available under the MIT License.

## 🆘 Need Help?

- **Next.js Discord**: [discord.gg/nextjs](https://discord.gg/nextjs)
- **Prisma Discord**: [pris.ly/discord](https://pris.ly/discord)
- **Stack Overflow**: Tag your questions with `next.js` and `prisma`
- **GitHub Issues**: Report bugs or request features

---

**Happy Coding! 🚀**

Built with ❤️ using Next.js 14, Prisma, and PostgreSQL
