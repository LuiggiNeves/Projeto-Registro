<?php

session_start();



require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
use App\model\card\CardModel;

$cardModel = new CardModel();

// Buscando dados para preencher os selects
try {
    $motivos = $cardModel->getMotivos();
    $operadores = $cardModel->getOperadores();
    $clientes = $cardModel->getClientes();
} catch (\Exception $e) {
    $_SESSION['message'] = 'Erro ao buscar dados: ' . $e->getMessage();
    header('Location: /path/to/formulario_card.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'create') {
    $data = [
        'id_cliente' => $_POST['cliente'] ?? '',
        'id_operador' => $_POST['id_operador'] ?? 1, // Usa o ID do operador enviado pelo formulário
        'data_inicio' => $_POST['data_inicio'] ?? null,
        'data_prazo' => $_POST['data_prazo'] ?? null,
        'data_fim' => $_POST['data_fim'] ?? null,
        'comunicador_01' => $_POST['comunicador_01'] ?? '',
        'comunicador_02' => $_POST['comunicador_02'] ?? '',
        'situacao' => $_POST['situacao'] ?? '',
        'assunto' => $_POST['assunto'] ?? '',
        'descricao' => $_POST['descricao'] ?? '',
        'obs' => '',
        'situacao_card' => 1, // Supondo que '1' significa "Aberto"
        'sequencia' => $_POST['sequencia'] ?? '',
        'software' => $_POST['software'] ?? '',
        'id_motivo' => $_POST['id_motivo'] ?? ''
    ];

    try {
        $newCardId = $cardModel->createCard($data);
        $_SESSION['message'] = "Cartão criado com sucesso! ID: $newCardId";
    } catch (\Exception $e) {
        $_SESSION['message'] = 'Erro: ' . $e->getMessage();
    }

    // Redirecionar de volta para o formulário
    header('Location: /path/to/formulario_card.php');
    exit();
}
?>
