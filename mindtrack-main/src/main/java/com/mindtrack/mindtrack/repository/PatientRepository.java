package com.mindtrack.mindtrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mindtrack.mindtrack.entity.PatientEntity;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, String> {
    
}
