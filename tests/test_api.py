import unittest

import app
from models import db

TEST_DB = 'test.db'

test_app = app.get_app()


class BasicTests(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['DEBUG'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + TEST_DB
        self.app = app.test_client()
        db.drop_all()
        db.create_all()
        self.assertEqual(app.debug, False)

    def tearDown(self):
        pass

    def test_index(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
