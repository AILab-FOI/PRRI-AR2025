from flask import Flask, request, render_template, abort, send_from_directory
from flask_socketio import SocketIO
import ssl
import os

app = Flask(__name__)
socketio = SocketIO(app)

players = {}
admin_sid = None
game_started = False


@app.route("/")
@app.route("/<page>")
def render_page(page="index"):
    try:
        return render_template(f"{page}.html")
    except:  # noqa: E722
        abort(404)


@socketio.on("time_up")
def handle_time_up():
    socketio.emit("time_up_all")


@app.route("/ar/")
@app.route("/ar/<path:filename>")
def serve_static(filename="index.html"):
    file_path = os.path.join("ar", filename)
    if not os.path.isfile(file_path):
        abort(404)

    return send_from_directory("ar", filename)


@app.route("/game-status")
def game_status():
    return {"game_started": game_started}


@socketio.on("join")
def handle_join(data):
    global admin_sid
    player_name = data["name"]
    players[request.sid] = player_name

    if admin_sid is None:
        admin_sid = request.sid

    socketio.emit("players_update", {"players": players, "admin": admin_sid})


@socketio.on("disconnect")
def handle_disconnect():
    global admin_sid
    if request.sid in players:
        del players[request.sid]

    if request.sid == admin_sid:
        admin_sid = next(iter(players), None)

    socketio.emit("players_update", {"players": players, "admin": admin_sid})


@socketio.on("kick_player")
def kick_player(sid_to_kick):
    if request.sid == admin_sid and sid_to_kick in players:
        players.pop(sid_to_kick, None)
        socketio.emit("kicked", room=sid_to_kick)


@socketio.on("start_game")
def start_game():
    global game_started
    if request.sid != admin_sid:
        return
    game_started = True
    socketio.emit("game_started")


@socketio.on("kick_player")
def handle_kick_player(data):
    global admin_sid
    if request.sid != admin_sid:
        return

    player_id = data.get("id")
    if player_id in players:
        socketio.emit("kicked", room=player_id)
        del players[player_id]
        socketio.emit("players_update", {"players": players, "admin": admin_sid})


@socketio.on("victory")
def handle_victory():
    socketio.emit("victory_achieved")


if __name__ == "__main__":
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
    socketio.run(app, host="0.0.0.0", port=5000, debug=True, ssl_context=context)
