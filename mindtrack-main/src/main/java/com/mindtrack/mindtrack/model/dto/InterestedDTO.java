package com.mindtrack.mindtrack.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
public class InterestedDTO extends PersonDTO {

    private String cpf;
    private String responsible;

}
