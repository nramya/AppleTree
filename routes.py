import logging

from bcrypt import hashpw, gensalt
from flask import Blueprint, flash, redirect, render_template, request, session, abort, url_for
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_required, login_user, logout_user, current_user

from models import db, User

logger = logging.getLogger(__name__)
bintree = Blueprint('bintree', __name__)
login_manager = LoginManager()
bcrypt = Bcrypt()


@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.

    :param unicode user_id: user_id (email) user to retrieve

    """
    return User.query.get(user_id)


@bintree.route('/')
def index():
    if not current_user.is_authenticated:
        return render_template('login.html')
    else:
        return redirect('/home')


@bintree.route('/login', methods=['GET', 'POST'])
def do_admin_login():
    if request.method == 'POST':
        email = request.form['email']
        user = User.query.get(email)
        if user:
            password = request.form['password']
            if bcrypt.check_password_hash(user.password, password):
                user.authenticated = True
                db.session.add(user)
                db.session.commit()
                login_user(user, remember=True)
                flash('Successfully logged in!')
                return redirect('/home')
            else:
                flash('Credentials do not match. Try again.')
        else:
            flash('Credentials do not match. Try again, or register as a new user.')
    return index()


@bintree.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    user = User.query.get(email)
    if user:
        flash('User already exists for this email.')
    else:
        password = request.form['password']
        hashed_password = hashpw(password.encode('utf-8'), gensalt())
        user = User(email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
        flash('Successfully created user!')
    return index()


@bintree.route("/logout")
def logout():
    if not current_user:
        return redirect('/')

    logout_user()
    flash('Successfully logged out!')
    return index()


@bintree.route('/home')
def home():
    if not current_user:
        return redirect('/')

    return render_template('app.html')
