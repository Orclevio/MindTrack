package com.mindtrack.mindtrack.model.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.mindtrack.mindtrack.entity.AddressEntity;
import com.mindtrack.mindtrack.entity.InterestedEntity;
import com.mindtrack.mindtrack.exception.CreateException;
import com.mindtrack.mindtrack.exception.DataNotFoundException;
import com.mindtrack.mindtrack.exception.DeleteException;
import com.mindtrack.mindtrack.exception.SelectException;
import com.mindtrack.mindtrack.exception.UpdateException;
import com.mindtrack.mindtrack.model.InterestedModel;
import com.mindtrack.mindtrack.repository.InterestedRepository;
import com.mindtrack.mindtrack.repository.ProfessionalRepository;
import com.mindtrack.mindtrack.model.dto.SucessModel;
import com.mindtrack.mindtrack.model.dto.InterestedDTO;
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
public class InterestedModelImpl implements InterestedModel {

    private final InterestedRepository interestedRepository;
    private final ProfessionalRepository professionalRepository;

    @Override
    public SucessModel createInterested(String professionalId, InterestedDTO request) {
        try {
            var interested = interestedRepository.findById(request.getCpf());
            var professional = professionalRepository.findById(professionalId);

            interested.ifPresent(p -> {
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

                professional.ifPresent(prof -> {
                    p.getProfessionals().add(prof);
                    prof.getInterested().add(p);
                    interestedRepository.save(p);
                    professionalRepository.save(prof);
                });
            });

            if (interested.isEmpty()) {
                var addressEntity = AddressEntity.builder()
                        .city(request.getCity())
                        .country(request.getCountry())
                        .postalCode(request.getPostalCode())
                        .state(request.getState())
                        .street(request.getStreet()).build();

                var interestedEntity = InterestedEntity.builder()
                        .address(addressEntity)
                        .cpf(request.getCpf())
                        .phoneNumber(request.getPhoneNumber())
                        .responsible(request.getResponsible())
                        .dateOfBirth(LocalDate.parse(request.getDateOfBirth(),
                                DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                        .professionals(List.of(professional.get()))
                        .name(request.getName())
                        .emailAddress(request.getEmailAddress()).build();

                interestedRepository.save(interestedEntity);
                professional.ifPresent(prof -> {
                    prof.getInterested().add(interestedEntity);
                    professionalRepository.save(prof);
                });
            }

            return SucessModel.builder()
                    .description(String.format(SUCESS_CREATING_MESSAGING, "interested"))
                    .object(request).build();
        } catch (Exception e) {
            throw new CreateException(String.format(ERROR_CREATING_MESSAGING, "interested", e.getMessage()));
        }
    }

    @Override
    public SucessModel updateInterested(String id, InterestedDTO request) {
        try {
            var interestedEntity = interestedRepository.findById(id).get();

            interestedEntity.getAddress().setCity(request.getCity());
            interestedEntity.getAddress().setCountry(request.getCountry());
            interestedEntity.getAddress().setPostalCode(request.getPostalCode());
            interestedEntity.getAddress().setState(request.getState());
            interestedEntity.getAddress().setStreet(request.getStreet());

            interestedEntity.setName(request.getName());
            interestedEntity.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(),
                    DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            interestedEntity.setEmailAddress(request.getEmailAddress());
            interestedEntity.setPhoneNumber(request.getPhoneNumber());
            interestedEntity.setResponsible(request.getResponsible());

            interestedRepository.save(interestedEntity);

            return SucessModel.builder()
                    .description(String.format(SUCESS_UPDATING_MESSAGING, "interested"))
                    .object(request).build();
        } catch (Exception e) {
            throw new UpdateException(String.format(ERROR_UPDATING_MESSAGING, "interested", e.getMessage()));
        }
    }

    @Override
    public SucessModel deleteInterested(String professionalId, String id) {
        try {
            var interested = interestedRepository.findById(id);

            interested.ifPresent(p -> {
                var professional = professionalRepository.findById(professionalId);

                professional.ifPresent(prof -> {
                    prof.getInterested().removeIf(item -> (item.getCpf().equals(p.getCpf())));
                    professionalRepository.save(prof);
                });
            });

            return SucessModel.builder()
                    .description(String.format(SUCESS_DELETING_MESSAGING, "interested"))
                    .object(null).build();
        } catch (Exception e) {
            throw new DeleteException(String.format(ERROR_DELETING_MESSAGING, "interested", e.getMessage()));
        }
    }

    @Override
    public SucessModel selectInterested(String id) {
        try {
            var interested = interestedRepository.findById(id);

            if (interested.isPresent()) {

                var interestedDTO = InterestedDTO.builder()
                        .city(interested.get().getAddress().getCity())
                        .country(interested.get().getAddress().getCountry())
                        .cpf(interested.get().getCpf())
                        .dateOfBirth(
                                interested.get().getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                        .emailAddress(interested.get().getEmailAddress())
                        .name(interested.get().getName())
                        .phoneNumber(interested.get().getPhoneNumber())
                        .postalCode(interested.get().getAddress().getPostalCode())
                        .responsible(interested.get().getResponsible())
                        .state(interested.get().getAddress().getState())
                        .street(interested.get().getAddress().getStreet()).build();

                return SucessModel.builder()
                        .description(String.format(SUCESS_SELECTING_MESSAGING, "interested"))
                        .object(interestedDTO).build();
            }

            throw new DataNotFoundException("Interested not found!");
        } catch (DataNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new SelectException(String.format(ERROR_SELECTING_MESSAGING, "interested", e.getMessage()));
        }
    }

}
