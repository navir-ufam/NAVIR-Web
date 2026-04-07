# Dev Log Async - NAVIR-Web

Este é o log de desenvolvimento assíncrono do projeto. A ideia é deixar apenas rastros do que foi pensado e modificado, para que com 1 ou 2 minutos de leitura, o parceiro saiba onde o projeto está quando ele iniciar o trabalho dele no dia e o que de fato aconteceu por trás dos PRs!

## [07-04-2026] - @evelimbacury
- **O que fiz:** Sincronizei toda a documentacao de suporte com o novo [requisitos](requisitos.md), atualizando [api-rest](api-rest.md), [arquitetura](arquitetura.md), [backend](backend.md), [banco](banco.md), [frontend](frontend.md) e [regras-de-negocio](regras-de-negocio.md).
- **Decisoes/Mudancas:** Padronizei rotas em `/api/v1`, removi referencia de biometria persistida (mantendo apenas status de acesso), alinhei os estados de usuario para `PENDENTE/ACEITO/NEGADO`, consolidei o comportamento de INTERESSADO e corrigi regra de EGRESSO para 2 meses de inatividade conforme requisitos.
- **Atencao/Impacto pro Outro Dev:** Alguns nomes de endpoint e dominio foram normalizados nos docs; validar se implementacao atual segue os mesmos contratos antes de iniciar telas e casos de teste.
- **Proximo passo:** Revisar README principal para espelhar o mesmo recorte funcional e incluir uma secao curta de matriz "regra -> endpoint -> tabela" para facilitar onboarding.

## [05-04-2026] - @ApenasUmExemploDeseUsuario
- **O que fiz:** Modelei as tabelas de Projetos e Tabelas Relacionais N:M de Tags. Mandei o PR [#10].
- **Decisões/Mudanças:** Na tabela de projeto decidi que em vez de salvar a "agência de fomento" em uma tabela em outro lugar, era melhor usar um ENUM temporário lá para ser simples. Mas já tem comentário se a gente precisar abstrair depois.
- **Atenção/Impacto pro Outro Dev:** A rota de "Perfil" vai quebrar localmente pra você até aceitar o PR novo do Auth, aviso logo porque mudei a forma como o Token JWT do Nest entrega o ID do Usuário. Lembre de mandar rodar \`npm run migration:run\` pra ver funcionar novo.
- **Se precisar da minha ajuda:** Me avise no Slack/WhatsApp, estarei online às 18h no PC de novo.
- **Próximo passo:** Subir o Endpoint de GET Meus Projetos.
