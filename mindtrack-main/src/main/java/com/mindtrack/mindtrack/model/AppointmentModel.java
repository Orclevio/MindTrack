package com.mindtrack.mindtrack.model;

import com.mindtrack.mindtrack.model.dto.AppointmentDTO;
import com.mindtrack.mindtrack.model.dto.SucessModel;

public interface AppointmentModel {
    
    SucessModel createAppointment(String crp, String cpf, AppointmentDTO request);

    SucessModel selectAppointment(String crp);

    SucessModel updateAppointment(Integer id, AppointmentDTO request);

    SucessModel deleteAppointment(Integer id);
}
