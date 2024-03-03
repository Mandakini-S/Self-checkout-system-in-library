from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Admin, Book, Cart, Students
from .serializers import AdminSerializer, BookSerializer, CartSerializer, StudentsSerializer

class AdminModelViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    
class BookModelViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class CartModelViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class StudentsModelViewSet(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer
    
    @action(detail=False, methods=['post'])
    def check_student_existence(self, request):
        # Get the sc_uid from the request data
        sc_uid = request.data.get('sc_uid', None)
        
        if sc_uid is not None:
            # Check if the sc_uid exists in the Students table
            if Students.objects.filter(sc_uid=sc_uid).exists():
                return Response({'exists': True}, status=status.HTTP_200_OK)
            else:
                return Response({'exists': False}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'sc_uid parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
