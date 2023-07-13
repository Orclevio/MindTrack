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

import com.mindtrack.mindtrack.controller.AppointmentController;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.model.AppointmentModel;
import com.mindtrack.mindtrack.model.dto.AppointmentDTO;
import com.mindtrack.mindtrack.model.dto.ErrorModel;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class AppointmentControllerImpl implements AppointmentController{
    
    private final AppointmentModel appointmentModel;

    @Override
    @PostMapping("/appointment/{crp}/{cpf}")
    public ResponseEntity<?> createAppointment(@PathVariable String crp, @PathVariable String cpf,
     @RequestBody AppointmentDTO request) {
        try {
            var sucessObject = appointmentModel.createAppointment(crp, cpf, request);

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

    @Override
    @GetMapping("/appointment/{crp}")
    public ResponseEntity<?> selectAppointment(@PathVariable String crp) {
        try {
            var sucessObject = appointmentModel.selectAppointment(crp);

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

    @Override
    @PutMapping("/appointment/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Integer id, @RequestBody AppointmentDTO request) {
        try {
            var sucessObject = appointmentModel.updateAppointment(id, request);

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

    @Override
    @DeleteMapping("/appointment/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Integer id) {
        try {
            var sucessObject = appointmentModel.deleteAppointment(id);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                .error("DB ERROR")
                .description(e.getMessage()).build();

            return ResponseEntity.status(422).body(error);
        }
    }
}
