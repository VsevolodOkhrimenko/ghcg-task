from rest_framework import status, viewsets, mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from .models import Transaction, Reciever
from .serializers import TransactionSerializer, RecieverSerializer

# Create your views here.
RESULT_PAGE_SIZE = 20


class ResultsSetPagination(LimitOffsetPagination):
    default_limit = RESULT_PAGE_SIZE
    max_limit = RESULT_PAGE_SIZE
    template = None

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'results': data
        })


class TransactionViewSet(mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.CreateModelMixin,
                         mixins.UpdateModelMixin,
                         viewsets.GenericViewSet):
    serializer_class = TransactionSerializer
    pagination_class = ResultsSetPagination
    queryset = Transaction.objects.none()

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(user=user)

    def list(self, request):
        search = request.GET.get('search', '')
        order_by = request.GET.get('order_by', '-created')
        queryset = self.get_queryset()
        result = queryset.filter(
            reciever__name__icontains=search).order_by(order_by)
        page = self.paginate_queryset(result)
        serializer = self.get_serializer(
            page, many=True,
            context={'request': request})
        if page is not None:
            return self.get_paginated_response(serializer.data)
        return Response(serializer.data)

    def create(self, request):
        user = request.user
        data = request.data
        reciever = Reciever.objects.filter(id=data['reciever']).first()
        serializer = self.get_serializer(
            data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=user, reciever=reciever)
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        status = request.data['status']
        queryset = self.get_queryset()
        transaction = queryset.filter(id=pk).first()
        if transaction is None:
            return Response(
                {'status': 'Not Found'}, status=status.HTTP_404_NOT_FOUND)
        transaction.status = status
        transaction = transaction.save()
        serializer = self.get_serializer(
            transaction, many=False, context={'request': request})
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        status = request.data['status']
        queryset = self.get_queryset()
        transaction = queryset.filter(id=pk).first()
        if transaction is None:
            return Response(
                {'status': 'Not Found'}, status=status.HTTP_404_NOT_FOUND)
        transaction.status = status
        transaction = transaction.save()
        serializer = self.get_serializer(
            transaction, many=False, context={'request': request})
        return Response(serializer.data)


class RecieverViewSet(mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    serializer_class = RecieverSerializer
    queryset = Reciever.objects.none()

    def get_queryset(self):
        user = self.request.user
        return Reciever.objects.filter(user=user)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(
            queryset, many=True,
            context={'request': request})
        return Response(serializer.data)
