<?php
namespace App\Model\httpAcess;

use App\Connection\DataBase; // Certifique-se de que o namespace está correto

class ValidationUser {
    public function validateUser($nome, $senha) {
        // Obter a instância de conexão do banco de dados
        $conn = DataBase::getConn();

        // Prepara a consulta SQL para verificar o usuário
        $stmt = $conn->prepare("SELECT * FROM operador WHERE nome = ? AND senha = ?");
        $stmt->bindParam(1, $nome);
        $stmt->bindParam(2, $senha);

        // Executa a consulta
        $stmt->execute();
        $result = $stmt->fetchAll();

        // Verifica se as credenciais estão corretas
        return count($result) > 0;
    }
}
?>
