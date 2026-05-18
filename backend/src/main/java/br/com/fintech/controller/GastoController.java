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

import br.com.fintech.dto.GastoRequest;
import br.com.fintech.dto.GastoResponse;
import br.com.fintech.model.Gasto;
import br.com.fintech.service.GastoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/gastos")
public class GastoController {

    private final GastoService service;

    public GastoController(GastoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<GastoResponse>> listar() {
        return ResponseEntity.ok(service.listar().stream().map(GastoResponse::fromEntity).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GastoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(GastoResponse.fromEntity(service.buscarPorId(id)));
    }

    @PostMapping
    public ResponseEntity<GastoResponse> criar(@Valid @RequestBody GastoRequest request) {
        Gasto criado = service.criar(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(criado.getId())
                .toUri();
        return ResponseEntity.created(location).body(GastoResponse.fromEntity(criado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GastoResponse> atualizar(@PathVariable Long id, @Valid @RequestBody GastoRequest request) {
        return ResponseEntity.ok(GastoResponse.fromEntity(service.atualizar(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
