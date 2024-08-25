<?php

namespace App\controller\card;

use App\connection\DataBase;
use PDO;
use Exception;

header('Content-Type: application/json');

require_once '../../connection/DataBase.php'; // Ajuste o caminho conforme necessário

try {
    $db = DataBase::getConn(); // Obtenha a conexão com o banco de dados

    $data = [];

    // Consulta para o campo 'software'
    $querySoftware = "SELECT id, nome FROM software";
    $stmtSoftware = $db->prepare($querySoftware);
    $stmtSoftware->execute();
    $data['software'] = $stmtSoftware->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para o campo 'situacao'
    $querySituacao = "SELECT id, nome_situacao FROM situacao";
    $stmtSituacao = $db->prepare($querySituacao);
    $stmtSituacao->execute();
    $data['situacao'] = $stmtSituacao->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para o campo 'id_motivo'
    $queryMotivo = "SELECT id, nome_motivo FROM motivo";
    $stmtMotivo = $db->prepare($queryMotivo);
    $stmtMotivo->execute();
    $data['id_motivo'] = $stmtMotivo->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para obter todos os clientes
    $queryClientes = "SELECT id, nome FROM clientes";
    $stmtClientes = $db->prepare($queryClientes);
    $stmtClientes->execute();
    $data['clientes'] = $stmtClientes->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data); // Retorna as opções em formato JSON

} catch (Exception $e) {
    echo json_encode(['error' => 'Erro ao buscar opções: ' . $e->getMessage()]);
}
