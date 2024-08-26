<?php

namespace App\controller;
require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
require '../../model/card/card-infos-get.php';
use App\model\card\CardModel;

header('Content-Type: application/json');

try {
    // Verifica se o ID do operador foi fornecido através de um parâmetro GET
    $id_operador = isset($_GET['id_operador']) ? intval($_GET['id_operador']) : 1; // Padrão para 1 se não fornecido

    // Instanciar o Model
    $cardModel = new CardModel();

    // Recuperar as informações do operador usando o ID fornecido
    $result = $cardModel->getCardInfoByOperador($id_operador);

    // Retornar os resultados em formato JSON
    echo json_encode($result);

} catch (\Exception $e) {
    // Retornar uma mensagem de erro em JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
