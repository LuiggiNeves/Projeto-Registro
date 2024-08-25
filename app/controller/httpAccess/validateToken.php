<?php

header('Content-Type: application/json');
require_once '../../../vendor/autoload.php';
require_once '../../config/AuthToken.php'; // Inclua o AuthToken.php

use App\Config\AuthToken; // Use a classe AuthToken

// Obtém o cabeçalho Authorization
$headers = apache_request_headers();
$authHeader = $headers['Authorization'] ?? '';

if ($authHeader) {
    // Extrai o token do cabeçalho (o formato deve ser "Bearer <token>")
    list($type, $token) = explode(' ', $authHeader, 2);

    if (strcasecmp($type, 'Bearer') == 0) {
        $decodedData = AuthToken::validateToken($token);

        if ($decodedData) {
            echo json_encode([
                'success' => true,
                'message' => 'Token válido!',
                'data' => $decodedData // Retorna os dados decodificados do token
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Token inválido ou expirado.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Formato do cabeçalho de autorização inválido.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Cabeçalho de autorização ausente.'
    ]);
}
?>
