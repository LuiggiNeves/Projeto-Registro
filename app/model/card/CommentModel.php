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
                operador.nome AS operador_nome
            FROM 
                comentarios
            LEFT JOIN 
                operador ON comentarios.id_operador = operador.id
            WHERE 
                comentarios.id_card = :id_card
            ORDER BY comentarios.data ASC
            ";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':id_card', $id_card, PDO::PARAM_INT);
            $stmt->execute();
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Obter arquivos para cada comentário
            foreach ($comments as &$comment) {
                $comment['arquivos'] = $this->getFilesByCommentId($comment['id']);
            }

            return $comments;
        } catch (Exception $e) {
            throw new Exception('Erro ao obter comentários: ' . $e->getMessage());
        }
    }

    // Método para obter arquivos relacionados a um comentário específico
    public function getFilesByCommentId($id_comentario)
    {
        try {
            $sql = "SELECT dir_path FROM arquivos_comentarios WHERE id_comentario = :id_comentario";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':id_comentario', $id_comentario, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            throw new Exception('Erro ao obter arquivos: ' . $e->getMessage());
        }
    }

    // Método para adicionar um novo comentário vinculado a um cartão e operador
    public function addComment($id_card, $valor_comentario, $situacao, $id_operador, $filePaths = [])
    {
        try {
            $this->db->beginTransaction();

            $sqlInsertComment = "
            INSERT INTO comentarios (id_card, valor_comentario, situacao, data, id_operador)
            VALUES (:id_card, :valor_comentario, :situacao, NOW(), :id_operador)
            ";
            $stmt = $this->db->prepare($sqlInsertComment);
            $stmt->bindValue(':id_card', $id_card, PDO::PARAM_INT);
            $stmt->bindValue(':valor_comentario', $valor_comentario, PDO::PARAM_STR);
            $stmt->bindValue(':situacao', $situacao, PDO::PARAM_INT);
            $stmt->bindValue(':id_operador', $id_operador, PDO::PARAM_INT);
            $stmt->execute();

            $newCommentId = $this->db->lastInsertId();

            // Inserir caminhos de arquivos na tabela arquivos_comentarios
            foreach ($filePaths as $filePath) {
                $sqlInsertFile = "
                INSERT INTO arquivos_comentarios (id_comentario, dir_path, situacao)
                VALUES (:id_comentario, :dir_path, :situacao)
                ";
                $stmtFile = $this->db->prepare($sqlInsertFile);
                $stmtFile->bindValue(':id_comentario', $newCommentId, PDO::PARAM_INT);
                $stmtFile->bindValue(':dir_path', $filePath, PDO::PARAM_STR);
                $stmtFile->bindValue(':situacao', 1, PDO::PARAM_INT);
                $stmtFile->execute();
            }

            $this->db->commit();

            return $newCommentId;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw new Exception('Erro ao adicionar comentário: ' . $e->getMessage());
        }
    }
}
