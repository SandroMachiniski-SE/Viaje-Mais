"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
const pontosRouter = (0, express_1.Router)();
const buscaSchema = zod_1.z.object({
    cidade: zod_1.z.string().trim().min(1).optional(),
    categoria: zod_1.z.string().trim().min(1).optional(),
    busca: zod_1.z.string().trim().min(1).optional(),
    limite: zod_1.z.coerce.number().int().min(1).max(100).default(20),
});
pontosRouter.get("/", async (req, res) => {
    try {
        const resultado = buscaSchema.safeParse(req.query);
        if (!resultado.success) {
            return res.status(400).json({
                erro: "Parâmetros de busca inválidos.",
                detalhes: resultado.error.flatten(),
            });
        }
        const { cidade, categoria, busca, limite } = resultado.data;
        const pontos = await prisma_1.default.pontoTuristico.findMany({
            where: {
                status: client_1.StatusPonto.PUBLICADO,
                ...(cidade
                    ? {
                        cidade: {
                            contains: cidade,
                            mode: "insensitive",
                        },
                    }
                    : {}),
                ...(categoria
                    ? {
                        categoria: {
                            contains: categoria,
                            mode: "insensitive",
                        },
                    }
                    : {}),
                ...(busca
                    ? {
                        OR: [
                            {
                                nome: {
                                    contains: busca,
                                    mode: "insensitive",
                                },
                            },
                            {
                                descricao: {
                                    contains: busca,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    }
                    : {}),
            },
            orderBy: {
                nome: "asc",
            },
            take: limite,
            select: {
                id: true,
                nome: true,
                descricao: true,
                categoria: true,
                cidade: true,
                endereco: true,
                latitude: true,
                longitude: true,
                faixaPreco: true,
                acessibilidade: true,
                siteOficial: true,
                telefoneContato: true,
                status: true,
                seloVerificado: true,
            },
        });
        return res.json({
            total: pontos.length,
            dados: pontos,
        });
    }
    catch (error) {
        console.error("Erro ao buscar pontos turísticos:", error);
        return res.status(500).json({
            erro: "Erro interno ao buscar pontos turísticos.",
        });
    }
});
pontosRouter.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: "Identificador inválido.",
            });
        }
        const ponto = await prisma_1.default.pontoTuristico.findFirst({
            where: {
                id,
                status: client_1.StatusPonto.PUBLICADO,
            },
            select: {
                id: true,
                nome: true,
                descricao: true,
                categoria: true,
                cidade: true,
                endereco: true,
                latitude: true,
                longitude: true,
                faixaPreco: true,
                acessibilidade: true,
                siteOficial: true,
                telefoneContato: true,
                status: true,
                seloVerificado: true,
                dataCriacao: true,
                dataAtualizacao: true,
                responsavel: {
                    select: {
                        id: true,
                        nome: true,
                    },
                },
            },
        });
        if (!ponto) {
            return res.status(404).json({
                erro: "Ponto turístico não encontrado.",
            });
        }
        return res.json(ponto);
    }
    catch (error) {
        console.error("Erro ao buscar detalhe do ponto:", error);
        return res.status(500).json({
            erro: "Erro interno ao buscar ponto turístico.",
        });
    }
});
exports.default = pontosRouter;
