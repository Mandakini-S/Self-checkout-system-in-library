
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
        