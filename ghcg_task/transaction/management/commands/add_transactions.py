from faker import Faker
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from ghcg_task.transaction.models import Reciever, Transaction


User = get_user_model()

type_identifiers = ['Card Payment', 'Online Transfer', 'Transaction']


class Command(BaseCommand):
    help = 'Add dummy transactions'

    def add_arguments(self, parser):
        parser.add_argument('number', type=int)

        parser.add_argument(
            '--user',
            help='Add transactions for specific user',
        )

        parser.add_argument(
            '--reciever',
            help='Add transactions for specific reciever',
        )

        parser.add_argument(
            '--status',
            help='Set transactions with specific status',
            type=int,
        )

    def handle(self, *args, **options):
        fake = Faker()
        user = None
        reciever = None
        status = None
        recievers = Reciever.objects.all()
        recievers_count = recievers.count() - 1
        reciever_ids = recievers.values_list('id', flat=True)
        users = User.objects.all()
        users_count = users.count() - 1
        users_ids = users.values_list('id', flat=True)
        if (options['user']):
            try:
                user = User.objects.get(id=options['user'])
            except User.DoesNotExist:
                raise CommandError(
                    'User "%s" does not exist' % options['user'])
        if (options['reciever']):
            try:
                reciever = Reciever.objects.get(id=options['reciever'])
            except Reciever.DoesNotExist:
                raise CommandError(
                    'Category "%s" does not exist' % options['reciever'])
        if (options['status']):
            status = options['status']
        for index in range(options['number']):
            if reciever is None:
                reciever = recievers.filter(
                    id=reciever_ids[fake.pyint(
                        max_value=recievers_count)]).first()
            if user is None:
                user = users.filter(
                    id=users_ids[fake.pyint(
                        max_value=users_count)]).first()
            if status is None:
                status = fake.pyint(max_value=3)
            if status == 2:
                amount = fake.pydecimal(
                    positive=True, max_value=10000,
                    min_value=1, right_digits=2)
            else:
                amount = fake.pydecimal(
                    max_value=-1, right_digits=2)

            transaction = Transaction(
                user=user,
                reciever=reciever,
                amount=amount,
                payment_type=type_identifiers[fake.pyint(max_value=2)],
                status=status,
            )
            transaction.save()
            transaction.created = fake.date_time_between(start_date='-30d')
            transaction.save()
            if index % 100 == 0 and index != 0:
                self.stdout.write(
                    self.style.SUCCESS(
                        'Successfully added %s transactions' % index))

        self.stdout.write(
            self.style.SUCCESS(
                'Script run finished. Successfully added %s transactions' % options['number']))
