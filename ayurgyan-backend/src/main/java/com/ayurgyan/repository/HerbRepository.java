package com.ayurgyan.repository;

import com.ayurgyan.model.Herb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HerbRepository extends JpaRepository<Herb, Long> {
    
    Optional<Herb> findByName(String name);
    
    List<Herb> findByScientificNameContainingIgnoreCase(String scientificName);
    
    List<Herb> findBySafetyLevel(String safetyLevel);
    
    @Query("SELECT h FROM Herb h WHERE " +
           "LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.scientificName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.traditionalUses) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Herb> searchHerbs(@Param("query") String query);
    
    @Query("SELECT h FROM Herb h WHERE " +
           "(LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.scientificName) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:safetyLevel IS NULL OR h.safetyLevel = :safetyLevel)")
    List<Herb> searchHerbsWithFilters(@Param("query") String query, 
                                     @Param("safetyLevel") String safetyLevel);
    
    boolean existsByName(String name);
}