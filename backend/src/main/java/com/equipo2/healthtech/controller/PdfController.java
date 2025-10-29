package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.service.PdfService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pdf")
@SecurityRequirement(name = "bearer-key")
@Tag(name = "9\uFE0F⃣ Pdf")
@AllArgsConstructor
public class PdfController {

    private final PdfService pdfService;

    @GetMapping("/patients/{id}/encounters/{encounterId}/summary")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> getEncounterSummaryPdf(@PathVariable Long id, @PathVariable Long encounterId) {
        byte[] pdf = pdfService.generateEncounterSummary(id, encounterId);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=encounter-summary.pdf")
                .body(pdf);
    }

}