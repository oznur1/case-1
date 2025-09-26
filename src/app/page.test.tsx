import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/config/auth.config", () => ({
  authConfig: {},
}));

jest.mock("@/components/AuthButton", () => () => <div>Mock AuthButton</div>);

// Mock Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders welcome message for authenticated users", async () => {
    const { getServerSession } = require("next-auth");
    getServerSession.mockResolvedValueOnce({
      user: { name: "Test User", role: "admin" },
    });

    const page = await HomePage();
    render(page);

    expect(screen.getByText(/hoş geldin, test user!/i)).toBeInTheDocument();
    expect(screen.getByText(/role: admin/i)).toBeInTheDocument();
    expect(screen.getByText(/admin sayfasına git/i)).toBeInTheDocument();
    expect(screen.getByText(/mock authbutton/i)).toBeInTheDocument();
  });

  it("renders sign-in prompt for unauthenticated users", async () => {
    const { getServerSession } = require("next-auth");
    getServerSession.mockResolvedValueOnce(null);

    const page = await HomePage();
    render(page);

    expect(screen.getByText(/güvenli kimlik doğrulama sistemi/i)).toBeInTheDocument();
    expect(screen.getByText(/auth0 ile giriş yaparak/i)).toBeInTheDocument();
    expect(screen.getByText(/mock authbutton/i)).toBeInTheDocument();
    expect(screen.queryByText(/admin sayfasına git/i)).not.toBeInTheDocument();
  });

  it("renders application title and tech stack info", async () => {
    const { getServerSession } = require("next-auth");
    getServerSession.mockResolvedValueOnce(null);

    const page = await HomePage();
    render(page);

    expect(screen.getByText(/auth0 \+ next\.js demo/i)).toBeInTheDocument();
    expect(screen.getByText(/next\.js 15 \+ nextauth\.js \+ auth0 \+ solid principles/i)).toBeInTheDocument();
  });
});
