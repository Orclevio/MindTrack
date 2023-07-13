package com.mindtrack.mindtrack.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class ErrorModel {

    public ErrorModel() {}

    private String error;
    private String description;
    
}
