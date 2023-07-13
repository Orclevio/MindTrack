package com.mindtrack.mindtrack.model.impl;

import org.springframework.stereotype.Service;

import com.mindtrack.mindtrack.model.ProfessionalModel;
import com.mindtrack.mindtrack.model.dto.ProfessionalDTO;
import com.mindtrack.mindtrack.model.dto.PatientDTO;
import com.mindtrack.mindtrack.model.dto.SucessModel;
import com.mindtrack.mindtrack.repository.ProfessionalRepository;
import com.mindtrack.mindtrack.entity.AddressEntity;
import com.mindtrack.mindtrack.entity.ProfessionalEntity;
import com.mindtrack.mindtrack.exception.AuthenticateException;
import com.mindtrack.mindtrack.exception.CreateException;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.exception.UpdateException;
import com.mindtrack.mindtrack.exception.DeleteException;
import com.mindtrack.mindtrack.exception.SelectException;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

import lombok.RequiredArgsConstructor;

import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_CREATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_UPDATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_CREATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_UPDATING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_DELETING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.SUCESS_SELECTING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_DELETING_MESSAGING;
import static com.mindtrack.mindtrack.constant.AppConstant.ERROR_SELECTING_MESSAGING;

@Service
@RequiredArgsConstructor
public class ProfessionalModelImpl implements ProfessionalModel{

    private final ProfessionalRepository professionalRepository;

    @Override
    public SucessModel insertProfessional(ProfessionalDTO request) {
        var verifyProfessional = professionalRepository.findByEmailAddress(request.getEmailAddress());

        if(verifyProfessional.isEmpty()){
            var address = AddressEntity.builder()
                .city(request.getCity())
                .country(request.getCountry())
                .postalCode(request.getPostalCode())
                .state(request.getState())
                .street(request.getStreet()).build();

            var professional = ProfessionalEntity.builder()
                .crp(request.getCrp())
                .dateOfBirth(LocalDate.parse(request.getDateOfBirth(), DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                .emailAddress(request.getEmailAddress())
                .name(request.getName())
                .phoneNumber(request.getPhoneNumber())
                .password(request.getPassword())
                .address(address).build();

            try {
                professionalRepository.save(professional);

                return SucessModel.builder()
                    .description(String.format(SUCESS_CREATING_MESSAGING,"Professional"))
                    .object(request).build();
            } catch (Exception e) {
                throw new CreateException(String.format(ERROR_CREATING_MESSAGING, "Professional", e.getMessage()));
            }
        }

        throw new CreateException(String.format(ERROR_CREATING_MESSAGING, "professional", "there is already a registered user with this email"));
    }

    @Override
    public SucessModel updateProfessional (String id, ProfessionalDTO request) {
        var professionalEntity = professionalRepository.findById(id)
            .orElseThrow(() -> new UpdateException(String.format(ERROR_UPDATING_MESSAGING, "Professional", "Professional not found")));

        professionalEntity.setCrp(request.getCrp());
        professionalEntity.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(), DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        professionalEntity.setEmailAddress(request.getEmailAddress());
        professionalEntity.setName(request.getName());
        professionalEntity.setPhoneNumber(request.getPhoneNumber());
        professionalEntity.getAddress().setCity(request.getCity());
        professionalEntity.getAddress().setCountry(request.getCountry());
        professionalEntity.getAddress().setPostalCode(request.getPostalCode());
        professionalEntity.getAddress().setState(request.getState());
        professionalEntity.getAddress().setStreet(request.getStreet());

        try{
            professionalRepository.save(professionalEntity);

            return SucessModel.builder()
                .description(String.format(SUCESS_UPDATING_MESSAGING, "Professional"))
                .object(request).build();
        } catch (Exception e) {
            throw new UpdateException(String.format(ERROR_UPDATING_MESSAGING, "Professional", e.getMessage()));
        }
    }

    @Override
    public SucessModel deleteProfessional(String id) {
        try {
            professionalRepository.deleteById(id);

            return SucessModel.builder()
                .description(String.format(SUCESS_DELETING_MESSAGING, "Professional")).build();
        } catch (Exception e) {
            throw new DeleteException(String.format(ERROR_DELETING_MESSAGING, "Professiona", e.getMessage()));
        }
    }

    @Override
    public SucessModel selectProfessional(String id) {
        try{
            var professional = professionalRepository.findByEmailAddress(id);

            if(professional.isPresent()) {
                var professionalDTO = ProfessionalDTO.builder()
                    .crp(professional.get().getCrp())
                    .dateOfBirth(professional.get().getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .emailAddress(professional.get().getEmailAddress())
                    .phoneNumber(professional.get().getPhoneNumber())
                    .name(professional.get().getName())
                    .city(professional.get().getAddress().getCity())
                    .country(professional.get().getAddress().getCountry())
                    .postalCode(professional.get().getAddress().getPostalCode())
                    .state(professional.get().getAddress().getState())
                    .street(professional.get().getAddress().getStreet()).build();

                    return SucessModel.builder()
                        .description(String.format(SUCESS_SELECTING_MESSAGING, "Professional"))
                        .object(professionalDTO).build();
            }

            throw new DataNotFoundException("Professional not found!");
        } catch (DataNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new SelectException(String.format(ERROR_SELECTING_MESSAGING, "Professiona", e.getMessage()));
        }
    }
    
    @Override
    public SucessModel selectPatients(String id) {
        try {
            var professional = professionalRepository.findById(id);

            if(professional.isPresent() && !professional.get().getPatients().isEmpty()){
                List<PatientDTO> patients = new ArrayList<>();

                professional.get().getPatients().forEach(item -> {
                    patients.add(PatientDTO.builder()
                        .city(item.getAddress().getCity())
                        .country(item.getAddress().getCountry())
                        .cpf(item.getCpf())
                        .dateOfBirth(item.getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                        .emailAddress(item.getEmailAddress())
                        .name(item.getName())
                        .phoneNumber(item.getPhoneNumber())
                        .postalCode(item.getAddress().getPostalCode())
                        .responsible(item.getResponsible())
                        .state(item.getAddress().getState())
                        .street(item.getAddress().getStreet()).build());
                });

                return SucessModel.builder()
                    .description(String.format(SUCESS_SELECTING_MESSAGING, "patients"))
                    .object(patients).build(); 
            }

            throw new DataNotFoundException("professional not found");
        } catch (DataNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new SelectException(String.format(ERROR_SELECTING_MESSAGING, "patients", e.getMessage()));
        }
    }

    @Override
    public SucessModel authentication(String email, String password) {
        try {
            var professional = professionalRepository.findByEmailAddress(email);

            if(professional.isPresent()) {
                var emailProfessional = professional.get().getEmailAddress();
                var passwordProfessional = professional.get().getPassword();

                if(emailProfessional.concat(passwordProfessional).equals(email.concat(password)))
                    return SucessModel.builder()
                        .description("Sucess Authentication")
                        .build();
                
                throw new RuntimeException();
            }
            
            throw new DataNotFoundException("email not found");
        } catch (DataNotFoundException e) {
            throw e;
        }catch (Exception e) {
            throw new AuthenticateException("email or password not matching");
        }
    }
}
