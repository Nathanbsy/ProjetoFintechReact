package br.com.fintech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fintech.model.Receita;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
}
