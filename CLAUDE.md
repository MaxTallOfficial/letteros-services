# Letteros Services — инструкции для агента

## Описание проекта

Мультисервисный Next.js проект для сайта letteros.com. Три сервиса:

| Сервис | Статус | Роут |
|---|---|---|
| **shorturl** | В работе | `/shorturl/` |
| **shortcode** | Ожидает ТЗ | `/shortcode/` |
| **typograph** | Ожидает ТЗ | `/typograph/` |

Репозиторий: https://gitlab.letteros.com/maxtall/letteros-sevices

## UIKit — source of truth

**https://gitlab.letteros.com/maxtall/letteros-uikit** — единственный источник правды по дизайну.

Локальная копия: `D:\ClaudeProjects\letteros-uikit`

Перед любыми изменениями в UI **обязательно сверяйся с UIKit**:
- `docs/design-tokens.md` — токены
- `docs/components-inventory.md` — компоненты
- `docs/composition-rules.md` — правила композиции
- `src/tokens/index.ts` + `src/app/globals.css` — source of truth в коде
- `src/components/ui/` — готовые компоненты

## Стек

- **Next.js 15.3** / **React 19** / **TypeScript 5** / **Tailwind CSS 3**
- **База данных:** SQLite через Drizzle ORM (файл `db/shorturl.db`)
- Inline styles в компонентах — CSS-переменные `--l-*`
- Шрифт: Raleway (Google Fonts)

## Правила

- **Дизайн строго по UIKit** — не улучшать, не нормализовать
- Если нужного компонента нет в UIKit — предложить расширение, дождаться подтверждения
- **Весь проект работает из одного репо** — никаких внешних сервисов, API, БД
- **Не коммитить автоматически** — только по запросу пользователя
- Общение на русском, код и техсущности на английском

## Ключевые архитектурные решения

### 1. Удалён `output: 'export'` из next.config.mjs
Причина: статический экспорт не поддерживает API Routes, нужные для бэкенда shorturl.

### 2. База данных: SQLite + Drizzle ORM
Причина: файловая БД, живёт внутри проекта, не требует внешних сервисов.
- Файл БД: `db/shorturl.db` (в .gitignore)
- Таблицы создаются автоматически при первом запуске через `src/lib/db.ts`
- Миграции через drizzle-kit если понадобятся

### 3. Токены — `tokens/index.ts` на уровне корня проекта
Алиас `@/tokens` резолвится в `./tokens/index.ts` (tsconfig: `"@/*": ["./*"]`).
Все UIKit-компоненты используют тот же импорт без изменений.

### 4. shortUrl формируется от origin запроса
`https://${req.nextUrl.origin}/s/${code}` — работает и локально, и на проде.

### 5. Rate limiting — in-memory Map
10 запросов в минуту на IP. Сбрасывается при перезапуске сервера.

### 6. Очистка просроченных ссылок
Запускается при каждом POST `/api/shorten` — удаляет записи с истёкшим `expiresAt`.

## Структура проекта

```
letteros-sevices/
├── app/
│   ├── globals.css              ← --l-* CSS-переменные + Tailwind
│   ├── layout.tsx               ← Raleway font, lang="ru"
│   ├── page.tsx                 ← корневая страница (дефолтный шаблон)
│   ├── shorturl/
│   │   └── page.tsx             ← страница сервиса сокращения ссылок
│   ├── shortcode/
│   │   └── page.tsx             ← заглушка
│   ├── typograph/
│   │   └── page.tsx             ← заглушка
│   ├── s/[code]/
│   │   └── route.ts             ← GET: редирект по короткой ссылке
│   └── api/shorten/
│       └── route.ts             ← POST: API сокращения
├── src/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Header.tsx       ← Header as-is из UIKit (+ hamburger)
│   │   │   ├── Footer.tsx       ← Footer as-is из UIKit
│   │   │   └── MobileMenu.tsx   ← MobileMenu as-is из UIKit
│   │   ├── layout/
│   │   │   └── Container.tsx    ← Container as-is из UIKit
│   │   ├── ui/
│   │   │   ├── Button.tsx       ← Button as-is из UIKit
│   │   │   ├── Checkbox.tsx     ← Checkbox as-is из UIKit
│   │   │   ├── FormInput.tsx    ← FormInput as-is из UIKit
│   │   │   ├── Typography.tsx   ← Typography as-is из UIKit
│   │   │   └── icons.tsx        ← SVG-иконки as-is из UIKit
│   │   └── shorturl/
│   │       └── ShortenForm.tsx  ← форма + результат + QR
│   ├── db/
│   │   └── schema.ts            ← Drizzle schema (таблица links)
│   └── lib/
│       └── db.ts                ← Drizzle client + auto-create tables
├── tokens/
│   └── index.ts                 ← Design tokens (скопированы из UIKit)
├── db/
│   └── shorturl.db              ← SQLite файл (создаётся автоматически, в .gitignore)
├── drizzle.config.ts
├── CLAUDE.md
└── ...
```

## Команды

```bash
npm run dev     # запуск в режиме разработки (http://localhost:3000)
npm run build   # production-сборка
npm run start   # запуск production-сервера
```

## Страницы shorturl

- `/shorturl/` — мини-лендинг с формой сокращения и контентными секциями
- `/s/{code}` — редирект на оригинальный URL (301)
- `/api/shorten` — POST API создания короткой ссылки
