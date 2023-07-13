package com.mindtrack.mindtrack.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

import static com.mindtrack.mindtrack.constant.AppConstant.SCHEMA;

@Entity(name = "PatientEntity")
@Table(schema = SCHEMA, name = "patient")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PatientEntity {

    public PatientEntity() {}

    @Id
    private String cpf;

    @Column(name = "name")
    private String name;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "responsible")
    private String responsible;

    @ManyToMany(mappedBy = "patients")
    private List<ProfessionalEntity> professionals;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private AddressEntity address;

    @OneToMany(mappedBy = "patient")
    private List<AppointmentEntity> appointments;

    @OneToMany(mappedBy = "patient")
    private List<ReportEntity> reports;
}
