# urls.py

from django.contrib import admin
from django.urls import path, include
from api import views
from rest_framework.routers import DefaultRouter

# Creating router object
router = DefaultRouter()

# Register viewsets with router
router.register('adminapi', views.AdminModelViewSet, basename='admin')
router.register('bookapi', views.BookModelViewSet, basename='book')
router.register('cartapi', views.CartModelViewSet, basename='cart')
router.register('studentsapi', views.StudentsModelViewSet, basename='students')

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include router.urls to automatically include URLs for viewsets
    path('', include(router.urls)),
    # For custom actions, define a path separately
    # path('check-student-existence/', views.StudentsModelViewSet.as_view({'post': 'check_student_existence'}), name='check_student_existence'),
    path('combined-data/', views.combined_data, name='combined_data'),
    path('combined-data/<str:sc_uid>/', views.combined_data, name='combined_data'),
    path('recent-books/', views.recent_books, name='recent_books'),
]