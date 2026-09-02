"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const prisma_1 = __importDefault(require("./lib/prisma"));
const pontos_routes_1 = __importDefault(require("./routes/pontos.routes"));
const roteiros_routes_1 = __importDefault(require("./routes/roteiros.routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3333;
app.use((0, helmet_1.default)());
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
app.use((0, cors_1.default)({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        servico: "NomadPlan-plus-backend",
    });
});
app.use("/pontos", pontos_routes_1.default);
app.use("/roteiros", roteiros_routes_1.default);
app.use((_req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada.",
    });
});
app.use((error, _req, res, _next) => {
    console.error("Erro não tratado:", error);
    res.status(500).json({
        erro: "Erro interno do servidor.",
    });
});
const server = app.listen(port, () => {
    console.log(`NomadPlan API executando em http://localhost:${port}`);
});
async function shutdown() {
    console.log("Encerrando servidor...");
    await prisma_1.default.$disconnect();
    server.close(() => {
        process.exit(0);
    });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
