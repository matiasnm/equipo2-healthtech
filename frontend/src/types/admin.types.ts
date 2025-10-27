
export type IdentifierPayload = {
  system: string;
  value: string;
  type: 'NATIONAL_ID' | 'PASSPORT' | 'DRIVER_LICENSE' | 'HEALTH_CARD' | 'OTHER';
};

export type UpdateUserStatusPayload = {
  status: boolean;
};
