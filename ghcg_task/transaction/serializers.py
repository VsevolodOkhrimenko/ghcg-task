from rest_framework import serializers
from .models import Transaction, Reciever


class RecieverSerializer(serializers.ModelSerializer):
    image_url = serializers.\
        SerializerMethodField('_image_url', read_only=True)

    def _image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)

    class Meta:
        model = Reciever
        fields = (
            'id',
            'image_url',
            'name',
        )


class TransactionSerializer(serializers.ModelSerializer):
    reciever = RecieverSerializer(many=False, read_only=True)

    class Meta:
        model = Transaction
        fields = (
            'id',
            'reciever',
            'payment_type',
            'amount',
            'status',
            'created',
        )
