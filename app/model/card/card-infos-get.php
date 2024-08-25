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
            // Executa uma consulta simples para testar a conexão
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
}