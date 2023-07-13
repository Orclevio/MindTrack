package com.mindtrack.mindtrack.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

import static com.mindtrack.mindtrack.constant.AppConstant.SCHEMA;

@Entity(name = "ReportEntity")
@Table(schema = SCHEMA, name = "report")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReportEntity {

    public ReportEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "evolution")
    private String evolution;

    @Column(name = "follow_up")
    private String followUp;

    @Column(name = "resources")
    private String resources;

    @ManyToOne
    @JoinColumn(name = "crp")
    private ProfessionalEntity professional;

    @ManyToOne
    @JoinColumn(name = "cpf")
    private PatientEntity patient;

}
