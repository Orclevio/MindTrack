package com.mindtrack.mindtrack.controller;

import org.springframework.http.ResponseEntity;

import com.mindtrack.mindtrack.model.dto.AppointmentDTO;

public interface AppointmentController {
    
    ResponseEntity<?> createAppointment(String crp, String cpf, AppointmentDTO request);

    ResponseEntity<?> selectAppointment(String crp);

    ResponseEntity<?> updateAppointment(Integer id, AppointmentDTO request);

    ResponseEntity<?> deleteAppointment(Integer id);
}
