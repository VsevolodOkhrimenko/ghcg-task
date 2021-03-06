# Generated by Django 2.2.10 on 2020-06-28 23:33

from django.db import migrations, models
import django.db.models.deletion
import ghcg_task.transaction.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reciever',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.ImageField(null=True, upload_to=ghcg_task.transaction.models.image_directory_path)),
                ('name', models.CharField(max_length=130)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('payment_type', models.CharField(choices=[('Card Payment', 'CARD'), ('Online Transfer', 'ONLINE'), ('Transaction', 'TRANSACTION')], default='Card Payment', max_length=32)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('status', models.PositiveSmallIntegerField(choices=[(1, 'SEND'), (2, 'RECIEVED'), (3, 'PAYED')], default=1)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('reciever', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='transaction_reciever', to='transaction.Reciever')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
