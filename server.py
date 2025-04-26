from flask import Flask, request 
from flask_socketio import SocketIO, emit
from flask import Flask, render_template

app = Flask(__name__)
socketio = SocketIO(app)

players = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lobby')
def lobby():
    return render_template('lobby.html')

@app.route('/game')
def game():
    return render_template('game.html')

@socketio.on('join')
def handle_join(data):
    player_name = data['name']
    players[request.sid] = player_name
    socketio.emit('players_update', players)

@socketio.on('disconnect')
def handle_disconnect():
    if request.sid in players:
        del players[request.sid]
    socketio.emit('players_update', players)

@socketio.on('start_game')
def start_game():
    socketio.emit('game_started')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)


