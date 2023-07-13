package com.mindtrack.mindtrack.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class ProfessionalDTO extends PersonDTO{
    
    public ProfessionalDTO() {}

    private String crp;
    private String password;

}
