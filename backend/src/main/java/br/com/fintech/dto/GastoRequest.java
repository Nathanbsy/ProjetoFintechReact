package br.com.fintech.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record GastoRequest(
        @NotBlank String descricao,
        @NotBlank String categoria,
        @Positive BigDecimal valor,
        @NotNull LocalDate data,
        @NotNull Long usuarioId) {
}
