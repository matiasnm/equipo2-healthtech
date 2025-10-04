package com.equipo2.healthtech.service;

import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MfaServiceImpl implements MfaService {

    private final UserRepository userRepository;

    @Override
    public boolean verifyCode(String secret, String code) {
        //secret may be null..?
        //GoogleAuthenticator gAuth = new GoogleAuthenticator();
        //return gAuth.authorize(secret, Integer.parseInt(code));
        if (!code.equals("MOCK_MFA_SECRET")) {
            log.info("MFA MOCK -> false (use 'code: \"MOCK_MFA_SECRET\"')");
            return false;
        }
        log.info("MFA MOCK -> true");
        return true;
    }

    public String enableMfa(User user) {
        //GoogleAuthenticator gAuth = new GoogleAuthenticator();
        //final GoogleAuthenticatorKey key = gAuth.createCredentials();
        //user.setMfaSecret(key.getKey());
        //String otpAuthURL = GoogleAuthenticatorQRGenerator.getOtpAuthURL(
        //        "HealthTech", user.getEmail(), key
        //);
        //return otpAuthURL;
        user.setMfaSecret("MOCK_MFA_SECRET");
        user.setMfaRequired(true);
        userRepository.save(user);
        return "MOCK_OTP_URL";
    }
}
