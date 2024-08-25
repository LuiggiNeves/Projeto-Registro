<?php

namespace App\controller;
require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
require '../../model/card/card-infos-get.php';
use App\model\card\CardModel;

header('Content-Type: application/json');

try {
    // Instanciar o Model
    $cardModel = new CardModel();

    // Recuperar as informações do operador 1 ou outros conforme necessário
    $result = $cardModel->getCardInfoByOperador(1);

    // Retornar os resultados em formato JSON
    echo json_encode($result);

} catch (\Exception $e) {
    // Retornar uma mensagem de erro em JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
