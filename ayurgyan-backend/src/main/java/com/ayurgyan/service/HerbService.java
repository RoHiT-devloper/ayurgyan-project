package com.ayurgyan.service;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.dto.HerbDTO;
import java.util.List;
import java.util.Optional;

public interface HerbService {
    
    List<HerbDTO> getAllHerbs();
    
    Optional<HerbDTO> getHerbById(Long id);
    
    List<HerbDTO> searchHerbs(String query, String safetyLevel);
    
    List<HerbDTO> getHerbsBySafetyLevel(String safetyLevel);
    
    HerbDTO createHerb(Herb herb);
    
    HerbDTO updateHerb(Long id, Herb herbDetails);
    
    void deleteHerb(Long id);
    
    boolean existsByName(String name);
}