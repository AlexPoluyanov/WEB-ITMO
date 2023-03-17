package alex.weblab4.controllers;

import alex.weblab4.DTO.JwtDTO;
import alex.weblab4.DTO.UserDTO;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import alex.weblab4.entities.User;
import alex.weblab4.security.jwt.JwtUtils;
import alex.weblab4.security.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthorizationController {
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @SneakyThrows
    @PostMapping("/login")
    ResponseEntity<?> login(@Validated @RequestBody UserDTO userDTO) {
        User user = (User) userService.loadUserByUsername(userDTO.getUsername());
        if (user == null) {
            return ResponseEntity.badRequest().body("Неверное имя пользователя или пароль.");
        } else if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Неверное имя пользователя или пароль.");
        } else {
            String jwt = jwtUtils.generateJwtToken(userDTO.getUsername());
            return ResponseEntity.ok(new JwtDTO(userDTO.getUsername(), jwt));
        }

    }

    @SneakyThrows
    @PostMapping("/register")
    ResponseEntity<?> register(@Validated @RequestBody UserDTO userDTO) {
        if (userService.loadUserByUsername(userDTO.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Имя пользователя '" + userDTO.getUsername() + "' уже используется.");
        }
        userService.addUser(new User(
                userDTO.getUsername(),
                passwordEncoder.encode(userDTO.getPassword())
        ));
        return ResponseEntity.ok().body(userDTO.getUsername());
    }
}
