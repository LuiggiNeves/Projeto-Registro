<?php

namespace App\model\card;



use App\connection\DataBase;
use PDO;
use Exception;

class CardModel {
    private $db;

    public function __construct() {
        $this->db = DataBase::getConn(); // Conecta ao banco de dados
    }
    public function createCard($data) {
        try {
            $sql = "INSERT INTO card (id_cliente, id_operador, data_inicio, data_prazo, data_fim, comunicador_01, comunicador_02, situacao, assunto, descricao, obs, situacao_card, sequencia, software, id_motivo, dir_img) 
                    VALUES (:id_cliente, :id_operador, :data_inicio, :data_prazo, :data_fim, :comunicador_01, :comunicador_02, :situacao, :assunto, :descricao, :obs, :situacao_card, :sequencia, :software, :id_motivo, :dir_img)";
            $stmt = $this->db->prepare($sql);
            
            // Bind dos parâmetros
            $stmt->bindParam(':id_cliente', $data['id_cliente']);
            $stmt->bindParam(':id_operador', $data['id_operador']);
            $stmt->bindParam(':data_inicio', $data['data_inicio']);
            $stmt->bindParam(':data_prazo', $data['data_prazo']);
            $stmt->bindParam(':data_fim', $data['data_fim']);
            $stmt->bindParam(':comunicador_01', $data['comunicador_01']);
            $stmt->bindParam(':comunicador_02', $data['comunicador_02']);
            $stmt->bindParam(':situacao', $data['situacao']);
            $stmt->bindParam(':assunto', $data['assunto']);
            $stmt->bindParam(':descricao', $data['descricao']);
            $stmt->bindParam(':obs', $data['obs']);
            $stmt->bindParam(':situacao_card', $data['situacao_card']);
            $stmt->bindParam(':sequencia', $data['sequencia']);
            $stmt->bindParam(':software', $data['software']);
            $stmt->bindParam(':id_motivo', $data['id_motivo']);
            $stmt->bindParam(':dir_img', $data['dir_img']); // Adicionado bind para o caminho das imagens
    
            $stmt->execute();
            return $this->db->lastInsertId();
        } catch (Exception $e) {
            throw new Exception('Erro ao criar cartão: ' . $e->getMessage());
        }
    }
}
?>
