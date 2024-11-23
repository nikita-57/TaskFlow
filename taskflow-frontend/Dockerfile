# Используем базовый образ Node.js
FROM node:16-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . /app

# Устанавливаем зависимости и создаем production сборку
RUN npm install && npm run build

# Используем Nginx для сервировки статических файлов
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
