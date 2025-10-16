# 🚀 mark-inc — Полный Dev-стек

**Технологии:**  
Next.js (App Router) + Express + Prisma + PostgreSQL + Docker + Nginx

**Окружение:**  
Development (локальная разработка через Docker Compose)

---

## 1. ⚙️ Разворачивание проекта

### 🔧 Подготовка
```bash
# Клонируем репозиторий
git clone https://github.com/<your-org>/mark-inc.git
cd mark-inc

# Копируем пример env-файлов
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Проверь `.env` файлы:
- `server/.env` — содержит `DATABASE_URL` и `PORT`
- `client/.env` — содержит `NEXT_PUBLIC_API_URL=http://localhost/api`

---

### 🐳 Запуск
```bash
# Полная пересборка контейнеров
docker compose down -v
docker compose up --build
```

После запуска:
- фронт доступен: [http://localhost](http://localhost)
- API: [http://localhost/api](http://localhost/api)
- проверка backend:
  ```bash
  curl http://localhost/api/hello
  ```

---

### 🧩 Инициализация Prisma (при первом запуске)
```bash
# Генерация Prisma Client (обязательно перед миграцией)
docker compose exec server npx prisma generate

# Применяем миграции (создаёт таблицы Category и Product)
docker compose exec server npx prisma migrate dev --name init

# Проверяем данные через Prisma Studio
docker compose exec server npx prisma studio
```
> ⚠️ Выполняется **только при первом запуске** или при изменении схемы `schema.prisma`.

---

## 2. 🧩 Разработка

### 🔹 Prisma (работа с базой данных)
```bash
# Сгенерировать клиент Prisma (после изменения schema.prisma)
docker compose exec server npx prisma generate

# Создать новую миграцию
docker compose exec server npx prisma migrate dev --name init

# Посмотреть статус миграций
docker compose exec server npx prisma migrate status

# Применить миграции в продакшне
docker compose exec server npx prisma migrate deploy

# Открыть Prisma Studio (GUI)
docker compose exec server npx prisma studio
```

---

### 🔹 Сервер (Express)
```bash
# Перезапуск backend
docker compose restart server

# Просмотр логов
docker compose logs -f server
```

---

### 🔹 Клиент (Next.js)
```bash
# Перезапуск фронта
docker compose restart client

# Просмотр логов клиента
docker compose logs -f client

# Запуск локально без Docker
cd client
npm install
npm run dev
```

---

## 3. 🌿 Работа с Git

### 🔸 Создание ветки
```bash
git checkout main
git pull
git checkout -b feature/<task-name>
```

**Формат названий веток:**
- `feature/<название-задачи>` — новая функциональность
- `fix/<описание>` — исправление
- `hotfix/<описание>` — срочная правка
- `docs/<описание>` — документация

---

### 🔸 Перед выгрузкой ветки
```bash
# Добавляем изменения
git add .

# Делаем коммит
git commit -m "описание изменений"

# Обновляем main
git checkout main
git pull

# Возвращаемся в ветку и делаем ребейз
git checkout feature/<task-name>
git rebase main

# Решаем конфликты, если есть
git add .
git rebase --continue

# Проверяем проект
docker compose up --build

# Пушим изменения
git push origin feature/<task-name>
```
> ⚠️ После ребейза, если push отклонён, использовать:  
> `git push origin feature/<task-name> --force-with-lease`

---

## 4. 🧰 Полезные команды
```bash
# Проверка контейнеров
docker ps

# Удалить все контейнеры и volume
docker compose down -v

# Полная пересборка
docker compose up --build
```

---

## 5. 📖 Рекомендации по работе с проектом
- Все комментарии в коде — **на русском**, поясняют архитектуру и ключевые решения.
- При изменении структуры БД — всегда выполняй `prisma generate` и `migrate dev`.
- Для тестов можно использовать `curl` или Postman через `http://localhost/api`.
- Все dev-настройки вынесены в `docker-compose.yml` и `.env` — ничего менять в коде не нужно.

---

🧱 **Далее**: кидай по очереди файлы проекта — будем добавлять комментарии и улучшать кодовую документацию.
После всех правок ты скинешь архив, я сохраню его как новую актуальную dev-версию (`mark_inc_final`).
