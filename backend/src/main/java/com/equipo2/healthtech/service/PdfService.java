package com.equipo2.healthtech.service;

import java.util.Map;

public interface PdfService {
    //byte[] generatePdf(Map<String, Object> data);
    byte[] generateEncounterSummary(Long patientId, Long encounterId) ;
}