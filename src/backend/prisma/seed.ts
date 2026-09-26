import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('Erro ao criar um admin prisma');
  }

  const hash = await bcrypt.hash(adminPassword, 10);

  await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      nome: 'Administrador NAVIR',
      email: adminEmail,
      senha_hash: hash,
      tipo_usuario: 'ADMIN',
      estado_usuario: 'ACEITO',
      aceite_termos: true,
    },
  });

  await prisma.tipoProjeto.createMany({
    data: [
      {
        nome: 'Programa Institucional de Bolsas de Iniciação Científica',
        sigla: 'PIBIC',
      },
      {
        nome: 'Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação',
        sigla: 'PIBIT',
      },
      { nome: 'Projeto Independente', sigla: 'INDEPENDENTE' },
    ],
    skipDuplicates: true,
  });

  await prisma.agencia.createMany({
    data: [
      {
        nome: 'Fundação de Amparo à Pesquisa do Estado do Amazonas',
        sigla: 'FAPEAM',
      },
      {
        nome: 'Conselho Nacional de Desenvolvimento Científico e Tecnológico',
        sigla: 'CNPq',
      },
      { nome: 'Universidade Federal do Amazonas', sigla: 'UFAM' },
    ],
    skipDuplicates: true,
  });

  const habilidadesBase = [
    'Python',
    'TypeScript',
    'React',
    'Node.js',
    'NestJS',
    'Inteligência Artificial',
    'Machine Learning',
    'IoT',
    'PostgreSQL',
    'Docker',
  ];

  for (const nome of habilidadesBase) {
    const existe = await prisma.habilidade.findFirst({ where: { nome } });
    if (!existe) {
      await prisma.habilidade.create({ data: { nome } });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
