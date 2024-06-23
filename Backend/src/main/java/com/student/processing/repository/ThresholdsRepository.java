package com.student.processing.repository;

import com.student.processing.model.entityredis.Thresholds;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThresholdsRepository extends CrudRepository<Thresholds, String> {
}
