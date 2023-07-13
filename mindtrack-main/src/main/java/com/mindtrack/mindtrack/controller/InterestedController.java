package com.mindtrack.mindtrack.controller;

import com.mindtrack.mindtrack.model.dto.InterestedDTO;

import org.springframework.http.ResponseEntity;

public interface InterestedController {

    ResponseEntity<?> createInterested(String professionalId, InterestedDTO request);

    ResponseEntity<?> updateInterested(String id, InterestedDTO request);

    ResponseEntity<?> deleteInterested(String professionalId, String id);

    ResponseEntity<?> selectInterested(String id);
}
