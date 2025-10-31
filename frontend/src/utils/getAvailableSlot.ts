import { parseISO, format, addMinutes, isBefore } from "date-fns";

type TimeSlot = {
  startTime: string;
  endTime: string;
};

type OccupiedMap = Record<string, TimeSlot[]>;

type WorkingHoursMap = Record<string, { start: string; end: string }>;

export const getAvailableSlots = (
  occupied: OccupiedMap,
  workingHours: WorkingHoursMap,
  slotDuration = 30
): Record<string, string[]> => {
  const result: Record<string, string[]> = {};

  for (const day of Object.keys(workingHours)) {
    const config = workingHours[day];
    if (!config || !config.start || !config.end) continue;

    const { start, end } = config;
    const slots: string[] = [];

    const baseDate = day; // formato esperado: YYYY-MM-DD
    let current = parseISO(`${baseDate}T${start}:00-03:00`);
    const endTime = parseISO(`${baseDate}T${end}:00-03:00`);

    const occupiedRanges = (occupied[day] ?? []).map((b) => ({
      start: parseISO(b.startTime),
      end: parseISO(b.endTime),
    }));

    while (isBefore(addMinutes(current, slotDuration), endTime)) {
      const slotStart = current;
      const slotEnd = addMinutes(current, slotDuration);

      const overlaps = occupiedRanges.some(
        (r) => !(slotEnd <= r.start || slotStart >= r.end)
      );

      if (!overlaps) {
        slots.push(format(slotStart, "HH:mm"));
      }

      current = slotEnd;
    }

    result[day] = slots;
  }

  return result;
};
