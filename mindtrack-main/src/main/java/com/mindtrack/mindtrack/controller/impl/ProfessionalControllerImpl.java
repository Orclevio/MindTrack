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

import com.mindtrack.mindtrack.controller.ProfessionalController;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.model.ProfessionalModel;
import com.mindtrack.mindtrack.model.dto.ErrorModel;
import com.mindtrack.mindtrack.model.dto.ProfessionalDTO;
import com.mindtrack.mindtrack.model.dto.AuthenticationDTO;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class ProfessionalControllerImpl implements ProfessionalController {

    private final ProfessionalModel professionalModel;

    @PostMapping("/professional")
    @Override
    public ResponseEntity<?> createProfessional(@RequestBody ProfessionalDTO request) {
        try {
            var sucessObject = professionalModel.insertProfessional(request);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("DB ERROR")
                    .description(String.format(e.getMessage())).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @PutMapping("/professional/{crp}")
    @Override
    public ResponseEntity<?> updateProfessional(@PathVariable String crp, @RequestBody ProfessionalDTO request) {
        try {
            var sucessObject = professionalModel.updateProfessional(crp, request);

            if (sucessObject.equals(null))
                return ResponseEntity.noContent().build();

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("DB ERROR")
                    .description(String.format(e.getMessage())).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @DeleteMapping("/professional/{crp}")
    @Override
    public ResponseEntity<?> deleteProfessional(@PathVariable String crp) {
        try {
            var sucessObject = professionalModel.deleteProfessional(crp);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("DB ERROR")
                    .description(String.format(e.getMessage())).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @GetMapping("/professional/{email}")
    @Override
    public ResponseEntity<?> selectProfessional(@PathVariable String email) {
        try {
            var sucessObject = professionalModel.selectProfessional(email);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (DataNotFoundException e) {
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("DB ERROR")
                    .description(String.format(e.getMessage())).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @GetMapping("/professional/patients/{crp}")
    @Override
    public ResponseEntity<?> selectPatients(@PathVariable String crp) {
        try {
            var sucessObject = professionalModel.selectPatients(crp);

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

    @GetMapping("/professional/interested/{crp}")
    @Override
    public ResponseEntity<?> selectInteresteds(@PathVariable String crp) {
        try {
            var sucessObject = professionalModel.selectPatients(crp);

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

    @PostMapping("/professional/authentication")
    @Override
    public ResponseEntity<?> authentication(@RequestBody AuthenticationDTO request) {
        try {
            var sucessObject = professionalModel.authentication(request.getEmail(), request.getPassword());

            return ResponseEntity.status(200).body(sucessObject);
        } catch (DataNotFoundException e) {
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("Authentication Error")
                    .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }
}
