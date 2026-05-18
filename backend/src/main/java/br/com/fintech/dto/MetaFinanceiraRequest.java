package br.com.fintech.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record MetaFinanceiraRequest(
        @NotBlank String titulo,
        @Positive BigDecimal valorAlvo,
        @PositiveOrZero BigDecimal valorAtual,
        @NotNull LocalDate prazo,
        @NotNull Long usuarioId) {
}
