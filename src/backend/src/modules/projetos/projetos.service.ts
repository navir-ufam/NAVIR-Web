import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjetosService {
  async criar(): Promise<void> {
    // Placeholder para criação de projeto (PIBIC/PIBIT/Independente)
  }

  async listar(): Promise<void> {
    // Placeholder para listar projetos com filtros (status, professor, tipo)
  }

  async atualizar(): Promise<void> {
    // Placeholder para atualização cadastral parcial de projetos
  }

  async finalizar(): Promise<void> {
    // Placeholder para finalização automática por data ou manual por permissão
  }
}
