import type { CodeDescriptor } from './Common.types';

export type PractitionerProfile = {
  id: number;
  fullName: string;
  gender: string;
  phone: string;
  address: string;
  birthday: string;
};

export type PractitionerRole = {
  roleCode: CodeDescriptor;
  specialityCode: CodeDescriptor;
};

export type PractitionerDetail = {
  id: number;
  userProfile: PractitionerProfile;
  practitionerProfile: {
    experience: number;
    studies: string;
    officeCode: string;
    remote: boolean;
  };
  practitionerRole: PractitionerRole;
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





