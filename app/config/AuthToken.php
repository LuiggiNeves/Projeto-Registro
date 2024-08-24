<?php
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Chave secreta para codificação e decodificação do JWT
$secretKey = $_ENV['Chave_Secreta'];

// Exemplo de dados do usuário após autenticação bem-sucedida
$userId = 1; // ID do usuário
$username = 'usuario_exemplo';

// Definir o tempo de expiração do token
$issuedAt = time();
$expirationTime = $issuedAt + 3600;  // o token será válido por 1 hora

// Criar o payload do token
$payload = [
    'iat' => $issuedAt,
    'exp' => $expirationTime,
    'userId' => $userId,
    'username' => $username
];

// Gerar o token JWT
$jwt = JWT::encode($payload, $secretKey, 'HS256');

// Retornar o token para o usuário (pode ser em uma resposta JSON, por exemplo)
echo json_encode(['token' => $jwt]);
?>
