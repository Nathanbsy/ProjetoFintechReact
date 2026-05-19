import { useState } from 'react'
import type { FormEvent } from 'react'
import { PageHeader } from '../components/PageHeader'
import { useCrud } from '../hooks/useCrud'
import type { Usuario } from '../types'
import { usuarioApi } from '../utils/api'

const emptyUsuario: Usuario = { nome: '', email: '', telefone: '' }

export function UsuariosPage() {
  const crud = useCrud(usuarioApi, emptyUsuario)
  const [emailBusca, setEmailBusca] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await crud.saveItem()
  }

  async function buscarPorEmail(event: FormEvent) {
    event.preventDefault()

    if (!emailBusca.trim()) {
      await crud.loadItems()
      return
    }

    try {
      crud.setMessage('')
      crud.setItems([await usuarioApi.buscarPorEmail(emailBusca.trim())])
    } catch (error) {
      crud.setItems([])
      crud.setMessage(error instanceof Error ? error.message : 'Usuario nao encontrado.')
    }
  }

  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="CRUD"
        title="Usuarios"
        description="Controle os usuarios vinculados as movimentacoes financeiras."
      />

      <section className="work-area">
        <form className="entity-form" onSubmit={handleSubmit}>
          <h2>{crud.isEditing ? 'Atualizar usuario' : 'Novo usuario'}</h2>

          <label>
            Nome
            <input
              value={crud.formData.nome}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, nome: event.target.value }))
              }
              required
            />
          </label>

          <label>
            E-mail
            <input
              value={crud.formData.email}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, email: event.target.value }))
              }
              required
              type="email"
            />
          </label>

          <label>
            Telefone
            <input
              value={crud.formData.telefone}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, telefone: event.target.value }))
              }
              required
            />
          </label>

          <div className="form-actions">
            <button type="submit">{crud.isEditing ? 'Salvar' : 'Criar'}</button>
            {crud.isEditing && (
              <button className="ghost" onClick={crud.cancelEdit} type="button">
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="table-panel">
          <div className="table-header">
            <h2>Registros</h2>
            <button className="ghost" onClick={crud.loadItems} type="button">
              Atualizar
            </button>
          </div>

          <form className="search-form" onSubmit={buscarPorEmail}>
            <label>
              Buscar usuario por e-mail
              <input
                value={emailBusca}
                onChange={(event) => setEmailBusca(event.target.value)}
                placeholder="nome@email.com"
                type="email"
              />
            </label>
            <button type="submit">Buscar</button>
            <button
              className="ghost"
              onClick={() => {
                setEmailBusca('')
                void crud.loadItems()
              }}
              type="button"
            >
              Limpar
            </button>
          </form>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {crud.items.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefone}</td>
                    <td className="row-actions">
                      <button className="ghost" onClick={() => crud.editItem(usuario)} type="button">
                        Editar
                      </button>
                      <button
                        className="danger"
                        onClick={() => usuario.id && void crud.deleteItem(usuario.id)}
                        type="button"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {!crud.items.length && !crud.loading && (
                  <tr>
                    <td colSpan={5}>Nenhum registro encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  )
}
