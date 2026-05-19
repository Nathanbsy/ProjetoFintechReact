import type { FormEvent } from 'react'
import { PageHeader } from '../components/PageHeader'
import { StatusMessages } from '../components/StatusMessages'
import { useCrud } from '../hooks/useCrud'
import type { Receita } from '../types'
import { receitaApi } from '../utils/api'
import { formatCurrency, today } from '../utils/format'

const emptyReceita: Receita = {
  descricao: '',
  origem: '',
  valor: 0,
  data: today(),
  usuarioId: 1,
}

export function ReceitasPage() {
  const crud = useCrud(receitaApi, emptyReceita)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await crud.saveItem()
  }

  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="CRUD"
        title="Receitas"
        description="Registre entradas, origem dos valores e historico mensal."
      />

      <section className="work-area">
        <form className="entity-form" onSubmit={handleSubmit}>
          <h2>{crud.isEditing ? 'Atualizar receita' : 'Nova receita'}</h2>

          <label>
            Descricao
            <input
              value={crud.formData.descricao}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, descricao: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Origem
            <input
              value={crud.formData.origem}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, origem: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Valor
            <input
              value={crud.formData.valor}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, valor: Number(event.target.value) }))
              }
              min="0"
              required
              step="0.01"
              type="number"
            />
          </label>

          <label>
            Data
            <input
              value={crud.formData.data}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, data: event.target.value }))
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

          <StatusMessages loading={crud.loading} message={crud.message} />

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descricao</th>
                  <th>Origem</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Usuario</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {crud.items.map((receita) => (
                  <tr key={receita.id}>
                    <td>{receita.id}</td>
                    <td>{receita.descricao}</td>
                    <td>{receita.origem}</td>
                    <td>{formatCurrency(receita.valor)}</td>
                    <td>{receita.data}</td>
                    <td>{receita.usuarioId}</td>
                    <td className="row-actions">
                      <button className="ghost" onClick={() => crud.editItem(receita)} type="button">
                        Editar
                      </button>
                      <button
                        className="danger"
                        onClick={() => receita.id && void crud.deleteItem(receita.id)}
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
