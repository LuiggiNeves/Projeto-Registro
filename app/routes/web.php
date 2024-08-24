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


