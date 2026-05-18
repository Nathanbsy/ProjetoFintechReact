package br.com.fintech.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.fintech.model.Receita;

public record ReceitaResponse(
        Long id,
        String descricao,
        String origem,
        BigDecimal valor,
        LocalDate data,
        Long usuarioId) {

    public static ReceitaResponse fromEntity(Receita receita) {
        return new ReceitaResponse(
                receita.getId(),
                receita.getDescricao(),
                receita.getOrigem(),
                receita.getValor(),
                receita.getData(),
                receita.getUsuario().getId());
    }
}
