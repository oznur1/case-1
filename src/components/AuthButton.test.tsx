import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthButton from "./AuthButton";

// Mock the custom hook following DIP
jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "@/hooks/useAuth";

const mockUseAuth = useAuth as jest.Mock;

describe("AuthButton", () => {
  const mockSignIn = jest.fn();
  const mockSignOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Shows loading state when auth is loading", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      signIn: mockSignIn,
      signOut: mockSignOut,
    });

    render(<AuthButton />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("Shows sign in button and calls signIn when not authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      signIn: mockSignIn,
      signOut: mockSignOut,
    });

    render(<AuthButton />);
    const button = screen.getByText(/sign in with auth0/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockSignIn).toHaveBeenCalledWith("auth0");
  });

  it("Shows sign out button and calls signOut when authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      signIn: mockSignIn,
      signOut: mockSignOut,
    });

    render(<AuthButton />);
    const button = screen.getByText(/çıkış yap/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("Accepts custom className and text props", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      signIn: mockSignIn,
      signOut: mockSignOut,
    });

    render(<AuthButton className="custom-class" signInText="Custom Sign In" signOutText="Custom Sign Out" />);

    const button = screen.getByText("Custom Sign In");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-class");
  });
});
