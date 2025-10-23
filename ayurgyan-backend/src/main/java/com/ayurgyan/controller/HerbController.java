package com.ayurgyan.controller;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.model.dto.HerbDTO;
import com.ayurgyan.service.HerbService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/herbs")
@CrossOrigin(origins = "*")
@Tag(name = "Herbs", description = "Traditional Medicine Herb Management APIs")
public class HerbController {

    @Autowired
    private HerbService herbService;

    @GetMapping
    @Operation(summary = "Get all herbs", description = "Retrieve a list of all herbs in the database")
    public ResponseEntity<ApiResponse<List<HerbDTO>>> getAllHerbs() {
        List<HerbDTO> herbs = herbService.getAllHerbs();
        return ResponseEntity.ok(ApiResponse.success("Herbs retrieved successfully", herbs));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get herb by ID", description = "Retrieve a specific herb by its ID")
    public ResponseEntity<ApiResponse<HerbDTO>> getHerbById(@PathVariable Long id) {
        Optional<HerbDTO> herb = herbService.getHerbById(id);
        if (herb.isPresent()) {
            return ResponseEntity.ok(ApiResponse.success("Herb retrieved successfully", herb.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Search herbs", description = "Search herbs by name, scientific name, or description")
    public ResponseEntity<ApiResponse<List<HerbDTO>>> searchHerbs(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String safetyLevel) {
        
        List<HerbDTO> herbs = herbService.searchHerbs(query != null ? query : "", safetyLevel);
        return ResponseEntity.ok(ApiResponse.success("Search completed successfully", herbs));
    }

    @GetMapping("/safety/{safetyLevel}")
    @Operation(summary = "Get herbs by safety level", description = "Retrieve herbs filtered by safety level")
    public ResponseEntity<ApiResponse<List<HerbDTO>>> getHerbsBySafetyLevel(@PathVariable String safetyLevel) {
        List<HerbDTO> herbs = herbService.getHerbsBySafetyLevel(safetyLevel);
        return ResponseEntity.ok(ApiResponse.success("Herbs retrieved successfully", herbs));
    }

    @PostMapping
    @Operation(summary = "Create new herb", description = "Add a new herb to the database")
    public ResponseEntity<ApiResponse<HerbDTO>> createHerb(@Valid @RequestBody Herb herb) {
        if (herbService.existsByName(herb.getName())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Herb with name '" + herb.getName() + "' already exists"));
        }
        
        HerbDTO createdHerb = herbService.createHerb(herb);
        return ResponseEntity.ok(ApiResponse.success("Herb created successfully", createdHerb));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update herb", description = "Update an existing herb's information")
    public ResponseEntity<ApiResponse<HerbDTO>> updateHerb(@PathVariable Long id, @Valid @RequestBody Herb herbDetails) {
        try {
            HerbDTO updatedHerb = herbService.updateHerb(id, herbDetails);
            return ResponseEntity.ok(ApiResponse.success("Herb updated successfully", updatedHerb));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete herb", description = "Remove a herb from the database")
    public ResponseEntity<ApiResponse<Void>> deleteHerb(@PathVariable Long id) {
        try {
            herbService.deleteHerb(id);
            return ResponseEntity.ok(ApiResponse.success("Herb deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}