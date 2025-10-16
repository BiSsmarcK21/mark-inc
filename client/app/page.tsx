"use client";

// ----------------------------------------------
// mark-inc admin — тестовая панель
// ----------------------------------------------
// Проверяет связь с backend, позволяет добавлять
// категории и продукты прямо из браузера.
// ----------------------------------------------

import { useEffect, useState } from "react";
import api from "../lib/api";

type Category = {
  id: number;
  name: string;
  createdAt: string;
};

type Product = {
  id: number;
  name: string;
  sku: string;
  categoryId: number;
  createdAt: string;
  category?: Category;
};

export default function HomePage() {
  // --- состояние ---
  const [hello, setHello] = useState<string>("...");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [catName, setCatName] = useState("");
  const [prodName, setProdName] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  // --- API-запросы ---
  async function checkBackend() {
    try {
      const res = await api.get("/hello");
      setHello(res.data.message);
    } catch {
      setHello("❌ Backend недоступен");
    }
  }

  async function fetchCategories() {
    const res = await api.get("/categories");
    setCategories(res.data);
  }

  async function fetchProducts() {
    const res = await api.get("/products");
    setProducts(res.data);
  }

  // --- создание ---
  async function createCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!catName.trim()) return alert("Введите название категории");
    await api.post("/categories", { name: catName.trim() });
    setCatName("");
    fetchCategories();
  }

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!prodName.trim() || !sku.trim() || !categoryId)
      return alert("Заполните все поля");
    await api.post("/products", {
      name: prodName.trim(),
      sku: sku.trim(),
      categoryId: Number(categoryId),
    });
    setProdName("");
    setSku("");
    setCategoryId("");
    fetchProducts();
  }

  // --- загрузка при старте ---
  useEffect(() => {
    (async () => {
      await checkBackend();
      await fetchCategories();
      await fetchProducts();
    })();
  }, []);

  // --- UI ---
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ textAlign: "center" }}>mark-inc admin</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        🔍 Проверка связи: <b>{hello}</b>
      </p>
      <hr style={{ margin: "30px 0" }} />

      {/* Форма добавления категории */}
      <section style={{ marginBottom: 40 }}>
        <h2>Добавить категорию</h2>
        <form onSubmit={createCategory} style={{ display: "flex", gap: 8 }}>
          <input
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="Название категории"
            style={{
              flex: 1,
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            Добавить
          </button>
        </form>
      </section>

      {/* Форма добавления продукта */}
      <section style={{ marginBottom: 40 }}>
        <h2>Добавить продукт</h2>
        <form
          onSubmit={createProduct}
          style={{ display: "grid", gap: 8, maxWidth: 500 }}
        >
          <input
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            placeholder="Название продукта"
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
          />
          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="SKU"
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
          >
            <option value="">Выберите категорию</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button type="submit" style={{ padding: "8px 16px" }}>
            Добавить
          </button>
        </form>
      </section>

      <hr style={{ margin: "40px 0" }} />

      {/* Списки */}
      <section>
        <h2>Категории</h2>
        {categories.length === 0 ? (
          <p>Категорий нет</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {categories.map((c) => (
              <li
                key={c.id}
                style={{
                  background: "#fff",
                  marginBottom: 8,
                  padding: 12,
                  borderRadius: 8,
                  boxShadow: "0 0 4px #ccc",
                }}
              >
                <b>{c.name}</b> (id: {c.id})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Продукты</h2>
        {products.length === 0 ? (
          <p>Продуктов нет</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {products.map((p) => (
              <li
                key={p.id}
                style={{
                  background: "#fff",
                  marginBottom: 8,
                  padding: 12,
                  borderRadius: 8,
                  boxShadow: "0 0 4px #ccc",
                }}
              >
                <b>{p.name}</b> — SKU: {p.sku},{" "}
                категория: {p.category?.name || p.categoryId}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
