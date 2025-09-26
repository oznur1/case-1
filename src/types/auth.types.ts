// Auth-related type definitions
export interface IUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export interface ISession {
  user: IUser;
  expires: string;
}

export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface IAuthActions {
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp?: (provider?: string) => Promise<void>;
}

export interface IAuthHook extends IAuthState, IAuthActions {}

export interface IAuthenticationService {
  signIn(provider: string): Promise<void>;
  signOut(): Promise<void>;
  signUp?(provider: string): Promise<void>;
}

export interface ISessionService {
  getSession(): ISession | null;
  isAuthenticated(): boolean;
}

export interface IAuthorizationService {
  canAccess(resource: string, user?: IUser): boolean;
  hasRole(role: string, user?: IUser): boolean;
}

