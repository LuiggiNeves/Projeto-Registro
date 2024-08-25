<?php

namespace App\model\card;

require_once __DIR__ . '/../../../vendor/autoload.php'; // Ajuste o caminho conforme necessário
use App\connection\DataBase;
use PDO;
use Exception;

class CardModel {
    private $db;

    public function __construct() {
        $this->db = DataBase::getConn(); // Conecta ao banco de dados
    }

    public function getMotivos() {
        try {
            $sql = "SELECT id, nome FROM motivo";
            $stmt = $this->db->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception('Erro ao buscar motivos: ' . $e->getMessage());
        }
    }

    public function getOperadores() {
        try {
            $sql = "SELECT id, nome FROM operador";
            $stmt = $this->db->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception('Erro ao buscar operadores: ' . $e->getMessage());
        }
    }

    public function getClientes() {
        try {
            $sql = "SELECT id, nome FROM cliente";
            $stmt = $this->db->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception('Erro ao buscar clientes: ' . $e->getMessage());
        }
    }
    
    public function createCard($data) {
        // Código existente para criar o cartão
    }
}
?>
