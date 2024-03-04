# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Admin, Book, Cart, Students
from .serializers import AdminSerializer, BookSerializer, CartSerializer, StudentsSerializer, CartBookSerializer,RecentBooksSerializer
from rest_framework.decorators import api_view
from django.db.models import Max


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


@api_view(['GET'])
def combined_data(request, sc_uid):
    try:
        # Retrieve all cart entries associated with the provided sc_uid
        cart_entries = Cart.objects.filter(sc_uid=sc_uid)
        
        # Serialize the retrieved data using CartBookSerializer
        serializer = CartBookSerializer(cart_entries, many=True)
        
        # Return the serialized data in the response
        return Response(serializer.data)
    
    except Exception as e:
        # Handle any exceptions and return an error response
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
def recent_books(request):
    try:
        # Retrieve the b_uid of the last 30 books added to cart
        recent_books = Cart.objects.values('b_uid').annotate(max_issue_date=Max('issue_date')).order_by('-max_issue_date')[:30]
        
        # Serialize the retrieved data using RecentBooksSerializer
        serializer = RecentBooksSerializer(recent_books, many=True)
        
        # Return the serialized data in the response
        return Response(serializer.data)
    
    except Exception as e:
        # Handle any exceptions and return an error response
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
