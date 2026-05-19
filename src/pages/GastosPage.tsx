import type { FormEvent } from 'react'
import { PageHeader } from '../components/PageHeader'
import { useCrud } from '../hooks/useCrud'
import type { Gasto } from '../types'
import { gastoApi } from '../utils/api'
import { formatCurrency, today } from '../utils/format'

const emptyGasto: Gasto = {
  descricao: '',
  categoria: '',
  valor: 0,
  data: today(),
  usuarioId: 1,
}

export function GastosPage() {
  const crud = useCrud(gastoApi, emptyGasto)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await crud.saveItem()
  }

  return (
    <section className="page-stack">
      <PageHeader
        eyebrow=""
        title="Gastos"
        description="Cadastre despesas por categoria e acompanhe saidas."
      />

      <section className="work-area">
        <form className="entity-form" onSubmit={handleSubmit}>
          <h2>{crud.isEditing ? 'Atualizar gasto' : 'Novo gasto'}</h2>

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
            Categoria
            <input
              value={crud.formData.categoria}
              onChange={(event) =>
                crud.setFormData((current) => ({ ...current, categoria: event.target.value }))
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

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descricao</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Usuario</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {crud.items.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>{gasto.id}</td>
                    <td>{gasto.descricao}</td>
                    <td>{gasto.categoria}</td>
                    <td>{formatCurrency(gasto.valor)}</td>
                    <td>{gasto.data}</td>
                    <td>{gasto.usuarioId}</td>
                    <td className="row-actions">
                      <button className="ghost" onClick={() => crud.editItem(gasto)} type="button">
                        Editar
                      </button>
                      <button
                        className="danger"
                        onClick={() => gasto.id && void crud.deleteItem(gasto.id)}
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
