# Используем базовый образ Python
FROM python:3.10-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем все файлы в контейнер
COPY . /app

# Устанавливаем зависимости
RUN pip install --upgrade pip && pip install -r requirements.txt

# Открываем порт
EXPOSE 8000

# Применяем миграции и запускаем сервер
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
