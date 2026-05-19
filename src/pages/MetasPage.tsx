import type { FormEvent } from 'react'
import { PageHeader } from '../components/PageHeader'
import { useCrud } from '../hooks/useCrud'
import type { Meta } from '../types'
import { metaApi } from '../utils/api'
import { formatCurrency, today } from '../utils/format'

const emptyMeta: Meta = {
  titulo: '',
  valorAlvo: 0,
  valorAtual: 0,
  prazo: today(),
  usuarioId: 1,
}

export function MetasPage() {
  const crud = useCrud(metaApi, emptyMeta)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await crud.saveItem()
  }

  return (
    <section className="page-stack">
      <PageHeader
        eyebrow=""
        title="Metas"
        description="Planeje objetivos financeiros e atualize o progresso."
      />

      <section className="work-area">
        <form className="entity-form" onSubmit={handleSubmit}>
          <h2>{crud.isEditing ? 'Atualizar meta' : 'Nova meta'}</h2>

          <label>
            Titulo
            <input
              value={crud.formData.titulo}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, titulo: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Valor alvo
            <input
              value={crud.formData.valorAlvo}
              onChange={(event) =>
                crud.setFormData((current) => ({
                  ...current,
                  valorAlvo: Number(event.target.value),
                }))
              }
              min="0"
              required
              step="0.01"
              type="number"
            />
          </label>

          <label>
            Valor atual
            <input
              value={crud.formData.valorAtual}
              onChange={(event) =>
                crud.setFormData((current) => ({
                  ...current,
                  valorAtual: Number(event.target.value),
                }))
              }
              min="0"
              required
              step="0.01"
              type="number"
            />
          </label>

          <label>
            Prazo
            <input
              value={crud.formData.prazo}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, prazo: event.target.value }))
              }
              required
              type="date"
            />
          </label>

          <label>
            ID do usuario
            <input
              value={crud.formData.usuarioId}
              onChange={(event) =>
                crud.setFormData((current) => ({
                  ...current,
                  usuarioId: Number(event.target.value),
                }))
              }
              min="1"
              required
              type="number"
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

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titulo</th>
                  <th>Alvo</th>
                  <th>Atual</th>
                  <th>Prazo</th>
                  <th>Usuario</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {crud.items.map((meta) => (
                  <tr key={meta.id}>
                    <td>{meta.id}</td>
                    <td>{meta.titulo}</td>
                    <td>{formatCurrency(meta.valorAlvo)}</td>
                    <td>{formatCurrency(meta.valorAtual)}</td>
                    <td>{meta.prazo}</td>
                    <td>{meta.usuarioId}</td>
                    <td className="row-actions">
                      <button className="ghost" onClick={() => crud.editItem(meta)} type="button">
                        Editar
                      </button>
                      <button
                        className="danger"
                        onClick={() => meta.id && void crud.deleteItem(meta.id)}
                        type="button"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {!crud.items.length && !crud.loading && (
                  <tr>
                    <td colSpan={7}>Nenhum registro encontrado.</td>
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
