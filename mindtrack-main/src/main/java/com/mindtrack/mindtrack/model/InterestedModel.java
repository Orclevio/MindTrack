package com.mindtrack.mindtrack.model;

import com.mindtrack.mindtrack.model.dto.SucessModel;
import com.mindtrack.mindtrack.model.dto.InterestedDTO;

public interface InterestedModel {

    SucessModel createInterested(String professionalId, InterestedDTO request);

    SucessModel updateInterested(String id, InterestedDTO request);

    SucessModel deleteInterested(String professionalId, String id);

    SucessModel selectInterested(String id);

}
