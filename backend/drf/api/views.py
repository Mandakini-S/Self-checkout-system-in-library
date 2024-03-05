# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Admin, Book, Cart, Students
from .serializers import AdminSerializer, BookSerializer, CartSerializer, StudentsSerializer, CartBookSerializer
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
def combined_data(request, sc_uid, b_uid=None):
    try:
        # Filter cart entries based on sc_uid and optional b_uid
        cart_entries = Cart.objects.filter(sc_uid_id=sc_uid)
        if b_uid:
            cart_entries = cart_entries.filter(b_uid_id=b_uid)
        
        # Serialize the retrieved data using CartBookSerializer
        serializer = CartBookSerializer(cart_entries, many=True)
        
        # Return the serialized data in the response
        return Response(serializer.data)

    except Exception as e:
        # Handle any exceptions and return an error response
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def book_detail(request, b_uid):
    try:
        # Retrieve the book with the given b_uid
        book = Book.objects.get(b_uid=b_uid)
        
        # Retrieve the cart entry associated with the book
        cart_entry = Cart.objects.filter(b_uid=b_uid).first()
        
        if cart_entry:
            # Serialize the retrieved data using CartBookSerializer
            serializer = CartBookSerializer(cart_entry)
            data = serializer.data
        else:
            # If there's no cart entry, create an empty dictionary
            data = {}
        
        # Add book details to the serialized data
        data['book_details'] = {
            'b_uid': book.b_uid,
            'book_name': book.book_name,
            'author': book.author,
            'volume': book.volume
        }
        
        # Return the combined data in the response
        return Response(data)
    
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    
    
    
    
@api_view(['DELETE'])
def delete_book_from_cart(request, b_uid):
    try:
        # Filter and delete all cart entries related to the provided b_uid
        cart_entries = Cart.objects.filter(b_uid=b_uid)
        cart_entries.delete()

        # Return success message
        return Response({'message': f'All cart entries related to book with b_uid {b_uid} have been deleted'}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        # Return error message if deletion fails
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    
    