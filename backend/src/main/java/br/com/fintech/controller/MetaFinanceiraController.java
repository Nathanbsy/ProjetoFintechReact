package br.com.fintech.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.fintech.dto.MetaFinanceiraRequest;
import br.com.fintech.dto.MetaFinanceiraResponse;
import br.com.fintech.model.MetaFinanceira;
import br.com.fintech.service.MetaFinanceiraService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/metas")
public class MetaFinanceiraController {

    private final MetaFinanceiraService service;

    public MetaFinanceiraController(MetaFinanceiraService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<MetaFinanceiraResponse>> listar() {
        return ResponseEntity.ok(service.listar().stream().map(MetaFinanceiraResponse::fromEntity).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetaFinanceiraResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(MetaFinanceiraResponse.fromEntity(service.buscarPorId(id)));
    }

    @PostMapping
    public ResponseEntity<MetaFinanceiraResponse> criar(@Valid @RequestBody MetaFinanceiraRequest request) {
        MetaFinanceira criado = service.criar(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(criado.getId())
                .toUri();
        return ResponseEntity.created(location).body(MetaFinanceiraResponse.fromEntity(criado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetaFinanceiraResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody MetaFinanceiraRequest request) {
        return ResponseEntity.ok(MetaFinanceiraResponse.fromEntity(service.atualizar(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
