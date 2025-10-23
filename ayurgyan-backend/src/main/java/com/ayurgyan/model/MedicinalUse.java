package com.ayurgyan.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "medicinal_uses")
public class MedicinalUse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String condition;

    @Column(columnDefinition = "TEXT")
    private String preparation;

    private String dosage;
    private String duration;

    @Column(name = "evidence_level")
    @Enumerated(EnumType.STRING)
    private EvidenceLevel evidenceLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "herb_id")
    @JsonBackReference
    private Herb herb;

    // Constructors
    public MedicinalUse() {}

    public MedicinalUse(String condition, String preparation, String dosage, EvidenceLevel evidenceLevel) {
        this.condition = condition;
        this.preparation = preparation;
        this.dosage = dosage;
        this.evidenceLevel = evidenceLevel;
    }

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

    public Herb getHerb() { return herb; }
    public void setHerb(Herb herb) { this.herb = herb; }
}
