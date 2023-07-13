package com.mindtrack.mindtrack.controller.impl;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mindtrack.mindtrack.controller.FileController;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.model.FileModel;
import com.mindtrack.mindtrack.model.ProfessionalModel;
import com.mindtrack.mindtrack.model.dto.ErrorModel;
import com.mindtrack.mindtrack.model.dto.FileDTO;
import com.mindtrack.mindtrack.model.dto.ProfessionalDTO;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class FileControllerImpl implements FileController{

    private final FileModel fileModel;

    @PostMapping("/file")
    @Override
    public ResponseEntity<?> createFile(@RequestBody FileDTO request) {
        try {
            var sucessObject = fileModel.insertFile(request);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                .error("DB ERROR")
                .description(String.format(e.getMessage())).build();

            return ResponseEntity.status(422).body(error);
        }
    }

    @GetMapping("/file")
    @Override
    public ResponseEntity<?> selectFile() {
        try {
            var sucessObject = fileModel.selectFile();

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

    @DeleteMapping("/file/{id}")
    @Override
    public ResponseEntity<?> deleteFile(@PathVariable Integer id) {
        try {
            var sucessObject = fileModel.deleteFile(id);

            return ResponseEntity.status(200).body(sucessObject);
        } catch (Exception e) {
            var error = ErrorModel.builder()
                .error("DB ERROR")
                .description(String.format(e.getMessage())).build();
            
            return ResponseEntity.status(422).body(error);
        }
    }
}
