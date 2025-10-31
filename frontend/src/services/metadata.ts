import privateAPI from "./api/privateAPI";

export type ClinicMetadata = {
  clinic: {
    id: number;
    secretaryPhone?: string;
    secretaryEmail?: string;
    administrationPhone?: string;
    administrationEmail?: string;
    businessName?: string;
    legalName?: string;
    taxId?: string;
    fiscalId?: string;
    address?: string;
    province?: string;
    country?: string;
  };
  roles: string[];
  identifierTypes: string[];
  relatedPersonTypes: string[];
  mediaTypes: string[];
  encounterStatuses: string[];
  encounterClasses: string[];
  appointmentPriority: string[];
  appointmentStatuses: string[];
  appointmentChannels: string[];
  transactionTypes: string[];
};

// Exportar la función que trae metadata
export const getClinicMetadata = async (): Promise<ClinicMetadata> => {
  const { data } = await privateAPI.get("/api/v1/metadata");
  return data;
};
