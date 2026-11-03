# BudgetFlow React

BudgetFlow React is a full-stack personal budgeting application built with a .NET API and a React + Vite frontend. It supports user authentication, category management, transaction tracking, and a simple dashboard for budget visibility.

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Backend: ASP.NET Core Web API
- Database: SQLite
- Authentication: ASP.NET Core Identity + JWT
- Styling: Custom React components and CSS-based layout

## Project Structure

- `BudgetFlow.Api/` – ASP.NET Core backend
  - `Controllers/` – API endpoints for auth, categories, and transactions
  - `Data/` – Entity Framework database context
  - `Models/` – Domain models
  - `Dtos/` – Request/response DTOs
  - `Services/` – JWT token service
- `budgetapp.client/` – React frontend
  - `src/` – application pages, components, services, and auth logic
  - `package.json` – frontend scripts and dependencies

## Features

- User registration and login
- JWT-based authentication
- Create, update, and delete categories
- Create and delete transactions
- Budget dashboard and transaction overview
- CORS-enabled frontend to backend communication

## Prerequisites

Before running the project, make sure you have:

- .NET SDK 10.0 or later
- Node.js 20+ and npm
- A browser for the frontend UI

## Backend Setup

From the project root:

```bash
dotnet restore
cd BudgetFlow.Api
dotnet run
```

The API will run using the launch profile in `BudgetFlow.Api/Properties/launchSettings.json` and default to:

- HTTPS: `https://localhost:7123`
- HTTP: `http://localhost:5268`

Swagger is enabled in development mode at:

- `https://localhost:7123/swagger`

## Frontend Setup

Open a second terminal and run:

```bash
cd budgetapp.client
npm install
npm run dev
```

The frontend dev server typically runs at:

- `http://localhost:5173`

The client expects the API base URL from the environment variable:

```env
VITE_API_BASE_URL=https://localhost:7123/api
```

This value is already set in `budgetapp.client/.env`.

## Running the Full App

1. Start the backend with `dotnet run` in `BudgetFlow.Api`.
2. Start the frontend with `npm run dev` in `budgetapp.client`.
3. Open the frontend URL in the browser.

## Notes

- The project uses SQLite as the local database file (`BudgetFlow.Api/budgetflow.db`).
- Authentication routes are exposed through `AuthController`.
- Category and transaction endpoints are protected by `[Authorize]` attributes.
- The frontend routes are configured for a dashboard, transactions page, categories page, plus login and register screens.

## Useful Commands

Backend:

```bash
dotnet build
```

Frontend:

```bash
npm run build
npm run lint
```

## License

This project is provided as a learning/demo application and does not include a formal license file unless added later.
