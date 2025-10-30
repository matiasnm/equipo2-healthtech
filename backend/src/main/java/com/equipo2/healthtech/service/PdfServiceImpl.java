package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.appointment.AppointmentReadDetailResponseDto;
import com.equipo2.healthtech.dto.clinic.ClinicReadResponseDto;
import com.equipo2.healthtech.dto.encounter.EncounterReadResponseDto;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PdfServiceImpl implements PdfService {

    private final EncounterService encounterService;
    private final AppointmentService appointmentService;
    private final ClinicService metadataService;
    private final UserService userService;

    public byte[] generatePdf(Long patientId, Long encounterId) {
        EncounterReadResponseDto encounterDto = encounterService.read(encounterId);
        AppointmentReadDetailResponseDto appointmentDto = appointmentService.read(encounterDto.appointmentId());

        LocalDate appointmentDate = appointmentDto.startTime().toLocalDate();

        ClinicReadResponseDto metadataDto = metadataService.read(1L);
        String clinicData = metadataDto.legalName() + " - " + metadataDto.address() + "\n" +
                metadataDto.secretaryEmail() + " - " + metadataDto.secretaryPhone();

        String practitionersInfo = appointmentDto.practitioners().stream()
                .map(p -> String.format(
                        "%s - %s (%s)",
                        p.userProfile().fullName(),
                        p.practitionerRole().specialityCode().display(),
                        p.practitionerRole().roleCode().display()
                ))
                .collect(Collectors.joining("\n"));

        // office and remote?officeCode=A1, remote=true], practitionerRole=null
        // general practitioner ! ARMAR patient DTO!

        String office = appointmentDto.teleconsultationUrl();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter.getInstance(document, baos);
        document.open();

        try {
            String fontPath = "src/main/resources/fonts/DejaVuSans.ttf";
            BaseFont unicodeBaseFont = BaseFont.createFont(fontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font unicodeFont = new Font(unicodeBaseFont, 12);
            Font unicodeFontBold = new Font(unicodeBaseFont, 16, Font.BOLD);

            document.addTitle("Encounter Summary");
            document.add(new Paragraph("⚕ Encounter Summary", unicodeFontBold));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph(clinicData));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Appointment date: " + appointmentDate, unicodeFont));
            document.add(new Paragraph("Appointment status: " + appointmentDto.status(), unicodeFont));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Patient: " + appointmentDto.patientProfile().fullName(), unicodeFont));
            //document.add(new Paragraph("General Practitioner: " + appointmentDto.patientProfile(), unicodeFont));
            document.add(new Paragraph("Practitioners:\n" + practitionersInfo, unicodeFont));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Encounter Class: " + encounterDto.encounterClass(), unicodeFont));
            document.add(new Paragraph("Encounter Status: " + encounterDto.encounterStatus(), unicodeFont));
            document.add(new Paragraph("Encounter Reason: " + encounterDto.reason().display(), unicodeFont));
            document.add(new Paragraph("Encounter Diagnosis: " + encounterDto.diagnosis().display(), unicodeFont));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Notes: " + encounterDto.notes(), unicodeFont));


        } catch (Exception e) {
            log.error("Error loading Unicode font for PDF", e);
        }
        document.close();
        return baos.toByteArray();
    }

    public byte[] generateEncounterSummary(Long patientId, Long encounterId) {
        return generatePdf(patientId, encounterId);
    }
}