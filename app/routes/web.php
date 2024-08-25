<?php

class Routes {
    private $routes = [
        'fixed' => [],
        'dynamic' => []
    ];

    public function RotasFixas($path, $callback) {
        $this->routes['fixed'][$path] = $callback;
    }

    public function RotasMod($path, $callback) {
        $this->routes['dynamic'][$path] = $callback;
    }

    public function resolve($requestUri) {

        if (isset($this->routes['fixed'][$requestUri])) {
            $callback = $this->routes['fixed'][$requestUri];
            call_user_func($callback);
            return;
        }

        if (!empty($this->routes['dynamic'])) {
            foreach ($this->routes['dynamic'] as $route => $callback) {
                $pattern = preg_replace('/{[^}]+}/', '([^/]+)', $route);
                $pattern = str_replace('/', '\/', $pattern);

                if (preg_match('/^' . $pattern . '$/', $requestUri, $matches)) {
                    array_shift($matches);
                    call_user_func_array($callback, $matches);
                    return;
                }
            }
        }

        echo "404 - Página não encontrada.";
    }
}


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