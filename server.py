from flask import Flask, request, render_template, abort, send_from_directory
from flask_socketio import SocketIO
import ssl
import os

app = Flask(__name__)
socketio = SocketIO(app)

players = {}


@app.route("/")
@app.route("/<page>")
def render_page(page="index"):
    try:
        return render_template(f"{page}.html")
    except:  # noqa: E722
        abort(404)  # if template not found


@app.route("/ar/")
@app.route("/ar/<path:filename>")
def serve_static(filename="index.html"):
    file_path = os.path.join("ar", filename)
    if not os.path.isfile(file_path):
        abort(404)

    return send_from_directory("ar", filename)


@socketio.on("join")
def handle_join(data):
    player_name = data["name"]
    players[request.sid] = player_name
    socketio.emit("players_update", players)


@socketio.on("disconnect")
def handle_disconnect():
    if request.sid in players:
        del players[request.sid]
    socketio.emit("players_update", players)


@socketio.on("start_game")
def start_game():
    socketio.emit("game_started")


if __name__ == "__main__":
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
    socketio.run(app, host="0.0.0.0", port=5000, debug=True, ssl_context=context)
