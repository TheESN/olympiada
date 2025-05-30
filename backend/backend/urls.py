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
from django.urls import path, include, re_path
from olymp.olymp_views import OlympViewSet, OlympViewList, AddOlympViewSet
from olymp.employee_views import EmployeeViewSet, EmployeeViewList, AddEmployeeViewSet
from olymp.student_views import StudentViewSet, StudentViewList, StudentFromOlympViewList
from olymp.views import UserViewList, GenderViewList, RoleViewList
from olymp.views import UserViewSet, AddUserViewSet
from olymp.school_views import SchoolViewList, SchoolViewSet, AddSchoolViewSet, FileUploadView
from olymp.subdivision_views import SubdivisionViewSet, AddSubdivisionViewSet, SubdivisionViewList, SubdivisionFileUploadView
from olymp.application_views import ApplicationUploadView, ApplicationViewSet, ApplicationViewList, AddApplicationViewSet, ChangeApplicationStatus, ChangeApplicationStatusMultiple
from olymp.participant_views import ParticipantViewSet, ParticipantViewList, AddParticipantViewSet
from olymp.result_views import ResultViewSet, ResultViewList, AddResultViewSet
from olymp.country_views import CountryViewSet, CountryViewList, AddCountryViewSet
from olymp.application_gen_views import ApplicationGenView
from rest_framework.authtoken import views

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

api = [
    path('employee', AddEmployeeViewSet.as_view()),
    path('getemployee/<int:id>', EmployeeViewSet.as_view()),
    path('getemployees', EmployeeViewList.as_view({'get': 'list'})),
    path('olympiada', AddOlympViewSet.as_view()),
    path('getolympiada/<int:id>', OlympViewSet.as_view()),
    path('getolympiadas', OlympViewList.as_view({'get': 'list'})),
    path('getstudent/<int:id>', StudentViewSet.as_view()),
    path('getstudents', StudentViewList.as_view({'get': 'list'})),
    path('getapplication/<int:id>', ApplicationViewSet.as_view()),
    path('getapplications', ApplicationViewList.as_view({'get': 'list'})),
    path('getstudentfromolymp/<int:olymp_id>', StudentFromOlympViewList.as_view({'get': 'list'})),
    path('application', AddApplicationViewSet.as_view()),
    path('applicationstatus/<int:id>', ChangeApplicationStatus.as_view()),
    path('applicationstatuses', ChangeApplicationStatusMultiple.as_view()),
    path('getapplicationexcel/<int:olymp_id>', ApplicationGenView.as_view()),
    path('subdivision', AddSubdivisionViewSet.as_view()),
    path('getsubdivision/<int:id>', SubdivisionViewSet.as_view()),
    path('getsubdivisions', SubdivisionViewList.as_view({'get': 'list'})),
    path('getusers', UserViewList.as_view({'get': 'list'})),
    path('getgenders', GenderViewList.as_view()),
    path('getroles', RoleViewList.as_view()),
    path('getschools', SchoolViewList.as_view({'get': 'list'})),
    path('getschool/<int:id>', SchoolViewSet.as_view()),
    path('school', AddSchoolViewSet.as_view()),
    path('uploadfile', FileUploadView.as_view()),
    path('getuser', UserViewSet.as_view()),
    path('adduser', AddUserViewSet.as_view()),
    path('getcountry/<int:id>', CountryViewSet.as_view()),
    path('getcountries', CountryViewList.as_view({'get': 'list'})),
    path('country', AddCountryViewSet.as_view()),
    path('getparticipant/<int:id>', ParticipantViewSet.as_view()),
    path('getparticipants', ParticipantViewList.as_view({'get': 'list'})),
    path('participant', AddParticipantViewSet.as_view()),
    path('getresult/<int:id>', ResultViewSet.as_view()),
    path('getresults', ResultViewList.as_view({'get': 'list'})),
    path('result', AddResultViewSet.as_view())
]
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api, 'olymp'), namespace='api')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    re_path(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view()),
    re_path(r'^upload/participants/(?P<olymp_id>\d+)/(?P<filename>[^/]+)$', ApplicationUploadView.as_view()),
    re_path(r'^uploadsubdivision/(?P<filename>[^/]+)$', SubdivisionFileUploadView.as_view()),
]
