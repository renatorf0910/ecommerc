#!/bin/sh

echo "Esperando o banco de dados estar pronto..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Banco de dados está pronto!"
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
