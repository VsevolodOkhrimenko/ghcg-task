GHCG Task
=========

Technical task for GHCG

Basic Commands
--------------

Setting Up Your Users
^^^^^^^^^^^^^^^^^^^^^

* To up and build application, use next commands::

    $ cd frontned
    $ npm install
    $ npm run build
    $ cd ..
    $ docker-compose -f local.yml up --build

* To create an **superuser account**, use this command::

    $ docker-compose -f local.yml run --rm django python manage.py createsuperuser

* To add 100 dummy transactions use::

    $ docker-compose -f local.yml run --rm django python manage.py add_transactions 100
