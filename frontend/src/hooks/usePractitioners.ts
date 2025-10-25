
import { useQuery } from "@tanstack/react-query";
import { getPractitioners } from "../services/practitioners";
import type { PractitionerSummary } from "../types/practitioner.types";

export const usePractitioners = () => {
  return useQuery<PractitionerSummary[]>({
    queryKey: ["practitioners"],
    queryFn: getPractitioners,
  });
};
