<?php

namespace App\controller\card;

require_once __DIR__ . '/../../../vendor/autoload.php';
use App\connection\DataBase;
use PDO;

// Definindo o cabeçalho para garantir que a saída seja JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;

    if ($id) {
        try {
            $db = DataBase::getConn();
            $query = "
                SELECT 
                    card.*, 
                    clientes.nome AS nome_cliente,
                    software.nome AS nome_software,
                    operador.nome AS nome_operador,
                    motivo.nome_motivo AS nome_motivo,
                    situacao.nome_situacao AS nome_situacao
                FROM 
                    card
                JOIN 
                    clientes ON card.id_cliente = clientes.id
                JOIN 
                    software ON card.software = software.id
                JOIN 
                    operador ON card.id_operador = operador.id
                LEFT JOIN 
                    motivo ON card.id_motivo = motivo.id
                LEFT JOIN 
                    situacao ON card.situacao = situacao.id
                WHERE 
                    card.id = :id
            ";

            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $card = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($card) {
                echo json_encode(['success' => true, 'card' => $card]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Cartão não encontrado.']);
            }
        } catch (\Exception $e) {
            error_log('Erro ao buscar cartão: ' . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Erro ao buscar cartão: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'ID do cartão não fornecido.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}
?>
