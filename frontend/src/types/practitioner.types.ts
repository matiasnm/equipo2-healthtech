
export type PractitionerProfile = {
  id: number;
  fullName: string;
  gender: string;
  phone: string;
  address: string;
  birthday: string;
};

export type CodeDescriptor = {
  system: string;
  code: string;
  display: string;
  definition: string;
};

export type PractitionerRole = {
  roleCode: CodeDescriptor;
  specialityCode: CodeDescriptor;
};

export type PractitionerSummary = {
  id: number;
  practitionerProfile: PractitionerProfile;
  practitionerRole: PractitionerRole;
};

export type PractitionerRoleCreatePayload = {
  roleCodeId: number;
  specialityCodeId: number;
};




