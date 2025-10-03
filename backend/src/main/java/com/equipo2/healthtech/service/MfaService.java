package com.equipo2.healthtech.service;

import com.equipo2.healthtech.model.user.User;

public interface MfaService {

    public boolean verifyCode(String secret, String code);

    public String enableMfa(User user);

}