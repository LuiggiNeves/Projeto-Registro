<?php

namespace App\controller;
require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
require '../../model/card/card-infos-get.php';
use App\model\card\CardModel;

header('Content-Type: application/json');

try {
    // Lê o corpo da requisição e decodifica o JSON
    $input = json_decode(file_get_contents('php://input'), true);

    // Verifica se o ID do cartão e o novo status foram fornecidos
    if (isset($input['id_card']) && isset($input['new_status'])) {
        $id_card = intval($input['id_card']);
        $new_status = intval($input['new_status']);

        // Instancia o Model
        $cardModel = new CardModel();

        // Atualiza a situação do cartão
        $updateResult = $cardModel->updateCardStatus($id_card, $new_status);

        if ($updateResult) {
            echo json_encode(['success' => true, 'message' => 'Situação atualizada com sucesso.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Falha ao atualizar a situação do cartão.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Parâmetros inválidos.']);
    }

} catch (\Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
?>

?>
