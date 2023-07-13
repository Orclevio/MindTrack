package com.mindtrack.mindtrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.mindtrack.mindtrack.entity.ProfessionalEntity;

@Repository
public interface ProfessionalRepository extends JpaRepository <ProfessionalEntity, String>{
    
    Optional<ProfessionalEntity> findByEmailAddress(String emailAdress);
}
