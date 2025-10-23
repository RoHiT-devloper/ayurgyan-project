package com.ayurgyan.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.Year;

@Entity
@Table(name = "scientific_studies")
public class ScientificStudy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String authors;
    private String journal;

    @Column(name = "publication_year")
    private Integer publicationYear;

    private String doi;

    @Column(name = "study_type")
    private String studyType;

    @Column(name = "evidence_strength")
    @Enumerated(EnumType.STRING)
    private EvidenceStrength evidenceStrength;

    @Column(columnDefinition = "TEXT")
    private String findings;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "herb_id")
    @JsonBackReference
    private Herb herb;

    // Constructors
    public ScientificStudy() {}

    public ScientificStudy(String title, String authors, String journal, Integer publicationYear) {
        this.title = title;
        this.authors = authors;
        this.journal = journal;
        this.publicationYear = publicationYear;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthors() { return authors; }
    public void setAuthors(String authors) { this.authors = authors; }

    public String getJournal() { return journal; }
    public void setJournal(String journal) { this.journal = journal; }

    public Integer getPublicationYear() { return publicationYear; }
    public void setPublicationYear(Integer publicationYear) { this.publicationYear = publicationYear; }

    public String getDoi() { return doi; }
    public void setDoi(String doi) { this.doi = doi; }

    public String getStudyType() { return studyType; }
    public void setStudyType(String studyType) { this.studyType = studyType; }

    public EvidenceStrength getEvidenceStrength() { return evidenceStrength; }
    public void setEvidenceStrength(EvidenceStrength evidenceStrength) { this.evidenceStrength = evidenceStrength; }

    public String getFindings() { return findings; }
    public void setFindings(String findings) { this.findings = findings; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public Herb getHerb() { return herb; }
    public void setHerb(Herb herb) { this.herb = herb; }
}
