package com.mindtrack.mindtrack.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import static com.mindtrack.mindtrack.constant.AppConstant.SCHEMA;

import java.util.List;
import java.time.LocalDate;

@Entity(name = "ProfessionalEntity")
@Table(schema = SCHEMA, name = "professional")
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProfessionalEntity {

    public ProfessionalEntity() {
    }

    @Id
    private String crp;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "password")
    private String password;

    @ManyToMany()
    @JoinTable(name = "professional_patient", joinColumns = @JoinColumn(name = "crp"), inverseJoinColumns = @JoinColumn(name = "cpf"))
    private List<PatientEntity> patients;

    @ManyToMany()
    @JoinTable(name = "professional_interested", joinColumns = @JoinColumn(name = "crp"), inverseJoinColumns = @JoinColumn(name = "cpf"))
    private List<InterestedEntity> interested;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private AddressEntity address;

    @OneToMany(mappedBy = "professional")
    private List<AppointmentEntity> appointments;

    @OneToMany(mappedBy = "professional")
    private List<ReportEntity> reports;
}
