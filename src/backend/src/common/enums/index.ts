export enum TipoUsuario {
  ADMIN = 'ADMIN',
  PROFESSOR = 'PROFESSOR',
  PESQUISADOR = 'PESQUISADOR',
  INTERESSADO = 'INTERESSADO',
}

export enum EstadoUsuario {
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  NEGADO = 'NEGADO',
}

export enum StatusAcademico {
  REGULAR = 'REGULAR',
  FINALISTA = 'FINALISTA',
  INATIVO = 'INATIVO',
  EGRESSO = 'EGRESSO',
  DESISTENTE = 'DESISTENTE',
}

export enum StatusProjeto {
  ATIVO = 'ATIVO',
  FINALIZADO = 'FINALIZADO',
}

export enum StatusDispositivo {
  PENDENTE = 'PENDENTE',
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export enum TipoDispositivo {
  NOTEBOOK = 'NOTEBOOK',
  CELULAR = 'CELULAR',
  TABLET = 'TABLET',
  OUTRO = 'OUTRO',
}

export enum StatusAcessoLab {
  PENDENTE = 'PENDENTE',
  AUTORIZADO = 'AUTORIZADO',
  BLOQUEADO = 'BLOQUEADO',
}
