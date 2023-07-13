package com.mindtrack.mindtrack.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AppConstant {

    public static final String SCHEMA = "mindtrack";
    public static final String SUCESS_CREATING_MESSAGING = "Sucess %s creating";
    public static final String SUCESS_UPDATING_MESSAGING = "Sucess %s updating";
    public static final String ERROR_CREATING_MESSAGING = "Error %s creating - excpetion: %s";
    public static final String ERROR_UPDATING_MESSAGING = "Erro %s  updating - exception: %s";
    public static final String SUCESS_DELETING_MESSAGING = "Sucess %s deleting";
    public static final String SUCESS_SELECTING_MESSAGING = "Sucess %s selecting";
    public static final String ERROR_DELETING_MESSAGING = "Error %s deleting - excpetion: %s";
    public static final String ERROR_SELECTING_MESSAGING = "Erro %s  selecting - exception: %s";

}
