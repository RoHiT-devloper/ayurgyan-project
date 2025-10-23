package com.ayurgyan.model.dto;

import com.ayurgyan.model.SafetyLevel;
import java.time.LocalDateTime;
import java.util.List;


public class HerbDTO {
    private Long id;
    private String name;
    private String scientificName;
    private String description;
    private SafetyLevel safetyLevel; // Now this will work
    private String imageUrl;
    private String traditionalUses;
    private String activeCompounds;
    private String contraindications;
    private String sideEffects;
    private List<MedicinalUseDTO> medicinalUses; // Make sure MedicinalUseDTO exists
    private List<ScientificStudyDTO> scientificStudies; // Make sure ScientificStudyDTO exists
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public HerbDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public SafetyLevel getSafetyLevel() { return safetyLevel; }
    public void setSafetyLevel(SafetyLevel safetyLevel) { this.safetyLevel = safetyLevel; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getTraditionalUses() { return traditionalUses; }
    public void setTraditionalUses(String traditionalUses) { this.traditionalUses = traditionalUses; }

    public String getActiveCompounds() { return activeCompounds; }
    public void setActiveCompounds(String activeCompounds) { this.activeCompounds = activeCompounds; }

    public String getContraindications() { return contraindications; }
    public void setContraindications(String contraindications) { this.contraindications = contraindications; }

    public String getSideEffects() { return sideEffects; }
    public void setSideEffects(String sideEffects) { this.sideEffects = sideEffects; }

    public List<MedicinalUseDTO> getMedicinalUses() { return medicinalUses; }
    public void setMedicinalUses(List<MedicinalUseDTO> medicinalUses) { this.medicinalUses = medicinalUses; }

    public List<ScientificStudyDTO> getScientificStudies() { return scientificStudies; }
    public void setScientificStudies(List<ScientificStudyDTO> scientificStudies) { this.scientificStudies = scientificStudies; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}