import { useParams } from 'react-router-dom'
import { PagePlaceholder } from '@/components/layout'

function UsuarioDetalhePage() {
  const { id } = useParams<{ id: string }>()

  return (
    <PagePlaceholder
      title={`Detalhe do Usuário #${id || ''}`}
      description="Tela T12 - Detalhamento completo do usuário para decisão de aprovação, bloqueio ou alteração."
    />
  )
}

export default UsuarioDetalhePage
