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
        // Código existente para criar um cartão
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
            $stmt->bindParam(':dir_img', $data['dir_img']);
    
            $stmt->execute();
            return $this->db->lastInsertId();
        } catch (Exception $e) {
            throw new Exception('Erro ao criar cartão: ' . $e->getMessage());
        }
    }

    public function updateCard($data) {
        try {
            $sql = "UPDATE card SET 
                        id_cliente = :id_cliente, 
                        data_inicio = :data_inicio, 
                        data_prazo = :data_prazo, 
                        data_fim = :data_fim, 
                        comunicador_01 = :comunicador_01, 
                        comunicador_02 = :comunicador_02, 
                        situacao = :situacao, 
                        assunto = :assunto, 
                        descricao = :descricao, 
                        obs = :obs, 
                        situacao_card = :situacao_card, 
                        sequencia = :sequencia, 
                        software = :software, 
                        id_motivo = :id_motivo, 
                        dir_img = :dir_img 
                    WHERE id = :id_card";
            $stmt = $this->db->prepare($sql);
            
            // Bind dos parâmetros
            $stmt->bindParam(':id_card', $data['id_card']);
            $stmt->bindParam(':id_cliente', $data['id_cliente']);
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
            $stmt->bindParam(':dir_img', $data['dir_img']);
    
            $stmt->execute();
        } catch (Exception $e) {
            throw new Exception('Erro ao editar cartão: ' . $e->getMessage());
        }
    }
}
