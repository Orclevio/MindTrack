package com.mindtrack.mindtrack.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class FileDTO {

    public FileDTO() {}

    private Integer id;
    private String name;
    private String type;
    private byte[] file;
}
