<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask Jinja2 Template</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>{{ message }}</h1>  <!-- Dynamic content from Flask -->
    <p>Securely served over HTTPS.</p>

    <h2>Dynamic List Example:</h2>
    <ul>
        {% for item in ['Item 1', 'Item 2', 'Item 3'] %}
            <li>{{ item }}</li>
        {% endfor %}
    </ul>
</body>
</html>

