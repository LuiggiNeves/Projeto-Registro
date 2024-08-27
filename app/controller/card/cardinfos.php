<?php

namespace App\controller;
require_once __DIR__ . '/../../../vendor/autoload.php'; 
require '../../model/card/card-infos-get.php';
use App\model\card\CardModel;

header('Content-Type: application/json');

$id_operador = isset($_GET['id_operador']) ? intval($_GET['id_operador']) : null;
$startDate = $_GET['start_date'] ?? '';
$endDate = $_GET['end_date'] ?? '';
$status = $_GET['status'] ?? '';
$client = $_GET['client'] ?? '';

try {
    // Instancia o Model
    $cardModel = new CardModel();

    // Recupera as informações do operador usando o ID fornecido e filtros
    $result = $cardModel->getFilteredCards($id_operador, $startDate, $endDate, $status, $client);

    // Retorna os resultados em formato JSON
    echo json_encode($result);

} catch (\Exception $e) {
    // Retorna uma mensagem de erro em JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
