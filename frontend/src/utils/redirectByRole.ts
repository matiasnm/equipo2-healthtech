import type { User } from "../types/user.types";

export const redirectByRole = (role: User["role"]) => {
  switch (role) {
    case "ADMIN":
    case "PRACTITIONER":
      return "/dashboard";
    case "PATIENT":
      return "/practitioners";
    default:
      return "/";
  }
};
