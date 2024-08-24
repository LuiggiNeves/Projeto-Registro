<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../routes/web.php';


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '../../../');
$dotenv->load();

$dbHost = $_ENV['DB_HOST'];
$dbUser = $_ENV['DB_USER'];
$dbPass = $_ENV['DB_PASS'];
$dbName = $_ENV['DB_NAME'];
$secretKey = $_ENV['Chave_Secreta'];


