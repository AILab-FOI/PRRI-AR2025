<!DOCTYPE html>
<html lang="hr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="opis" content="Pocetni izbornik">
    <meta name="keywords" content="pocetna stranica, postavke , tutorijal">
    <title>Escape Retrofuture</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #111;
            color: white;
            text-align: center;
            margin: 0;
            padding: 0;
        }
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        h1 {
            font-size: 4rem;
            background: linear-gradient(to right, #3fcaff, #ff66b2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        h2 {
            font-size: 1.5rem;
            color: #ff0077;
        }
        .menu {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            width: 300px;
        }
        .menu button {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 5px;
            transition: 0.3s;
        }
        .start { background-color: #3fcaff; color: black; }
        .start:hover { background-color: #32a3d3; }
        .tutorial { background-color: #6a4caf; color: white; }
        .tutorial:hover { background-color: #58409c; }
        .settings, .about { background-color: #222; color: white; }
        .settings:hover, .about:hover { background-color: #444; }
        .mute {
            position: absolute;
            bottom: 20px;
            font-size: 1.5rem;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ESCAPE</h1>
        <h2>RETROFUTURE</h2>
        <div class="menu">
            <button class="start">🚀 START GAME</button>
            <button class="about">ℹ ABOUT</button>
        </div>
        <div class="mute">🔇</div>
    </div>
</body>
</html>
