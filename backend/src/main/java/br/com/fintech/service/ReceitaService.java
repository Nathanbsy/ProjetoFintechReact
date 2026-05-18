package br.com.fintech.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.fintech.dto.ReceitaRequest;
import br.com.fintech.exception.RecursoNaoEncontradoException;
import br.com.fintech.model.Receita;
import br.com.fintech.model.Usuario;
import br.com.fintech.repository.ReceitaRepository;

@Service
public class ReceitaService {

    private final ReceitaRepository repository;
    private final UsuarioService usuarioService;

    public ReceitaService(ReceitaRepository repository, UsuarioService usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
    }

    public List<Receita> listar() {
        return repository.findAll();
    }

    public Receita buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Receita nao encontrada."));
    }

    public Receita criar(ReceitaRequest request) {
        Receita receita = new Receita();
        preencherDados(receita, request);
        return repository.save(receita);
    }

    public Receita atualizar(Long id, ReceitaRequest request) {
        Receita receita = buscarPorId(id);
        preencherDados(receita, request);
        return repository.save(receita);
    }

    public void deletar(Long id) {
        Receita receita = buscarPorId(id);
        repository.delete(receita);
    }

    private void preencherDados(Receita receita, ReceitaRequest request) {
        Usuario usuario = usuarioService.buscarPorId(request.usuarioId());
        receita.setDescricao(request.descricao());
        receita.setOrigem(request.origem());
        receita.setValor(request.valor());
        receita.setData(request.data());
        receita.setUsuario(usuario);
    }
}
