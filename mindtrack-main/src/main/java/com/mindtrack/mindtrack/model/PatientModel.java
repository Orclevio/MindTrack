package com.mindtrack.mindtrack.model;

import com.mindtrack.mindtrack.model.dto.SucessModel;
import com.mindtrack.mindtrack.model.dto.PatientDTO;

public interface PatientModel {

    SucessModel createPatient(String professionalId, PatientDTO request);

    SucessModel updatePatient(String id, PatientDTO request);

    SucessModel deletePatient(String professionalId, String id);
    
    SucessModel selectPatient(String id);
    
}
