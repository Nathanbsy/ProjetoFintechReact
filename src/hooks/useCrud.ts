import { useCallback, useEffect, useState } from 'react'

interface CrudApi<T extends { id?: number }> {
  listar: () => Promise<T[]>
  criar: (item: T) => Promise<T>
  atualizar: (id: number, item: T) => Promise<T>
  deletar: (id: number) => Promise<void>
}

export function useCrud<T extends { id?: number }>(api: CrudApi<T>, emptyItem: T) {
  const [items, setItems] = useState<T[]>([])
  const [formData, setFormData] = useState<T>(emptyItem)
  const [editingId, setEditingId] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const isEditing = editingId !== undefined

  const loadItems = useCallback(async () => {
    setLoading(true)
    setMessage('')
    try {
      setItems(await api.listar())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro inesperado.')
    } finally {
      setLoading(false)
    }
  }, [api])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadItems()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadItems])

  async function saveItem() {
    try {
      if (isEditing) {
        await api.atualizar(editingId, formData)
      } else {
        await api.criar(formData)
      }

      setFormData(emptyItem)
      setEditingId(undefined)
      setMessage(isEditing ? 'Registro atualizado com sucesso.' : 'Registro criado com sucesso.')
      await loadItems()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro inesperado.')
    }
  }

  async function deleteItem(id: number) {
    try {
      await api.deletar(id)
      setMessage('Registro removido com sucesso.')
      await loadItems()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro inesperado.')
    }
  }

  function editItem(item: T) {
    setEditingId(item.id)
    setFormData(item)
  }

  function cancelEdit() {
    setEditingId(undefined)
    setFormData(emptyItem)
  }

  return {
    cancelEdit,
    deleteItem,
    editItem,
    editingId,
    formData,
    isEditing,
    items,
    loadItems,
    loading,
    message,
    saveItem,
    setFormData,
    setItems,
    setMessage,
  }
}
