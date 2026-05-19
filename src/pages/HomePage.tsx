import { PageHeader } from '../components/PageHeader'

export function HomePage() {

  return (
    <section className="page-stack">
      <div>
        <p></p>
      </div>
      <PageHeader
        eyebrow="Seja Bem-Vindo ao projeto Fintech com React!"
        title="Controle financeiro pessoal"
        description="Aqui você poderá organizar gastos, receitas e metas com telas de cadastro, consulta, atualização e remoção."
      />
    </section>
  )
}
