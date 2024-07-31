import "../errors/index.js";
import { UnauthorizedError } from "../errors/index.js";

export const checkPermissions = (requestUser, resourceUserId) => {
  // if an admin is requesting the information of another user, allow it
  if (requestUser.role === "admin") return;

  // if the original user is requesting their own information, allow it
  if (requestUser.userId === resourceUserId) return;

  // if another user is requesting the information, raise an error
  throw new UnauthorizedError("Access denied");
};
