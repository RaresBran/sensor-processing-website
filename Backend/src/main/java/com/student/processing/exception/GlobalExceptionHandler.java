package com.student.processing.exception;

import com.student.processing.exception.exceptions.EmailAlreadyExistsException;
import com.student.processing.exception.exceptions.LogoutException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

import static com.student.processing.exception.BusinessErrorCodes.*;
import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionResponse> handleException(AccessDeniedException exp) {
        return ResponseEntity
                .status(ACCESS_DENIED.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ACCESS_DENIED.getCode())
                                .businessErrorDescription(ACCESS_DENIED.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> handleException(DataIntegrityViolationException exp) {
        String errorMessage = INVALID_DATA_FORMAT.getDescription();

        if (exp.getCause() instanceof org.hibernate.exception.ConstraintViolationException constraintViolationException) {
            String constraintMessage = constraintViolationException.getSQLException().getMessage();

            // Check if the constraint violation is due to a unique constraint on the email field
            if (constraintMessage != null && constraintMessage.contains("email")) {
                errorMessage = "User already exists!";
            }
        }

        return ResponseEntity
                .status(INVALID_DATA_FORMAT.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(INVALID_DATA_FORMAT.getCode())
                                .businessErrorDescription(errorMessage)
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleException(EmailAlreadyExistsException exp) {
        return ResponseEntity
                .status(EMAIL_ALREADY_EXISTS.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(EMAIL_ALREADY_EXISTS.getCode())
                                .businessErrorDescription(EMAIL_ALREADY_EXISTS.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(LogoutException.class)
    public ResponseEntity<ExceptionResponse> handleException(LogoutException exp) {
        return ResponseEntity
                .status(LOGOUT_EXCEPTION.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(LOGOUT_EXCEPTION.getCode())
                                .businessErrorDescription(LOGOUT_EXCEPTION.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleException(EntityNotFoundException exp) {
        return ResponseEntity
                .status(ENTITY_NOT_FOUND.getCode())
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(ENTITY_NOT_FOUND.getCode())
                                .businessErrorDescription(ENTITY_NOT_FOUND.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException exp) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BAD_CREDENTIALS.getDescription())
                                .error(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException exp) {
        Set<String> errors = new HashSet<>();
        exp.getBindingResult().getAllErrors()
                .forEach(error -> {
                    var errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                });
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validationErrors(errors)
                                .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
        //log the exception
        exp.printStackTrace();
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Internal error!")
                                .error(exp.getMessage())
                                .build()
                );
    }
}
