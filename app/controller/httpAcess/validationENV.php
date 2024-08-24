<?php

require '../../../vendor/autoload.php'; // Carrega o autoloader do Composer

use App\Model\httpAcess\ValidationUser;

// Definindo o cabeçalho como JSON
header('Content-Type: application/json');

// Lê os dados da requisição POST
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se o nome e a senha foram fornecidos
if (isset($data['nome']) && isset($data['senha'])) {
    $nome = $data['nome'];
    $senha = $data['senha'];

    // Instancia a classe de validação do usuário
    $userValidator = new ValidationUser();
    $isValid = $userValidator->validateUser($nome, $senha);

    if ($isValid) {
        // Responde com sucesso
        echo json_encode(['success' => true]);
    } else {
        // Responde com falha de autenticação
        echo json_encode(['success' => false, 'message' => 'Credenciais inválidas.']);
    }
} else {
    // Responde com erro de entrada
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
}
?>
