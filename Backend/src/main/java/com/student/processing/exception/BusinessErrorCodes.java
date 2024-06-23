package com.student.processing.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum BusinessErrorCodes {

    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    INCORRECT_CURRENT_PASSWORD(400, BAD_REQUEST, "Current password is incorrect"),
    BAD_CREDENTIALS(403, FORBIDDEN, "Email and/or password is incorrect"),
    LOGOUT_EXCEPTION(400, BAD_REQUEST, "Token passed is invalid"),
    IMAGE_UPLOAD_EXCEPTION(417, EXPECTATION_FAILED, "Image is invalid"),
    ENTITY_NOT_FOUND(404, NOT_FOUND, "Requested entity does not exist"),
    INVALID_DATA_FORMAT(400, BAD_REQUEST, "Data format is invalid!"),
    ACCESS_DENIED(403, FORBIDDEN, "You do not have the rights to perform this action")
    ;

    private final int code;

    private final String description;

    private final HttpStatus httpStatusCode;

    BusinessErrorCodes(int code, HttpStatus httpStatusCode, String description) {
        this.code = code;
        this.description = description;
        this.httpStatusCode = httpStatusCode;
    }
}
