from flask import Blueprint, request
from ..models import Album, Comment, Favorite, Post, User, db
from random import choice, sample
from datetime import date
from flask_login import login_required, current_user
from ..forms import PostForm, UpdatePostForm, CommentForm
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from .auth_routes import validation_errors_to_error_messages

bytespace_routes = Blueprint('bytespaces', __name__)


