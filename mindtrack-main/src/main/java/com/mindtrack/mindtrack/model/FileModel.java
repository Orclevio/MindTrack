package com.mindtrack.mindtrack.model;

import com.mindtrack.mindtrack.model.dto.FileDTO;
import com.mindtrack.mindtrack.model.dto.ProfessionalDTO;
import com.mindtrack.mindtrack.model.dto.SucessModel;

public interface FileModel {

    SucessModel insertFile(FileDTO request);

    SucessModel selectFile();

    SucessModel deleteFile(Integer id);
    
}