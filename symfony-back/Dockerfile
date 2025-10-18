# PHP 8.3 FPM Base
FROM php:8.3-fpm

# Install System Packages and PHP Extensions
RUN apt-get update && apt-get install -y \
    git unzip mariadb-client libonig-dev libzip-dev libicu-dev \
    && docker-php-ext-install intl pdo pdo_mysql mbstring zip xml

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set Working Directory
WORKDIR /var/www/html

# Copy Composer Files for Dependency Installation
COPY composer.json composer.lock ./

# Install PHP Dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy Project Files
COPY . .

# Expose PHP-FPM Port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
