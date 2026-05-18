package br.com.fintech.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.fintech.model.MetaFinanceira;

public record MetaFinanceiraResponse(
        Long id,
        String titulo,
        BigDecimal valorAlvo,
        BigDecimal valorAtual,
        LocalDate prazo,
        Long usuarioId) {

    public static MetaFinanceiraResponse fromEntity(MetaFinanceira meta) {
        return new MetaFinanceiraResponse(
                meta.getId(),
                meta.getTitulo(),
                meta.getValorAlvo(),
                meta.getValorAtual(),
                meta.getPrazo(),
                meta.getUsuario().getId());
    }
}
