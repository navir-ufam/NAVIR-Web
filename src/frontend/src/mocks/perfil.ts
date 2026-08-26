import type { PerfilPesquisador } from '@/types'
import { mockUsuarios } from './usuarios'
import { mockProjetos } from './projetos'

export const mockPerfil: PerfilPesquisador = {
  usuario: mockUsuarios[2], // Maria Pesquisadora Aceita (ID: 3)
  curriculo_lattes: 'http://lattes.cnpq.br/1234567890123456',
  link_github: 'https://github.com/mariapesquisadora',
  biografia: 'Pesquisadora em Sistemas Embarcados e Internet das Coisas no Laboratório NAVIR/UFAM. Interesse em otimização de redes neurais para borda e comunicação sem fio de baixo consumo.',
  habilidades: [
    'Python',
    'Inteligência Artificial',
    'Robótica',
    'IoT & Embedded',
    'React',
    'TypeScript',
    'C/C++',
  ],
  projetos: [mockProjetos[0], mockProjetos[1]],
  formacao_academica: [
    {
      curso: 'Engenharia da Computação',
      instituicao: 'Universidade Federal do Amazonas (UFAM)',
      ano_inicio: 2023,
      ano_conclusao: 2027,
    },
  ],
}
