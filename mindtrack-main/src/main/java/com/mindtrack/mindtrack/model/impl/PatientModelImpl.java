package com.mindtrack.mindtrack.model.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.mindtrack.mindtrack.entity.AddressEntity;
import com.mindtrack.mindtrack.entity.PatientEntity;
import com.mindtrack.mindtrack.exception.CreateException;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.exception.DeleteException;
import com.mindtrack.mindtrack.exception.SelectException;
import com.mindtrack.mindtrack.exception.UpdateException;
import com.mindtrack.mindtrack.model.PatientModel;
import com.mindtrack.mindtrack.repository.PatientRepository;
import com.mindtrack.mindtrack.repository.ProfessionalRepository;
import com.mindtrack.mindtrack.model.dto.SucessModel;
import com.mindtrack.mindtrack.model.dto.PatientDTO;
import java.util.List;

import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_CREATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_UPDATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_CREATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_UPDATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_DELETING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_SELECTING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_DELETING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_SELECTING_MESSAGING;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientModelImpl implements PatientModel{

    private final PatientRepository patientRepository;
    private final ProfessionalRepository professionalRepository;
    
    @Override
    public SucessModel createPatient (String professionalId, PatientDTO request) {
        try {
            var patient = patientRepository.findById(request.getCpf());
            var professional = professionalRepository.findById(professionalId);

            patient.ifPresent( p -> {
                var addressEntity = AddressEntity.builder()
                    .id(p.getAddress().getId())
                    .city(request.getCity())
                    .country(request.getCountry())
                    .postalCode(request.getPostalCode())
                    .state(request.getState())
                    .street(request.getStreet()).build();

                p.setAddress(addressEntity);
                p.setEmailAddress(request.getEmailAddress());
                p.setResponsible(request.getResponsible());
                p.setName(request.getName());
                p.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(),
                    DateTimeFormatter.ofPattern("dd/MM/yyyy")));
                p.setPhoneNumber(request.getPhoneNumber());

                professional.ifPresent( prof -> {
                    p.getProfessionals().add(prof);
                    prof.getPatients().add(p);
                    patientRepository.save(p);
                    professionalRepository.save(prof);
                });
            });

            if(patient.isEmpty()){
                var addressEntity = AddressEntity.builder()
                    .city(request.getCity())
                    .country(request.getCountry())
                    .postalCode(request.getPostalCode())
                    .state(request.getState())
                    .street(request.getStreet()).build();
                
                var patientEntity = PatientEntity.builder()
                    .address(addressEntity)
                    .cpf(request.getCpf())
                    .phoneNumber(request.getPhoneNumber())
                    .responsible(request.getResponsible())
                    .dateOfBirth(LocalDate.parse(request.getDateOfBirth(),
                        DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .professionals(List.of(professional.get()))
                    .name(request.getName())
                    .emailAddress(request.getEmailAddress()).build();

                patientRepository.save(patientEntity);
                professional.ifPresent( prof -> {
                    prof.getPatients().add(patientEntity);
                    professionalRepository.save(prof);
                });
            }

            return SucessModel.builder()
                .description(String.format(SUCESS_CREATING_MESSAGING, "patient"))
                .object(request).build();
        } catch (Exception e) {
            throw new CreateException(String.format(ERROR_CREATING_MESSAGING, "patient", e.getMessage()));
        }
    }

    @Override
    public SucessModel updatePatient(String id, PatientDTO request) {
        try {
            var patientEntity = patientRepository.findById(id).get();

            patientEntity.getAddress().setCity(request.getCity());
            patientEntity.getAddress().setCountry(request.getCountry());
            patientEntity.getAddress().setPostalCode(request.getPostalCode());
            patientEntity.getAddress().setState(request.getState());
            patientEntity.getAddress().setStreet(request.getStreet());

            patientEntity.setName(request.getName());
            patientEntity.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(),
                DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            patientEntity.setEmailAddress(request.getEmailAddress());
            patientEntity.setPhoneNumber(request.getPhoneNumber());
            patientEntity.setResponsible(request.getResponsible());

            patientRepository.save(patientEntity);

            return SucessModel.builder()
                .description(String.format(SUCESS_UPDATING_MESSAGING, "patient"))
                .object(request).build();
        } catch (Exception e) {
            throw new UpdateException(String.format(ERROR_UPDATING_MESSAGING, "patient", e.getMessage()));
        }
    }

    @Override
    public SucessModel deletePatient(String professionalId, String id) {
        try{
            var patient = patientRepository.findById(id);

            patient.ifPresent( p -> {
                var professional = professionalRepository.findById(professionalId);

                professional.ifPresent( prof -> {
                    prof.getPatients().removeIf(item -> (item.getCpf().equals(p.getCpf())));
                    professionalRepository.save(prof);
                });
            });

            return SucessModel.builder()
                .description(String.format(SUCESS_DELETING_MESSAGING, "patient"))
                .object(null).build();
        } catch (Exception e) {
            throw new DeleteException(String.format(ERROR_DELETING_MESSAGING, "patient", e.getMessage()));
        }
    }
    
    @Override
    public SucessModel selectPatient(String id) {
        try {
            var patient = patientRepository.findById(id);

            if(patient.isPresent()) {

                var patientDTO = PatientDTO.builder()
                    .city(patient.get().getAddress().getCity())
                    .country(patient.get().getAddress().getCountry())
                    .cpf(patient.get().getCpf())
                    .dateOfBirth(patient.get().getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .emailAddress(patient.get().getEmailAddress())
                    .name(patient.get().getName())
                    .phoneNumber(patient.get().getPhoneNumber())
                    .postalCode(patient.get().getAddress().getPostalCode())
                    .responsible(patient.get().getResponsible())
                    .state(patient.get().getAddress().getState())
                    .street(patient.get().getAddress().getStreet()).build();

                return SucessModel.builder()
                    .description(String.format(SUCESS_SELECTING_MESSAGING, "patient"))
                    .object(patientDTO).build();
            }

            throw new DataNotFoundException("Patient not found!");
        } catch (DataNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new SelectException(String.format(ERROR_SELECTING_MESSAGING, "patient", e.getMessage()));
        }
    }

}
