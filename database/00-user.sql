CREATE USER IF NOT EXISTS 'roterdorn'@'%' IDENTIFIED WITH mysql_native_password BY 'roterdorn';
GRANT ALL PRIVILEGES ON roterdorn.* TO 'roterdorn'@'%';
FLUSH PRIVILEGES;
