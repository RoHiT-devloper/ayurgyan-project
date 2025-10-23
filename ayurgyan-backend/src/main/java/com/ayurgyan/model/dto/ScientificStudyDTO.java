package com.ayurgyan.model.dto;

import com.ayurgyan.model.EvidenceStrength;

public class ScientificStudyDTO {
    private Long id;
    private String title;
    private String authors;
    private String journal;
    private Integer publicationYear;
    private String doi;
    private String studyType;
    private EvidenceStrength evidenceStrength;
    private String findings;
    private String url;

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
}