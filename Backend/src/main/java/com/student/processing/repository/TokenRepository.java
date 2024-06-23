package com.student.processing.repository;

import com.student.processing.model.entitypostgres.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface TokenRepository extends JpaRepository<Token, String> {

    List<Token> findAllByUserIdAndExpiredFalseAndRevokedFalse(String userId);

    Optional<Token> findByToken(String token);
}
