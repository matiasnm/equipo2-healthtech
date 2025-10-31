import privateAPI from "./api/privateAPI";

export const getPractitionerWeeklyAvailability = async (practitionerId: number) => {
  const res = await privateAPI.get(`/api/v1/appointments/available-practitioners/weekly/${practitionerId}`);
  return res.data;
};
