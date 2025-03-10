from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='loginUrl'),  # Change '' to 'login/'    
    path('dashboard',views.dashboard, name='dash'),
    # #Item Routes
    path('department',views.department, name='department'),
    path('saveDepartment', views.insertDepartment, name='insert_department'),
    # path('getItems',views.get_item),
    # path('updateItem',views.updateItem),
    # path('deleteItem',views.deleteItem),
    
    # #Production URLs
    # path('production',views.production, name='production'),

    # #Quality Assuarance URLs
    # path('qualityAssuarance',views.qualityAssuarance,name='qualityAssuarance'),
    # path('add_to_QA',views.add_to_QA,name='add_to_QA'),

]