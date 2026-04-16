# Letteros Services — инструкции для агента

## Описание проекта

Мультисервисный Next.js проект для сайта letteros.com. Три сервиса:

| Сервис | Статус | Роут |
|---|---|---|
| **shorturl** | Реализован | `/shorturl/` |
| **shortcode** | Реализован | `/shortcode/` |
| **typograph** | Реализован | `/typograph/` |

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

### 7. shortcode и typograph — клиентская автообработка
Оба сервиса не имеют кнопки «Обработать». Обработка запускается:
- Мгновенно при вставке (paste event → `isPasteRef = true` → delay=0)
- С debounce 500мс при ручном вводе
Минификаторы (html-minifier-terser, csso, terser) lazy-loaded через dynamic import.
typograf инициализируется как синглтон при первом вызове.

### 8. shortcode и typograph — горизонтальный layout
Два поля рядом (grid 1fr 1fr) на десктопе, в колонку на мобильном (≤767px).
Медиазапросы через `<style>` тег с CSS-классом (паттерн из CodeEditor).

### 9. typograf — конфигурация
`locale: ['ru', 'en-US']`, `ru/optalign/*` отключён (неожиданные тонкие пробелы).
Все остальные правила — дефолтные.
Декларация типов: `src/types/typograf.d.ts`.

### 10. font-variant-numeric глобально
`body { font-variant-numeric: lining-nums proportional-nums; }` в globals.css.
Raleway по умолчанию использует oldstyle-цифры, которые «прыгают» в строке.

### 11. transparentBlack — без обводки
В `tokens/index.ts` вариант `transparentBlack` имеет `border: "none"`.
(Стандартный UIKit имеет рамку, для утилитарных кнопок сервисов убрана.)

### 12. Лендинговые секции — landing-компоненты
Все три страницы используют shared landing-компоненты из `src/components/landing/`:
- `Section` — обёртка секции с чередованием фонов (white/alt/dark)
- `StepSwitcher` — «Как это работает», вертикальные переключатели слева + контент справа
- `FeatureHighlight` — 50/50 layout текст + визуал-заглушка (чередование сторон)
- `FeatureGrid` — сетка фич без карточных обвёсок (иконка + заголовок + текст)
- `ScreenshotPlaceholder` — серый placeholder 16:9 с подписью (будут заменены на реальные скриншоты)
- `CTABlock` — кросс-промо Letteros перед футером (кнопка → app.letteros.com)
- `SectionTabs` — генерик pill-табы (используется в hero shorturl)

### 13. shorturl — две вкладки в hero
Hero shorturl содержит SectionTabs с двумя вкладками:
- «Сокращение ссылок» → ShortenForm (чекбокс QR удалён)
- «QR-код» → QRGenerator (отдельный компонент, генерация на клиенте через qrcode.react)
Обёртка: `src/components/shorturl/HeroTabs.tsx` ("use client").

## Структура проекта

```
letteros-sevices/
├── app/
│   ├── globals.css              ← --l-* CSS-переменные + Tailwind + font-variant-numeric
│   ├── layout.tsx               ← Raleway font, lang="ru"
│   ├── page.tsx                 ← корневая страница (дефолтный шаблон)
│   ├── shorturl/
│   │   └── page.tsx             ← страница сервиса сокращения ссылок
│   ├── shortcode/
│   │   └── page.tsx             ← страница минификатора кода
│   ├── typograph/
│   │   └── page.tsx             ← страница типографа
│   ├── s/[code]/
│   │   └── route.ts             ← GET: редирект по короткой ссылке
│   └── api/shorten/
│       └── route.ts             ← POST: API сокращения
├── src/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── layout/
│   │   │   └── Container.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── Typography.tsx
│   │   │   └── icons.tsx
│   │   ├── landing/
│   │   │   ├── Section.tsx          ← обёртка секции (bg: white/alt/dark)
│   │   │   ├── ScreenshotPlaceholder.tsx ← серый placeholder 16:9
│   │   │   ├── SectionTabs.tsx      ← генерик pill-табы
│   │   │   ├── StepSwitcher.tsx     ← «Как это работает» (вертикальные переключатели)
│   │   │   ├── FeatureHighlight.tsx ← 50/50 текст + визуал
│   │   │   ├── FeatureGrid.tsx      ← сетка фич без карточек
│   │   │   └── CTABlock.tsx         ← кросс-промо Letteros
│   │   ├── shorturl/
│   │   │   ├── ShortenForm.tsx  ← форма + результат (QR удалён)
│   │   │   ├── QRGenerator.tsx  ← генератор QR-кодов (отдельная вкладка)
│   │   │   └── HeroTabs.tsx     ← переключатель вкладок в hero
│   │   ├── shortcode/
│   │   │   ├── CompressorTool.tsx  ← "use client", автообработка, 2-колоночный layout
│   │   │   ├── TabSwitcher.tsx     ← переключатель HTML/CSS/JS
│   │   │   ├── CodeEditor.tsx      ← поле ввода с подсветкой (react-simple-code-editor)
│   │   │   ├── CodeOutput.tsx      ← read-only результат с подсветкой (prismjs)
│   │   │   ├── CompressionStats.tsx
│   │   │   └── ActionButtons.tsx   ← (не используется, оставлен)
│   │   └── typograph/
│   │       ├── TypographTool.tsx   ← "use client", автообработка, 2-колоночный layout
│   │       ├── TextInput.tsx       ← styled textarea + кнопка «Очистить»
│   │       ├── TextOutput.tsx      ← read-only div + кнопка «Копировать»
│   │       └── ProcessingStats.tsx ← счётчик исправлений
│   ├── db/
│   │   └── schema.ts
│   ├── lib/
│   │   └── db.ts
│   └── types/
│       ├── csso.d.ts
│       └── typograf.d.ts
├── tokens/
│   └── index.ts                 ← Design tokens (скопированы из UIKit)
├── db/
│   └── shorturl.db              ← SQLite файл (в .gitignore)
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

## Страницы

### shorturl
- `/shorturl/` — мини-лендинг с формой сокращения и контентными секциями
- `/s/{code}` — редирект на оригинальный URL (301)
- `/api/shorten` — POST API создания короткой ссылки

### shortcode
- `/shortcode/` — минификатор HTML/CSS/JS, два поля рядом, автообработка при вводе

### typograph
- `/typograph/` — типограф для русского текста, два поля рядом, автообработка при вводе
