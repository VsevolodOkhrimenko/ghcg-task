from django.core.management.base import BaseCommand
from ghcg_task.transaction.models import Transaction


class Command(BaseCommand):
    help = 'Delete all products'

    def handle(self, *args, **options):
        transactions = Transaction.objects.all()
        transactions_number = transactions.count()
        transactions.delete()
        self.stdout.write(
            self.style.SUCCESS(
                'Script run finished. Successfully deleted %s transactions' % transactions_number))
