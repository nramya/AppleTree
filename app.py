import os

from flask import Flask
from models import db
from routes import bintree, login_manager


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///apple.db'


def get_app():
    return app


if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.config.from_object('config')
    db.init_app(app)
    login_manager.init_app(app)
    app.register_blueprint(bintree)
    with app.app_context():
        db.metadata.create_all(bind=db.engine)
    get_app().run(debug=True, host='0.0.0.0', port=5000)
