# 🔐 Next.js Auth0 Authentication Demo

**Modern, secure authentication system built with Next.js 15, NextAuth.js, and Auth0**

A comprehensive authentication and authorization demo showcasing JWT-based session management, role-based access control, and middleware protection following SOLID principles and 12-Factor App methodology.

## ✨ Features

- 🔑 **OAuth Authentication** - Secure login via Auth0
- 🛡️ **JWT Session Management** - Token-based authentication
- 🚧 **Route Protection** - Middleware-based access control
- 👥 **Role-Based Authorization** - Admin and user roles
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🧪 **Test Coverage** - Comprehensive unit and integration tests
- 🏗️ **SOLID Principles** - Clean, maintainable architecture
- ⚙️ **12-Factor App** - Environment-based configuration

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Auth0 Account](https://auth0.com/) (free tier available)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd next-auth0-authentication
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration:**

   Create a `.env.local` file in the project root:

   ```env
   # Auth0 Configuration
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_CLIENT_SECRET=your_auth0_client_secret
   AUTH0_ISSUER=https://your-domain.auth0.com

   # NextAuth Configuration
   NEXTAUTH_SECRET=your_generated_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

   Generate a secure secret:

   ```bash
   openssl rand -base64 32
   ```

4. **Start Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Demo Credentials

For testing purposes, use these admin credentials:

**Admin User:**

- **Email:** `admin@example.com`
- **Password:** `Admin123!`

> **Note:** These credentials should be configured in your Auth0 dashboard for testing. In production, use proper user management through Auth0.

## 📱 Application Structure

### Pages & Routes

| Route         | Access Level | Description                          |
| ------------- | ------------ | ------------------------------------ |
| `/`           | Public       | Home page with authentication status |
| `/admin`      | Admin Only   | Protected admin dashboard            |
| `/api/auth/*` | Public       | NextAuth.js API routes               |

### Key Components

- **`AuthButton`** - Smart authentication toggle component
- **`ProtectedRoute`** - HOC for route protection
- **`SessionProvider`** - Context provider for auth state
- **`useAuth`** - Custom hook for authentication logic
- **`useAuthorization`** - Custom hook for role-based access

### Architecture

```
src/
├── app/                    # Next.js 15 App Router
│   ├── admin/             # Protected admin pages
│   ├── api/auth/          # NextAuth.js API routes
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
├── config/               # Configuration files
├── hooks/                # Custom React hooks
├── services/             # Business logic services
└── types/                # TypeScript type definitions
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
```

### Testing

The project includes comprehensive test coverage:

- **Unit Tests** - Component and service testing
- **Integration Tests** - Authentication flow testing
- **Setup** - Jest with React Testing Library

Run tests:

```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
```

## 🔧 Configuration

### Auth0 Setup

1. **Create Auth0 Application:**

   - Go to [Auth0 Dashboard](https://manage.auth0.com/)
   - Create a new "Regular Web Application"
   - Note your Domain, Client ID, and Client Secret

2. **Configure Callback URLs:**

   ```
   Allowed Callback URLs: http://localhost:3000/api/auth/callback/auth0
   Allowed Logout URLs: http://localhost:3000
   Allowed Web Origins: http://localhost:3000
   ```

3. **Set User Roles (Optional):**
   - Create roles in Auth0: `admin`, `user`
   - Assign roles to users via Auth0 dashboard
   - Configure role claims in Auth0 rules/actions

### Environment Variables

| Variable              | Description                     | Required |
| --------------------- | ------------------------------- | -------- |
| `AUTH0_CLIENT_ID`     | Auth0 application client ID     | ✅       |
| `AUTH0_CLIENT_SECRET` | Auth0 application client secret | ✅       |
| `AUTH0_ISSUER`        | Auth0 domain URL                | ✅       |
| `NEXTAUTH_SECRET`     | JWT signing secret              | ✅       |
| `NEXTAUTH_URL`        | Application base URL            | ✅       |

## 🔒 Security Features

- **CSRF Protection** - Built-in NextAuth.js protection
- **Secure Sessions** - JWT with secure httpOnly cookies
- **Route Middleware** - Server-side route protection
- **Role Validation** - Client and server-side authorization
- **Environment Isolation** - Secure credential management

## 🏗️ Architecture Principles

### SOLID Principles Implementation

- **S**ingle Responsibility: Each component has one clear purpose
- **O**pen/Closed: Extensible through interfaces and abstractions
- **L**iskov Substitution: Consistent component interfaces
- **I**nterface Segregation: Focused, minimal interfaces
- **D**ependency Inversion: Dependency injection patterns

### 12-Factor App Compliance

- ✅ **Codebase** - Single codebase, multiple deploys
- ✅ **Dependencies** - Explicit dependency declaration
- ✅ **Config** - Environment-based configuration
- ✅ **Backing Services** - Auth0 as attached resource
- ✅ **Build/Release/Run** - Strict separation of stages
- ✅ **Processes** - Stateless, share-nothing processes
- ✅ **Port Binding** - Self-contained service export
- ✅ **Concurrency** - Horizontal scaling support
- ✅ **Disposability** - Fast startup and graceful shutdown
- ✅ **Dev/Prod Parity** - Environment consistency
- ✅ **Logs** - Event stream logging
- ✅ **Admin Processes** - One-off administrative tasks

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel:**

   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Configure Environment Variables:**
   - Add all environment variables in Vercel dashboard
   - Update `NEXTAUTH_URL` to your production domain
   - Update Auth0 callback URLs

### Docker

```dockerfile
# Dockerfile included for containerized deployment
docker build -t next-auth-app .
docker run -p 3000:3000 next-auth-app
```

## 🧪 Testing Guide

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

### Test Structure

- **Components**: UI component testing
- **Hooks**: Custom hook behavior testing
- **Services**: Business logic testing
- **Integration**: Authentication flow testing

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js
- **[Auth0](https://auth0.com/)** - Identity and access management
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[React Testing Library](https://testing-library.com/react)** - React testing utilities

## 📞 Support

For support and questions:

- 📧 Create an issue in this repository
- 📖 Check [NextAuth.js Documentation](https://next-auth.js.org/)
- 🔗 Review [Auth0 Documentation](https://auth0.com/docs)

---

**Made with ❤️ using modern web technologies**
# case-1
