# RSS Reader

> **RSS Reader** — это веб-приложение, которое позволяет пользователям подписываться на RSS-ленты, автоматически отслеживать новые публикации и удобно просматривать их.
Проект реализован в рамках учебной программы [Hexlet](https://ru.hexlet.io/)..

---

### Hexlet tests and linter status:

[![Actions Status](https://github.com/dven-dev/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/dven-dev/frontend-project-11/actions)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=dven-dev_frontend-project-11&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=dven-dev_frontend-project-11)

---

## Демонстрация

Онлайн-версия доступна по ссылке:
[https://frontend-project-11-ten-theta.vercel.app/](https://frontend-project-11-ten-theta.vercel.app/)

---

## Системные требования

- Node.js **v14.0.0** или выше
- npm (обычно устанавливается вместе с Node.js)

---

## Установка

```bash
git clone https://github.com/dven-dev/frontend-project-11.git
cd frontend-project-11
make install
```
---

## Локальный запуск

```bash
make start
```
http://localhost:5173/ в браузере
---

## Сборка production-версии

```bash
make build
```
---

## Возможности

- Добавление RSS-ленты по ссылке
- Валидация формы и URL (в том числе на дубли)
- Загрузка и парсинг RSS через прокси
- Отображение списка постов и фидов
- Автоматическое обновление ленты
- Просмотр содержимого постов в модальном окне
- Переход по ссылке на оригинальную статью
- Поддержка нескольких языков (i18next)
- Обратная связь и валидация с использованием Yup

---

## Технологии

- **JavaScript (ES6+)**
- **Vite**
- **Bootstrap 5**
- **Axios**
- **i18next**
- **Yup**
- **on-change**
- **DOMParser**
- **All Origins API**

