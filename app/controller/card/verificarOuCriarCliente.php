<?php

namespace App\controller\card;

require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
use App\connection\DataBase;
use PDO;
use Exception;

// Função para verificar se o cliente existe ou criar um novo
function verificarOuCriarCliente($nomeCliente) {
    $db = DataBase::getConn();
    try {
        // Verifica se o cliente já existe
        $query = "SELECT id FROM clientes WHERE nome = :nome";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nome', $nomeCliente);
        $stmt->execute();
        $cliente = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($cliente) {
            // Cliente já existe, retorna o ID
            return $cliente['id'];
        } else {
            // Cliente não existe, cria um novo
            $queryInsert = "INSERT INTO clientes (nome) VALUES (:nome)";
            $stmtInsert = $db->prepare($queryInsert);
            $stmtInsert->bindParam(':nome', $nomeCliente);
            $stmtInsert->execute();

            $newClientId = $db->lastInsertId(); // Obtém o ID do novo cliente
            if ($newClientId) {
                return $newClientId; // Retorna o ID do novo cliente criado
            } else {
                throw new Exception('Erro ao obter o ID do cliente recém-criado.');
            }
        }
    } catch (Exception $e) {
        throw new Exception('Erro ao verificar ou criar cliente: ' . $e->getMessage());
    }
}

?>
