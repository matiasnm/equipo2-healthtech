import { useQuery } from "@tanstack/react-query";
import {PractitionerSummary, practitionersResponseSchema } from "../schemas/practitioner.schema";
import privateAPI from "../services/api/privateAPI";

const fetchPractitioners = async (): Promise<PractitionerSummary[]> => {
  const res = await privateAPI.get("/api/v1/practitioners/list");
  const parsed = practitionersResponseSchema.parse(res.data);
  return parsed.data; 
};

export const usePractitioners = () => {
  const query = useQuery<PractitionerSummary[]>({
    queryKey: ["practitioners"],
    queryFn: fetchPractitioners,
  });

  const getSpecialty = (practitioner: PractitionerSummary) => {
    return practitioner.practitionerRole?.specialityCode?.display ?? "Sin especialidad";
  };

  return {
    ...query,
    fetchPractitioners: query.refetch,
    getSpecialty,
  };
};
