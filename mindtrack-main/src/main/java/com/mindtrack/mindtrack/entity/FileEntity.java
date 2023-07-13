package com.mindtrack.mindtrack.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Lob;


import static com.mindtrack.mindtrack.constant.AppConstant.SCHEMA;

@Entity(name = "FileEntity")
@Table(schema = SCHEMA, name = "file")
@Builder
@AllArgsConstructor
@Getter
@Setter
public class FileEntity {

    public FileEntity() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type    ;

    @Column(name = "file")
    private byte[] file;
    
}
