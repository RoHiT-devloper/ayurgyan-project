package com.ayurgyan.model.dto;

import com.ayurgyan.model.EvidenceLevel;

public class MedicinalUseDTO {
    private Long id;
    private String condition;
    private String preparation;
    private String dosage;
    private String duration;
    private EvidenceLevel evidenceLevel;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getPreparation() { return preparation; }
    public void setPreparation(String preparation) { this.preparation = preparation; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public EvidenceLevel getEvidenceLevel() { return evidenceLevel; }
    public void setEvidenceLevel(EvidenceLevel evidenceLevel) { this.evidenceLevel = evidenceLevel; }
}