package br.com.fintech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fintech.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
