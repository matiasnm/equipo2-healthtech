package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByIdAndRole(Long id, Role role);

    List<User> findAllByRole(Role role);

}