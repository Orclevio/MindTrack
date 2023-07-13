package com.mindtrack.mindtrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mindtrack.mindtrack.entity.InterestedEntity;

@Repository
public interface InterestedRepository extends JpaRepository<InterestedEntity, String> {

}
