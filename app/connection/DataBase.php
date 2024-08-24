<?php

class DataBase
{
    private static $instance;


    public function getConn()
    {

        if (!isset(self::$instance)) {
            self::$instance = new PDO('mysql:host=localhost;dbname=registrodb', 'root', '');

            return self::$instance;
        }return self::$instance;
    }
}
