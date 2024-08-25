<?php

header('Content-Type: application/json');
require_once '../../../vendor/autoload.php';
require_once '../../model/httpAccess/validationUser.php'; // Inclua o model apropriado
require_once '../../config/AuthToken.php'; // Inclua o arquivo AuthToken.php

use App\Model\UserModel;
use App\Config\AuthToken; // Use a classe AuthToken

// Obtém o JSON enviado pelo cliente
$input = json_decode(file_get_contents('php://input'), true);

// Extrai os dados do input JSON
$name = $input['name'] ?? '';
$password = $input['password'] ?? '';
$rememberMe = $input['rememberMe'] ?? false;

// Cria uma instância do UserModel
$userModel = new UserModel();

// Valida as credenciais do usuário usando o model
if ($userModel->validateUser($name, $password)) {
    // Se o login for bem-sucedido
    $response = [
        'success' => true,
        'message' => 'Login bem-sucedido!'
    ];

    // Gera um token JWT usando o nome de usuário
    $tokenData = [
        'username' => $name
    ];
    $token = AuthToken::generateToken($tokenData);
    $response['token'] = $token; // Adiciona o token à resposta

    // Implementa a lógica de 'Lembrar de mim' se necessário
    if ($rememberMe) {
        // Exemplo de configuração de cookie por um mês
        setcookie('rememberMe', '1', time() + (30 * 24 * 60 * 60), "/");
    }
} else {
    // Se o login falhar
    $response = [
        'success' => false,
        'message' => 'Credenciais inválidas.'
    ];
}

// Retorna a resposta em JSON
echo json_encode($response);
?>
