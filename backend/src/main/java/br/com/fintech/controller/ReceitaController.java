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

import br.com.fintech.dto.ReceitaRequest;
import br.com.fintech.dto.ReceitaResponse;
import br.com.fintech.model.Receita;
import br.com.fintech.service.ReceitaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/receitas")
public class ReceitaController {

    private final ReceitaService service;

    public ReceitaController(ReceitaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ReceitaResponse>> listar() {
        return ResponseEntity.ok(service.listar().stream().map(ReceitaResponse::fromEntity).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceitaResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ReceitaResponse.fromEntity(service.buscarPorId(id)));
    }

    @PostMapping
    public ResponseEntity<ReceitaResponse> criar(@Valid @RequestBody ReceitaRequest request) {
        Receita criado = service.criar(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(criado.getId())
                .toUri();
        return ResponseEntity.created(location).body(ReceitaResponse.fromEntity(criado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReceitaResponse> atualizar(@PathVariable Long id, @Valid @RequestBody ReceitaRequest request) {
        return ResponseEntity.ok(ReceitaResponse.fromEntity(service.atualizar(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
