# models.py

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

class Admin(models.Model):
    user_name = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=100)
    ac_uid = models.CharField(max_length=36)
    pw = models.CharField(max_length=20)

class Book(models.Model):
    b_uid = models.CharField(max_length=20, primary_key=True)
    book_name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    volume = models.CharField(max_length=4)


    
class Students(models.Model):
    sc_uid = models.CharField(max_length=36, primary_key=True)
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=15)


from django.db import models
from django.utils import timezone

def initial_accession_no():
    # Retrieve the maximum accession_no from existing Cart objects
    max_accession_no = Cart.objects.aggregate(models.Max('accession_no'))['accession_no__max']
    # If no Cart objects exist yet or the maximum is less than 600000, start from 600000
    if max_accession_no is None or max_accession_no < 600000:
        return 600000
    # Otherwise, start from the next value after the maximum
    return max_accession_no + 1

class Cart(models.Model):
    accession_no = models.AutoField(primary_key=True, default=initial_accession_no)
    sc_uid = models.ForeignKey(Students, on_delete=models.CASCADE, related_name='cart_entries')
    b_uid = models.ForeignKey(Book, on_delete=models.CASCADE)
    issue_date = models.DateField(default=timezone.now)
    expiry_date = models.DateField()

    def save(self, *args, **kwargs):
        if not self.expiry_date:
            self.expiry_date = self.issue_date + timezone.timedelta(days=90)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.accession_no}"
