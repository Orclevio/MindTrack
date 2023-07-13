package com.mindtrack.mindtrack.model.impl;

import org.springframework.stereotype.Service;

import com.mindtrack.mindtrack.model.FileModel;
import com.mindtrack.mindtrack.model.ProfessionalModel;
import com.mindtrack.mindtrack.model.dto.ProfessionalDTO;
import com.mindtrack.mindtrack.model.dto.FileDTO;
import com.mindtrack.mindtrack.model.dto.PatientDTO;
import com.mindtrack.mindtrack.model.dto.SucessModel;
import com.mindtrack.mindtrack.repository.FileRepository;
import com.mindtrack.mindtrack.repository.ProfessionalRepository;
import com.mindtrack.mindtrack.entity.AddressEntity;
import com.mindtrack.mindtrack.entity.FileEntity;
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
import java.io.IOException;
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
public class FileModelImpl implements FileModel{

    private final FileRepository fileRepository;

    @Override
    public SucessModel insertFile(FileDTO arquivo) {
        var arquivoEntity = FileEntity.builder()
            .name(arquivo.getName())
            .type(arquivo.getType())
            .file(arquivo.getFile()).build();

        fileRepository.save(arquivoEntity);
        return SucessModel.builder()
                .description(String.format(SUCESS_CREATING_MESSAGING,"Arquivo"))
                .object(arquivo).build();
    }

    @Override
    public SucessModel selectFile() {
        try{
            List<FileEntity> optFileEntity = fileRepository.findAll();
            List<FileDTO> fileDTOs = new ArrayList<>();

            if(optFileEntity.size() != 0) {
                for (FileEntity file : optFileEntity) {
                    FileDTO fileDTO = FileDTO.builder()
                        .id(file.getId())
                        .name(file.getName())
                        .type(file.getType())
                        .file(file.getFile()).build();
                    fileDTOs.add(fileDTO);
                }

                return SucessModel.builder()
                    .description(String.format(SUCESS_SELECTING_MESSAGING, "Professional"))
                    .object(fileDTOs).build();
            }

            throw new DataNotFoundException("Professional not found!");
        } catch (DataNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new SelectException(String.format(ERROR_SELECTING_MESSAGING, "Professiona", e.getMessage()));
        }
    }

    @Override
    public SucessModel deleteFile(Integer id) {
        try {
            fileRepository.deleteById(id);

            return SucessModel.builder()
                .description(String.format(SUCESS_DELETING_MESSAGING, "Professional")).build();
        } catch (Exception e) {
            throw new DeleteException(String.format(ERROR_DELETING_MESSAGING, "Professiona", e.getMessage()));
        }
    }
}
