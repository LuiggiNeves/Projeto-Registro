<?php

namespace App\Model;

use App\connection\DataBase;
use PDO;
use PDOException;

class UserModel
{
    private $db;

    public function __construct(){
        $this->db = DataBase::getConn();
    }

    public function validateUser($name, $password)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM operador WHERE nome = :name");
            $stmt->bindParam(':name', $name);
            $stmt->execute();

            // Busca o usuário no banco de dados
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verifica se um usuário foi encontrado e se as credenciais estão corretas
            if ($user && $user['nome'] == $name && $user['senha'] == $password) {
                return $user['id']; // Retorna o userId se a senha estiver correta
            } else {
                return false;
            }

        } catch (PDOException $e) {
            // Log ou tratamento de erro
            error_log("Erro ao validar o usuário: " . $e->getMessage());
            return false;
        }
    }

    public function getUserInfoByUsername($username)
    {
        try {
            $stmt = $this->db->prepare("SELECT id, nome, email FROM operador WHERE nome = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            // Retorna as informações do usuário como um array associativo
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Log ou tratamento de erro
            error_log("Erro ao buscar informações do usuário: " . $e->getMessage());
            return false;
        }
    }

    // Novo método para buscar o nome do usuário pelo ID
    public function getUserNameById($userId)
    {
        try {
            $stmt = $this->db->prepare("SELECT nome FROM operador WHERE id = :userId");
            $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Retorna o nome do usuário se encontrado
            return $user ? $user['nome'] : false;
        } catch (PDOException $e) {
            // Log ou tratamento de erro
            error_log("Erro ao buscar nome do usuário: " . $e->getMessage());
            return false;
        }
    }
}
?>
