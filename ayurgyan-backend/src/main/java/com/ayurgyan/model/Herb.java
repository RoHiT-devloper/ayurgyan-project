package com.ayurgyan.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "herbs")
public class Herb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Herb name is required")
    @Column(unique = true, nullable = false)
    private String name;

    @Column(name = "scientific_name")
    private String scientificName;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "safety_level")
    @Enumerated(EnumType.STRING)
    private SafetyLevel safetyLevel;
    

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "traditional_uses", columnDefinition = "TEXT")
    private String traditionalUses;

    @Column(name = "active_compounds")
    private String activeCompounds;

    @Column(name = "contraindications", columnDefinition = "TEXT")
    private String contraindications;

    @Column(name = "side_effects", columnDefinition = "TEXT")
    private String sideEffects;

    @OneToMany(mappedBy = "herb", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MedicinalUse> medicinalUses = new ArrayList<>();

    @OneToMany(mappedBy = "herb", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ScientificStudy> scientificStudies = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Herb() {}

    public Herb(String name, String scientificName, String description, SafetyLevel safetyLevel) {
        this.name = name;
        this.scientificName = scientificName;
        this.description = description;
        this.safetyLevel = safetyLevel;
    }

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

    public List<MedicinalUse> getMedicinalUses() { return medicinalUses; }
    public void setMedicinalUses(List<MedicinalUse> medicinalUses) { this.medicinalUses = medicinalUses; }

    public List<ScientificStudy> getScientificStudies() { return scientificStudies; }
    public void setScientificStudies(List<ScientificStudy> scientificStudies) { this.scientificStudies = scientificStudies; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
