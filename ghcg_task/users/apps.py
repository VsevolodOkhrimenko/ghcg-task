from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "ghcg_task.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import ghcg_task.users.signals  # noqa F401
        except ImportError:
            pass
