import { User } from "@prisma/client";
import { Request } from "express";

/**
 * If the user property exists on the request object, return it, otherwise return null.
 * @param req - Request & { user?: User }
 * @returns A function that takes a request and returns a user or null.
 */
export function getUser(req: Request & { user?: User }): User | null {
  if (!req.user) {
    return null;
  }
  return req.user;
}
