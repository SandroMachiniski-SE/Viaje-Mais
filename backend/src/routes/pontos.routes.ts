import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { StatusPonto } from "@prisma/client";

const pontosRouter = Router();

const buscaSchema = z.object({
  cidade: z.string().trim().min(1).optional(),
  categoria: z.string().trim().min(1).optional(),
  busca: z.string().trim().min(1).optional(),
  limite: z.coerce.number().int().min(1).max(100).default(20),
});

pontosRouter.get("/", async (req: Request, res: Response) => {
  try {
    const resultado = buscaSchema.safeParse(req.query);

    if (!resultado.success) {
      return res.status(400).json({
        erro: "Parâmetros de busca inválidos.",
        detalhes: resultado.error.flatten(),
      });
    }

    const { cidade, categoria, busca, limite } = resultado.data;

    const pontos = await prisma.pontoTuristico.findMany({
      where: {
        status: StatusPonto.PUBLICADO,
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
  } catch (error) {
    console.error("Erro ao buscar pontos turísticos:", error);

    return res.status(500).json({
      erro: "Erro interno ao buscar pontos turísticos.",
    });
  }
});

pontosRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        erro: "Identificador inválido.",
      });
    }

    const ponto = await prisma.pontoTuristico.findFirst({
      where: {
        id,
        status: StatusPonto.PUBLICADO,
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
  } catch (error) {
    console.error("Erro ao buscar detalhe do ponto:", error);

    return res.status(500).json({
      erro: "Erro interno ao buscar ponto turístico.",
    });
  }
});

export default pontosRouter;