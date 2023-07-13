package com.mindtrack.mindtrack.model;

import com.mindtrack.mindtrack.model.dto.ProfessionalDTO;
import com.mindtrack.mindtrack.model.dto.SucessModel;

public interface ProfessionalModel {

    SucessModel insertProfessional(ProfessionalDTO request);

    SucessModel updateProfessional(String id, ProfessionalDTO request);

    SucessModel deleteProfessional(String id);

    SucessModel selectProfessional(String id);

    SucessModel selectPatients(String id);

    SucessModel authentication(String email, String password);
    
}