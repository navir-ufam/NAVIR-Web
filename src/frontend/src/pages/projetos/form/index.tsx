import { useParams } from 'react-router-dom'
import { PagePlaceholder } from '@/components/layout'

function ProjetoFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)

  return (
    <PagePlaceholder
      title={isEditing ? `Editar Projeto #${id}` : 'Novo Projeto'}
      description="Tela T35 - Formulário para criação e edição de projetos (PIBIC/PIBIT e outros)."
    />
  )
}

export default ProjetoFormPage
