package br.com.fintech.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.fintech.dto.GastoRequest;
import br.com.fintech.exception.RecursoNaoEncontradoException;
import br.com.fintech.model.Gasto;
import br.com.fintech.model.Usuario;
import br.com.fintech.repository.GastoRepository;

@Service
public class GastoService {

    private final GastoRepository repository;
    private final UsuarioService usuarioService;

    public GastoService(GastoRepository repository, UsuarioService usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
    }

    public List<Gasto> listar() {
        return repository.findAll();
    }

    public Gasto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Gasto nao encontrado."));
    }

    public Gasto criar(GastoRequest request) {
        Gasto gasto = new Gasto();
        preencherDados(gasto, request);
        return repository.save(gasto);
    }

    public Gasto atualizar(Long id, GastoRequest request) {
        Gasto gasto = buscarPorId(id);
        preencherDados(gasto, request);
        return repository.save(gasto);
    }

    public void deletar(Long id) {
        Gasto gasto = buscarPorId(id);
        repository.delete(gasto);
    }

    private void preencherDados(Gasto gasto, GastoRequest request) {
        Usuario usuario = usuarioService.buscarPorId(request.usuarioId());
        gasto.setDescricao(request.descricao());
        gasto.setCategoria(request.categoria());
        gasto.setValor(request.valor());
        gasto.setData(request.data());
        gasto.setUsuario(usuario);
    }
}
