package com.equipo2.healthtech.dto.practitioner;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

public record PractitionerWeeklyScheduleDto(
        PractitionerReadSummaryResponseDto practitionerInfo,
        Map<DayOfWeek, List<TimeRangeReadDto>> occupiedTimeSlots
) { }