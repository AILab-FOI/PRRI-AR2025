#!/usr/bin/env python
from flask import Flask, send_from_directory, render_template
import ssl
import os

app = Flask(__name__, template_folder="templates", static_folder="ar")

# Root route serving a Jinja2 template
@app.route("/")
def home():
    return render_template("index.tpl", message="Hello from Flask!")

# Serve static files from the "ar" directory
@app.route("/ar/")
@app.route("/ar/<path:filename>")
def serve_static(filename="index.html"):
    file_path = os.path.join("ar", filename)

    # Check if the requested file exists
    if not os.path.isfile(file_path):
        abort(404)  # Return a 404 response if the file does not exist

    return send_from_directory("ar", filename)

# Dynamic routes
@app.route("/qr")
def qr():
    return "<h1>QR Code Page</h1>"

@app.route("/join")
def join():
    return "<h1>Join Page</h1>"

if __name__ == "__main__":
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")  # Load SSL certificates

    # Run Flask app with HTTPS on port 443
    app.run(host="0.0.0.0", port=443, ssl_context=context)

