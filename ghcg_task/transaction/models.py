import uuid
from enum import Enum, IntEnum
from django.contrib.auth import get_user_model
from django.utils.html import format_html
from django.db import models


User = get_user_model()


def image_directory_path(instance, filename):
    return 'image_{0}/{1}'.format(
        instance.id, filename)


class Reciever(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        related_name="reciever_user",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    image = models.ImageField(
        upload_to=image_directory_path,
        null=True)
    name = models.CharField(max_length=130)

    def image_tag(self):
        if self.image:
            return format_html(
                u'<img style="height: auto; max-width: 150px;" src="{}" />'
                .format(self.image.url))
        else:
            return None
    image_tag.short_description = 'Image preview'
    image_tag.allow_tags = True

    def __unicode__(self):
        return str(self.name)

    def __str__(self):
        return str(self.name)


class TransactionTypeIdentifier(Enum):
    CARD = 'Card Payment'
    ONLINE = 'Online Transfer'
    TRANSACTION = 'Transaction'


class TransactionStatusIdentifier(IntEnum):
    SEND = 1
    RECIEVED = 2
    PAYED = 3


class Transaction(models.Model):

    class Meta:
        ordering = ('created',)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        related_name="transaction_user",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    reciever = models.ForeignKey(
        Reciever,
        related_name="transaction_reciever",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    payment_type = models.CharField(
        max_length=32, default=TransactionTypeIdentifier.CARD.value,
        choices=[(_.value, _.name) for _ in TransactionTypeIdentifier])
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.PositiveSmallIntegerField(
        default=TransactionStatusIdentifier.SEND.value,
        choices=[(_.value, _.name) for _ in TransactionStatusIdentifier])
    created = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        if self.reciever:
            return str(self.reciever.name)
        return str(self.id)

    def __str__(self):
        if self.reciever:
            return str(self.reciever.name)
        return str(self.id)
