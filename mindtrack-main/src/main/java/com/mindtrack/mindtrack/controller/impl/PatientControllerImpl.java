package com.mindtrack.mindtrack.controller.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mindtrack.mindtrack.controller.PatientController;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.model.PatientModel;
import com.mindtrack.mindtrack.model.dto.ErrorModel;
import com.mindtrack.mindtrack.model.dto.PatientDTO;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class PatientControllerImpl implements PatientController{

    private final PatientModel patientModel;

    @Override
    @PostMapping("/patient/{crp}")
    public ResponseEntity<?> createPatient(@PathVariable String crp, @RequestBody PatientDTO request) {
        try{
            var sucessObject = patientModel.createPatient(crp, request);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                .error("DB ERROR")
                .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @Override
    @PutMapping("/patient/{cpf}")
    public ResponseEntity<?> updatePatient(@PathVariable String cpf, @RequestBody PatientDTO request) {
        try{
            var sucessObject = patientModel.updatePatient(cpf, request);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                .error("DB ERROR")
                .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @Override
    @DeleteMapping("/patient/{crp}/{cpf}")
    public ResponseEntity<?> deletePatient(@PathVariable String crp, @PathVariable String cpf) {
        try{
            var sucessObject = patientModel.deletePatient(crp, cpf);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                .error("DB ERROR")
                .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }
    
    @Override
    @GetMapping("/patient/{cpf}")
    public ResponseEntity<?> selectPatient(@PathVariable String cpf) {
        try{
            var sucessObject = patientModel.selectPatient(cpf);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (DataNotFoundException e) {
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            var error = ErrorModel.builder()
                .error("DB ERROR")
                .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }
    
}
