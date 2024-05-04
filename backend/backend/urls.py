"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from olymp.views import EmployeeViewSet, EmployeeViewList, StudentViewSet, StudentViewList, OlympViewSet, OlympViewList, ApplicationViewSet, ApplicationViewList
from rest_framework.authtoken import views

api = [
    path('getemployee/<int:id>', EmployeeViewSet.as_view()),
    path('getemployees', EmployeeViewList.as_view({'get': 'list'})),
    path('getolympiada/<int:id>', OlympViewSet.as_view()),
    path('getolympiadas', OlympViewList.as_view({'get': 'list'})),
    path('getstudent/<int:id>', StudentViewSet.as_view()),
    path('getstudents', StudentViewList.as_view({'get': 'list'})),
    path('getapplication/<int:id>', ApplicationViewSet.as_view()),
    path('getapplications', ApplicationViewList.as_view({'get': 'list'}))
]
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api, 'olymp'), namespace='api')),
    path('api-token-auth/', views.obtain_auth_token)
]
