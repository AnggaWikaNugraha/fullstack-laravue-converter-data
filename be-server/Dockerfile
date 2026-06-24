FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    unzip curl git libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install zip mbstring pdo pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan config:cache && php artisan route:cache

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
