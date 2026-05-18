package br.com.fintech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fintech.model.Gasto;

public interface GastoRepository extends JpaRepository<Gasto, Long> {
}
