import { IAuthorizationService, IUser } from "@/types/auth.types";

/**
 * Authorization service implementing ISP - only handles authorization logic
 * Follows Open/Closed principle - extensible for new roles and permissions
 */
export class RoleBasedAuthorizationService implements IAuthorizationService {
  private readonly roleHierarchy: Record<string, string[]> = {
    admin: ["admin", "user"],
    user: ["user"],
  };

  private readonly resourcePermissions: Record<string, string[]> = {
    "/admin": ["admin"],
    "/user": ["user", "admin"],
    "/": [], // Public route
  };

  canAccess(resource: string, user?: IUser): boolean {
    // Public routes are accessible to everyone
    const requiredRoles = this.resourcePermissions[resource];
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Protected routes require authentication
    if (!user) {
      return false;
    }

    return requiredRoles.some((role) => this.hasRole(role, user));
  }

  hasRole(role: string, user?: IUser): boolean {
    if (!user) {
      return false;
    }

    const userRole = user.role || "user";
    const allowedRoles = this.roleHierarchy[userRole] || [];

    return allowedRoles.includes(role);
  }

  /**
   * Extensible method to add new roles (Open/Closed Principle)
   */
  addRole(role: string, inheritedRoles: string[]): void {
    this.roleHierarchy[role] = inheritedRoles;
  }

  /**
   * Extensible method to add resource permissions (Open/Closed Principle)
   */
  addResourcePermission(resource: string, roles: string[]): void {
    this.resourcePermissions[resource] = roles;
  }
}

// Singleton instance for dependency injection
export const authorizationService = new RoleBasedAuthorizationService();

