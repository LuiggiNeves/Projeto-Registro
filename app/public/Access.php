<?php 
require_once 'vendor/autoload.php';
include 'app/view/structure/access/head.php'; ?>


<title>Sistema | Admin</title>
</head>

<body>
    <header>
        <?php include 'app/view/pages/access/header/nav/navbar.php' ?>
    </header>

    <main>
        <div class="Container_Main_Content">
            <?php include 'app/view/pages/access/main/menu/menu-content.php' ?>
        </div>
    </main>

    <?php include 'app/view/structure/access/footer.php' ?>
    <?php include 'app/view/structure/access/footer-script.php' ?>
</body>