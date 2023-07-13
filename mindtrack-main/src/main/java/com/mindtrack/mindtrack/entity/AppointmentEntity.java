package com.mindtrack.mindtrack.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import static com.mindtrack.mindtrack.constant.AppConstant.SCHEMA;

import java.time.LocalDateTime;

@Entity(name = "AppointmentEntity")
@Table(schema = SCHEMA, name = "appointment")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class AppointmentEntity {

    public AppointmentEntity() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "recurrence")
    private String recurrence;

    @Column(name = "local")
    private String local;

    @Column(name = "in_person")
    private Boolean inPerson;

    @Column(name = "price")
    private Double price;

    @Column(name = "paid")
    private Boolean paid;

    @ManyToOne
    @JoinColumn(name = "crp")
    private ProfessionalEntity professional;

    @ManyToOne
    @JoinColumn(name = "cpf")
    private PatientEntity patient;
}
