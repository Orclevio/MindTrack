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

import com.mindtrack.mindtrack.controller.InterestedController;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.model.InterestedModel;
import com.mindtrack.mindtrack.model.dto.ErrorModel;
import com.mindtrack.mindtrack.model.dto.InterestedDTO;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class InterestedControllerImpl implements InterestedController {

    private final InterestedModel interestedModel;

    @Override
    @PostMapping("/interested/{crp}")
    public ResponseEntity<?> createInterested(@PathVariable String crp, @RequestBody InterestedDTO request) {
        try {
            var sucessObject = interestedModel.createInterested(crp, request);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("DB ERROR")
                    .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @Override
    @PutMapping("/interested/{cpf}")
    public ResponseEntity<?> updateInterested(@PathVariable String cpf, @RequestBody InterestedDTO request) {
        try {
            var sucessObject = interestedModel.updateInterested(cpf, request);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("DB ERROR")
                    .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @Override
    @DeleteMapping("/interested/{crp}/{cpf}")
    public ResponseEntity<?> deleteInterested(@PathVariable String crp, @PathVariable String cpf) {
        try {
            var sucessObject = interestedModel.deleteInterested(crp, cpf);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                    .error("DB ERROR")
                    .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @Override
    @GetMapping("/interested/{cpf}")
    public ResponseEntity<?> selectInterested(@PathVariable String cpf) {
        try {
            var sucessObject = interestedModel.selectInterested(cpf);

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
