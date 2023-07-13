package com.mindtrack.mindtrack.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.mindtrack.mindtrack.model.dto.FileDTO;

public interface FileController {

    ResponseEntity<?> createFile(FileDTO request);

    ResponseEntity<?> selectFile();

    ResponseEntity<?> deleteFile(Integer id);
}
