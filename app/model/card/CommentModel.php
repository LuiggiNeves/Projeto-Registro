<?php

namespace App\model\card;

require_once __DIR__ . '/../../../vendor/autoload.php';

use App\connection\DataBase;
use PDO;
use Exception;

class CommentModel
{
    private $db;

    public function __construct()
    {
        $this->db = DataBase::getConn();
    }

    // Método para obter todos os comentários relacionados a um cartão específico
    public function getCommentsByCardId($id_card)
    {
        try {
            $sql = "
            SELECT 
                comentarios.id,
                comentarios.valor_comentario,
                comentarios.situacao,
                comentarios.data,
                operador.nome AS operador_nome  -- Inclui o nome do operador
            FROM 
                comentarios
            LEFT JOIN 
                operador ON comentarios.id_operador = operador.id  -- Relaciona com a tabela operador
            WHERE 
                comentarios.id_card = :id_card
            ORDER BY comentarios.data ASC
            ";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':id_card', $id_card, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception('Erro ao obter comentários: ' . $e->getMessage());
        }
    }

    // Método para adicionar um novo comentário vinculado a um cartão e operador
    public function addComment($id_card, $valor_comentario, $situacao, $id_operador)
    {
        try {
            $sqlInsertComment = "
            INSERT INTO comentarios (id_card, valor_comentario, situacao, data, id_operador)
            VALUES (:id_card, :valor_comentario, :situacao, NOW(), :id_operador)
            ";
            $stmt = $this->db->prepare($sqlInsertComment);
            $stmt->bindValue(':id_card', $id_card, PDO::PARAM_INT);
            $stmt->bindValue(':valor_comentario', $valor_comentario, PDO::PARAM_STR);
            $stmt->bindValue(':situacao', $situacao, PDO::PARAM_INT);
            $stmt->bindValue(':id_operador', $id_operador, PDO::PARAM_INT);  // Inclui o operador
            $stmt->execute();

            return $this->db->lastInsertId(); // Retorna o ID do novo comentário
        } catch (Exception $e) {
            throw new Exception('Erro ao adicionar comentário: ' . $e->getMessage());
        }
    }
}
