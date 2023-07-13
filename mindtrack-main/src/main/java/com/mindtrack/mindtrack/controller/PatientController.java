package com.mindtrack.mindtrack.controller;

import com.mindtrack.mindtrack.model.dto.PatientDTO;

import org.springframework.http.ResponseEntity;


public interface PatientController {

    ResponseEntity<?> createPatient(String professionalId, PatientDTO request);

    ResponseEntity<?> updatePatient(String id, PatientDTO request);

    ResponseEntity<?> deletePatient(String professionalId, String id);
    
    ResponseEntity<?> selectPatient(String id);
}
