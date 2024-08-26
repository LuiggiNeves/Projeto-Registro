<?php

namespace App\model\card;

require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
use App\connection\DataBase;
use PDO;
use Exception;

class CardModel
{
    private $db;

    public function __construct()
    {
        $this->db = DataBase::getConn(); // Conecta ao banco de dados
    }

    // Método para testar a conexão
    public function testConnection()
    {
        try {
            $stmt = $this->db->query("SELECT 1");
            return $stmt !== false;
        } catch (Exception $e) {
            throw new Exception('Erro ao testar conexão: ' . $e->getMessage());
        }
    }

    public function getCardInfoByOperador($id_operador)
    {
        try {
            $sql = "
            SELECT 
                card.*, 
                clientes.nome AS nome_cliente,
                software.nome AS nome_software,
                operador.nome AS nome_operador
            FROM 
                card
            JOIN 
                clientes ON card.id_cliente = clientes.id
            JOIN 
                software ON card.software = software.id
            JOIN
                operador ON card.id_operador = operador.id
            WHERE 
                card.id_operador = :id_operador
            ";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':id_operador', $id_operador, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception('Erro ao buscar informações do operador: ' . $e->getMessage());
        }
    }

    public function getAllCardInfo()
    {
        try {
            $sql = "
            SELECT 
                card.*, 
                clientes.nome AS nome_cliente,
                software.nome AS nome_software,
                operador.nome AS nome_operador
            FROM 
                card
            JOIN 
                clientes ON card.id_cliente = clientes.id
            JOIN 
                software ON card.software = software.id
            JOIN
                operador ON card.id_operador = operador.id
            ";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception('Erro ao buscar informações de todos os cartões: ' . $e->getMessage());
        }
    }

    public function updateCardStatus($id_card, $new_status)
    {
        try {
            // Adiciona log antes da execução da query
            error_log("Tentando atualizar o cartão com ID: $id_card para novo status: $new_status");

            // Prepara a query SQL
            $sql = "UPDATE card SET situacao = :new_status WHERE id = :id_card";
            $stmt = $this->db->prepare($sql);

            // Associa os parâmetros
            $stmt->bindValue(':new_status', $new_status, PDO::PARAM_INT);
            $stmt->bindValue(':id_card', $id_card, PDO::PARAM_INT);

            // Executa a query
            $result = $stmt->execute();

            // Verifica o resultado da execução e adiciona log
            if ($result) {
                error_log("Atualização realizada com sucesso para o cartão ID: $id_card");
                echo "Atualização realizada com sucesso para o cartão ID: $id_card"; // Echo para teste
            } else {
                error_log("Falha na atualização do cartão ID: $id_card");
                echo "Falha na atualização do cartão ID: $id_card"; // Echo para teste
            }

            return $result;
        } catch (Exception $e) {
            error_log("Erro ao atualizar a situação do cartão: " . $e->getMessage());
            echo "Erro ao atualizar a situação do cartão: " . $e->getMessage(); // Echo para teste
            throw new Exception('Erro ao atualizar a situação do cartão: ' . $e->getMessage());
        }
    }
}
