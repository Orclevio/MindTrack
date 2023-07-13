package com.mindtrack.mindtrack.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class AppointmentDTO {
    
    public AppointmentDTO() {}

    private Integer id;
    private String date;
    private String recurrence;
    private String local;
    private Boolean inPerson;
    private Double price;
    private Boolean paid;
    private PatientDTO patient;

}
