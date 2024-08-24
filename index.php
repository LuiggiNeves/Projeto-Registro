<?php
require_once __DIR__ . '/app/config/global.php';

// Inclua o arquivo de rotas
require_once 'app/routes/web.php';

$router = new Routes();




$router->RotasFixas('/Projeto-Registro/login', function() {
    require 'app/public/login.php';
});

$router->RotasFixas('/Projeto-Registro/Dashboard', function() {
    require 'app/public/DashBoard.php';
});

$router->RotasFixas('/Projeto-Registro/admin', function() {
    require 'app/public/access.php';
});


// Resolva a rota com base no URI atual
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remover o echo de debug
$router->resolve($requestUri);
?>