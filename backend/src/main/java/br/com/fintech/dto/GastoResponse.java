package br.com.fintech.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.fintech.model.Gasto;

public record GastoResponse(
        Long id,
        String descricao,
        String categoria,
        BigDecimal valor,
        LocalDate data,
        Long usuarioId) {

    public static GastoResponse fromEntity(Gasto gasto) {
        return new GastoResponse(
                gasto.getId(),
                gasto.getDescricao(),
                gasto.getCategoria(),
                gasto.getValor(),
                gasto.getData(),
                gasto.getUsuario().getId());
    }
}
