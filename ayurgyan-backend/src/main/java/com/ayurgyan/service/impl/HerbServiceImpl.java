package com.ayurgyan.service.impl;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.MedicinalUse;
import com.ayurgyan.model.ScientificStudy;
import com.ayurgyan.model.dto.HerbDTO;
import com.ayurgyan.model.dto.MedicinalUseDTO;
import com.ayurgyan.model.dto.ScientificStudyDTO;
import com.ayurgyan.repository.HerbRepository;
import com.ayurgyan.service.HerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HerbServiceImpl implements HerbService {

    @Autowired
    private HerbRepository herbRepository;

    @Override
    public List<HerbDTO> getAllHerbs() {
        return herbRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<HerbDTO> getHerbById(Long id) {
        return herbRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Override
    public List<HerbDTO> searchHerbs(String query, String safetyLevel) {
        List<Herb> herbs;
        if (safetyLevel != null && !safetyLevel.isEmpty()) {
            herbs = herbRepository.searchHerbsWithFilters(query, safetyLevel);
        } else {
            herbs = herbRepository.searchHerbs(query);
        }
        return herbs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<HerbDTO> getHerbsBySafetyLevel(String safetyLevel) {
        return herbRepository.findBySafetyLevel(safetyLevel).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HerbDTO createHerb(Herb herb) {
        Herb savedHerb = herbRepository.save(herb);
        return convertToDTO(savedHerb);
    }

    @Override
    public HerbDTO updateHerb(Long id, Herb herbDetails) {
        Herb herb = herbRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Herb not found with id: " + id));

        herb.setName(herbDetails.getName());
        herb.setScientificName(herbDetails.getScientificName());
        herb.setDescription(herbDetails.getDescription());
        herb.setSafetyLevel(herbDetails.getSafetyLevel());
        herb.setImageUrl(herbDetails.getImageUrl());
        herb.setTraditionalUses(herbDetails.getTraditionalUses());
        herb.setActiveCompounds(herbDetails.getActiveCompounds());
        herb.setContraindications(herbDetails.getContraindications());
        herb.setSideEffects(herbDetails.getSideEffects());

        Herb updatedHerb = herbRepository.save(herb);
        return convertToDTO(updatedHerb);
    }

    @Override
    public void deleteHerb(Long id) {
        Herb herb = herbRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Herb not found with id: " + id));
        herbRepository.delete(herb);
    }

    @Override
    public boolean existsByName(String name) {
        return herbRepository.existsByName(name);
    }

     
    private HerbDTO convertToDTO(Herb herb) {
        HerbDTO dto = new HerbDTO();
        dto.setId(herb.getId());
        dto.setName(herb.getName());
        dto.setScientificName(herb.getScientificName());
        dto.setDescription(herb.getDescription());
        dto.setSafetyLevel(herb.getSafetyLevel()); // Fixed
        dto.setImageUrl(herb.getImageUrl());
        dto.setTraditionalUses(herb.getTraditionalUses());
        dto.setActiveCompounds(herb.getActiveCompounds());
        dto.setContraindications(herb.getContraindications());
        dto.setSideEffects(herb.getSideEffects());
        dto.setCreatedAt(herb.getCreatedAt());
        dto.setUpdatedAt(herb.getUpdatedAt());

        // Convert medicinal uses
        if (herb.getMedicinalUses() != null) {
            List<MedicinalUseDTO> medicinalUseDTOs = herb.getMedicinalUses().stream()
                    .map(this::convertMedicinalUseToDTO)
                    .collect(Collectors.toList());
            dto.setMedicinalUses(medicinalUseDTOs);
        }

        // Convert scientific studies
        if (herb.getScientificStudies() != null) {
            List<ScientificStudyDTO> studyDTOs = herb.getScientificStudies().stream()
                    .map(this::convertScientificStudyToDTO)
                    .collect(Collectors.toList());
            dto.setScientificStudies(studyDTOs);
        }

        return dto;
    }

    private MedicinalUseDTO convertMedicinalUseToDTO(MedicinalUse medicinalUse) {
        MedicinalUseDTO dto = new MedicinalUseDTO();
        dto.setId(medicinalUse.getId());
        dto.setCondition(medicinalUse.getCondition());
        dto.setPreparation(medicinalUse.getPreparation());
        dto.setDosage(medicinalUse.getDosage());
        dto.setDuration(medicinalUse.getDuration());
        dto.setEvidenceLevel(medicinalUse.getEvidenceLevel());
        return dto;
    }

    private ScientificStudyDTO convertScientificStudyToDTO(ScientificStudy study) {
        ScientificStudyDTO dto = new ScientificStudyDTO();
        dto.setId(study.getId());
        dto.setTitle(study.getTitle());
        dto.setAuthors(study.getAuthors());
        dto.setJournal(study.getJournal());
        dto.setPublicationYear(study.getPublicationYear());
        dto.setDoi(study.getDoi());
        dto.setStudyType(study.getStudyType());
        dto.setEvidenceStrength(study.getEvidenceStrength()); // Fixed
        dto.setFindings(study.getFindings());
        dto.setUrl(study.getUrl());
        return dto;
    }
}