package com.equipo2.healthtech.model.encounter;

import lombok.Getter;

@Getter
public enum EncounterClass {
    IMP("IMP", "Inpatient Encounter",
            "A patient encounter where the patient is admitted to a hospital for overnight stay."),
    AMB("AMB", "Ambulatory",
            "Outpatient encounter where the patient visits a facility but is not admitted."),
    OBSENC("OBSENC", "Observation Encounter",
            "Encounter for observation and short-term monitoring, often 24–48h."),
    EMER("EMER", "Emergency",
            "Emergency encounter for immediate evaluation and treatment."),
    VR("VR", "Virtual",
            "Encounter conducted remotely, e.g., via telehealth or video."),
    HH("HH", "Home Health",
            "Healthcare encounter at the patient’s residence.");

    private final String code;
    private final String display;
    private final String definition;

    EncounterClass(String code, String display, String definition) {
        this.code = code;
        this.display = display;
        this.definition = definition;
    }

    public static EncounterClass fromCode(String code) {
        for (EncounterClass c : values()) {
            if (c.code.equalsIgnoreCase(code)) return c;
        }
        throw new IllegalArgumentException("Unknown EncounterClass code: " + code);
    }
}