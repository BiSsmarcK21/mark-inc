// ----------------------------------------------
// mark-inc — Backend (Express + Prisma, TypeScript)
// ----------------------------------------------
// Минимальный REST API: категории и продукты.
// /hello используется для проверки, что backend запущен.
// ----------------------------------------------

import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT) || 4000;

// Разрешаем JSON-тела запросов
app.use(express.json());

// ✅ Health-check / тест связи с фронтом
app.get("/hello", (_req, res) => {
    res.json({ message: "👋 Hello from mark-inc server" });
});

// ✅ Создать категорию
app.post("/categories", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name is required" });
        const category = await prisma.category.create({ data: { name } });
        res.status(201).json(category);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Получить все категории с продуктами
app.get("/categories", async (_req, res) => {
    const data = await prisma.category.findMany({
        include: { products: true },
        orderBy: { id: "asc" },
    });
    res.json(data);
});

// ✅ Создать продукт
app.post("/products", async (req, res) => {
    try {
        const { sku, name, categoryId } = req.body;
        if (!sku || !name || !categoryId)
            return res.status(400).json({ error: "sku, name, and categoryId are required" });

        const product = await prisma.product.create({
            data: {
                sku,
                name,
                category: { connect: { id: Number(categoryId) } },
            },
        });
        res.status(201).json(product);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Получить продукты с категориями
app.get("/products", async (_req, res) => {
    const data = await prisma.product.findMany({
        include: { category: true },
        orderBy: { id: "asc" },
    });
    res.json(data);
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
