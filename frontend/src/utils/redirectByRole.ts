import type { User } from "../types/user.types";

export const redirectByRole = (role: User["role"]) => {
  switch (role) {
    case "ADMIN":
      return "/dashboard";
    case "PRACTITIONER":
      return "/appointments";
    case "PATIENT":
      return "/practitioners";
    default:
      return "/";
  }
};
