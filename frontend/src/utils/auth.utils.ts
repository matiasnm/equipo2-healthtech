
export const inferRoleFromEmail = (email: string): "admin" | "practitioner" | "patient" => {
  if (!email) return "patient";

  const normalized = email.trim().toLowerCase();

  if (normalized.endsWith("admin@ht.com") || normalized.endsWith("support@ht.com")) {
    return "admin";
  }

  if (normalized.endsWith("@ht.com")) {
    return "practitioner";
  }

  return "patient";

};

