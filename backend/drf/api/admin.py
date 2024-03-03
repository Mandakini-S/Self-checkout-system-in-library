
# admin.py


from django.contrib import admin
from .models import Admin, Book, Cart, Students

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'name', 'ac_uid']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['b_uid', 'book_name', 'author', 'volume']

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['accession_no', 'sc_uid', 'b_uid', 'issue_date', 'expiry_date']

@admin.register(Students)
class StudentsAdmin(admin.ModelAdmin):
    list_display = ['sc_uid', 'name', 'roll_no']