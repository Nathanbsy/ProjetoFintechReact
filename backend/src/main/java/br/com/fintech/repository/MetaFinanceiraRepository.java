package br.com.fintech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fintech.model.MetaFinanceira;

public interface MetaFinanceiraRepository extends JpaRepository<MetaFinanceira, Long> {
}
