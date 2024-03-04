# serializers.py

from rest_framework import serializers
from .models import Admin, Book, Cart, Students

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['user_name', 'name', 'ac_uid', 'pw']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['b_uid', 'book_name', 'author', 'volume']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['accession_no', 'sc_uid', 'b_uid', 'issue_date', 'expiry_date']

class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ['sc_uid', 'name', 'roll_no']
        
# serializers.py
# serializers.py

class CartBookSerializer(serializers.ModelSerializer):
    book_name = serializers.CharField(source='b_uid.book_name', read_only=True)
    student_name = serializers.CharField(source='sc_uid.name', read_only=True)
    roll_no = serializers.CharField(source='sc_uid.roll_no', read_only=True)

    class Meta:
        model = Cart
        fields = ['accession_no', 'sc_uid', 'b_uid', 'book_name', 'student_name', 'roll_no', 'issue_date', 'expiry_date']

class RecentBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['b_uid']