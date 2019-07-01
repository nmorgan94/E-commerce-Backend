package com.morgan.nick.payloads;

import javax.validation.constraints.*;
import lombok.Data;

@Data
public class SignUpRequest {
	
	public SignUpRequest() {}
	
    @NotBlank
    private String name;

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private String password;
    
}