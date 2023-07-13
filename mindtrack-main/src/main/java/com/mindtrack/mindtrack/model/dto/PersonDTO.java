package com.mindtrack.mindtrack.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public abstract class PersonDTO {

    public PersonDTO() {}

    private String name;
    private String phoneNumber;
    private String dateOfBirth;
    private String emailAddress;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
}
