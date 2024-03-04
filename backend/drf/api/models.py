# models.py


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

# models.py


class Cart(models.Model):
    accession_no = models.IntegerField(primary_key=True)
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