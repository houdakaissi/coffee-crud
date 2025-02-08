# Nuxt + Prisma + PostgreSQL Starter

This project is a **Nuxt 3** application with a **PostgreSQL** database managed via **Prisma ORM**. It includes a backend service for database operations and a frontend built with Nuxt.

---

## 🚀 Setup

### 1. Clone the Repository
```bash
git clone https://github.com/BakrAsskali/Coffee-CRUD.git
cd Coffee-CRUD
```

### 2. Install Dependencies
Use your preferred package manager:
```bash
# npm
tnpm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 3. Configure Environment Variables
Create a `.env` file inside the `backend` folder and configure your **PostgreSQL** database connection:
```ini
DATABASE_URL="postgresql://admin:admin@localhost:5432/coffee_db"
```

---

## 🏗️ Running the Project

### 1. Start PostgreSQL with Docker
Ensure **Docker** is installed, then start the database:
```bash
cd backend/
docker-compose up -d
```

### 2. Migrate the Database
Apply the Prisma schema to the PostgreSQL database:
```bash
npx prisma migrate dev --name init
```

### 3. Seed the Database
Populate the database with initial data:
```bash
node seed.ts
```

### 4. Start the Backend Server
Navigate to the `backend` folder and run:
```bash
bun run index.ts
```
This starts the **API server** at `http://localhost:3001`.

### 5. Start the Nuxt Frontend
Navigate to the root folder and start Nuxt:
```bash
npm run dev
```
This starts the **frontend** at `http://localhost:3000`.


## 🛠️ Technologies Used
- **Nuxt 3** (Vue.js framework)
- **Prisma** (ORM for PostgreSQL)
- **PostgreSQL** (Database)
- **Docker** (Database containerization)
- **Bun/npm** (Package managers)

---

## 📄 License
This project is licensed under the MIT License.

