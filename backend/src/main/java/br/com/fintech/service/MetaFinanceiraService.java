package br.com.fintech.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.fintech.dto.MetaFinanceiraRequest;
import br.com.fintech.exception.RecursoNaoEncontradoException;
import br.com.fintech.model.MetaFinanceira;
import br.com.fintech.model.Usuario;
import br.com.fintech.repository.MetaFinanceiraRepository;

@Service
public class MetaFinanceiraService {

    private final MetaFinanceiraRepository repository;
    private final UsuarioService usuarioService;

    public MetaFinanceiraService(MetaFinanceiraRepository repository, UsuarioService usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
    }

    public List<MetaFinanceira> listar() {
        return repository.findAll();
    }

    public MetaFinanceira buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Meta financeira nao encontrada."));
    }

    public MetaFinanceira criar(MetaFinanceiraRequest request) {
        MetaFinanceira meta = new MetaFinanceira();
        preencherDados(meta, request);
        return repository.save(meta);
    }

    public MetaFinanceira atualizar(Long id, MetaFinanceiraRequest request) {
        MetaFinanceira meta = buscarPorId(id);
        preencherDados(meta, request);
        return repository.save(meta);
    }

    public void deletar(Long id) {
        MetaFinanceira meta = buscarPorId(id);
        repository.delete(meta);
    }

    private void preencherDados(MetaFinanceira meta, MetaFinanceiraRequest request) {
        Usuario usuario = usuarioService.buscarPorId(request.usuarioId());
        meta.setTitulo(request.titulo());
        meta.setValorAlvo(request.valorAlvo());
        meta.setValorAtual(request.valorAtual());
        meta.setPrazo(request.prazo());
        meta.setUsuario(usuario);
    }
}
