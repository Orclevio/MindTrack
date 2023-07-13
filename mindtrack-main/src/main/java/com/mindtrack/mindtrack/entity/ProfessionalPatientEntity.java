package com.mindtrack.mindtrack.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import static com.mindtrack.mindtrack.constant.AppConstant.SCHEMA;

@Entity(name = "ProfessionalPatientEntity")
@Table(schema = SCHEMA, name = "professional_patient")
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ProfessionalPatientEntity {

    public ProfessionalPatientEntity() {}

    @Id
    private Long id;

    @Column(name = "crp")
    private String crp;

    @Column(name = "cpf")
    private String cpf;
    
}
