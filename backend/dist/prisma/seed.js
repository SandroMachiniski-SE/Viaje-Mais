"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const usuario = await prisma.usuario.upsert({
        where: {
            email: "admin@NomadPlanmais.local",
        },
        update: {},
        create: {
            nome: "Administrador NomadPlan",
            email: "admin@NomadPlanmais.local",
            senhaHash: "senha-temporaria",
            tipoConta: client_1.TipoConta.ADMIN,
            cidadeBase: "Joinville",
        },
    });
    await prisma.pontoTuristico.createMany({
        data: [
            {
                nome: "Mirante de Joinville",
                descricao: "Ponto turístico com vista panorâmica da cidade.",
                categoria: "Natureza",
                cidade: "Joinville",
                endereco: "Joinville, SC",
                latitude: -26.3045,
                longitude: -48.8487,
                faixaPreco: "Gratuito",
                acessibilidade: "A verificar",
                status: client_1.StatusPonto.PUBLICADO,
                idResponsavel: usuario.id,
            },
            {
                nome: "Museu Nacional de Imigração e Colonização",
                descricao: "Espaço histórico e cultural dedicado à imigração em Joinville.",
                categoria: "Cultura",
                cidade: "Joinville",
                endereco: "Rua Rio Branco, 229, Joinville - SC",
                latitude: -26.3041,
                longitude: -48.8466,
                faixaPreco: "Gratuito",
                acessibilidade: "Acessibilidade parcial",
                status: client_1.StatusPonto.PUBLICADO,
                idResponsavel: usuario.id,
            },
            {
                nome: "Parque Zoobotânico",
                descricao: "Área verde para lazer, caminhada e contato com a natureza.",
                categoria: "Natureza",
                cidade: "Joinville",
                endereco: "Rua Pastor Guilherme Rau, Joinville - SC",
                latitude: -26.2969,
                longitude: -48.8429,
                faixaPreco: "Gratuito",
                acessibilidade: "A verificar",
                status: client_1.StatusPonto.PUBLICADO,
                idResponsavel: usuario.id,
            },
        ],
        skipDuplicates: true,
    });
    console.log("Dados iniciais inseridos com sucesso.");
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
