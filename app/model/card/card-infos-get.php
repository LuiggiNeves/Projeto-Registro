<?php

namespace App\model\card;

require_once __DIR__ . '/../../../vendor/autoload.php';
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
            error_log("Tentando atualizar o cartão com ID: $id_card para novo status: $new_status");

            $sql = "UPDATE card SET situacao = :new_status WHERE id = :id_card";
            $stmt = $this->db->prepare($sql);

            $stmt->bindValue(':new_status', $new_status, PDO::PARAM_INT);
            $stmt->bindValue(':id_card', $id_card, PDO::PARAM_INT);

            $result = $stmt->execute();

            if ($result) {
                error_log("Atualização realizada com sucesso para o cartão ID: $id_card");
                echo "Atualização realizada com sucesso para o cartão ID: $id_card"; 
            } else {
                error_log("Falha na atualização do cartão ID: $id_card");
                echo "Falha na atualização do cartão ID: $id_card"; 
            }

            return $result;
        } catch (Exception $e) {
            error_log("Erro ao atualizar a situação do cartão: " . $e->getMessage());
            echo "Erro ao atualizar a situação do cartão: " . $e->getMessage(); 
            throw new Exception('Erro ao atualizar a situação do cartão: ' . $e->getMessage());
        }
    }

    // Novo método para obter detalhes de um cartão específico
    public function getCardDetailsById($id_card)
    {
        try {
            $sql = "
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
                card.id = :id_card
            ";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':id_card', $id_card, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna os detalhes de um único cartão
        } catch (Exception $e) {
            throw new Exception('Erro ao obter detalhes do cartão: ' . $e->getMessage());
        }
    }
}
?>
