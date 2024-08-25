<?php

namespace App\Config;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class AuthToken
{
    private static $secretKey = '123456789'; // Substitua por sua chave secreta real
    private static $algorithm = 'HS256'; // Algoritmo de assinatura

    public static function generateToken($data)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600; // Token válido por 1 hora
        $payload = array(
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'data' => $data
        );

        return JWT::encode($payload, self::$secretKey, self::$algorithm);
    }

    public static function validateToken($token)
    {
        try {
            $decoded = JWT::decode($token, new Key(self::$secretKey, self::$algorithm));
            return (array) $decoded->data; // Retorna os dados decodificados do token
        } catch (Exception $e) {
            error_log('Erro ao validar token: ' . $e->getMessage());
            return false; // Token inválido ou expirado
        }
    }    
}

?>
