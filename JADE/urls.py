"""
URL configuration for JADE project.

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
from django.urls import path
from web.views import homepage, tablepage, statisticspage, mappage, circspage, mentionpage
from web.views import database_creater

urlpatterns = [
    # path('admin/', admin.site.urls),

    # urls temporaires pour la création de base de données
    # path('createdb/',database_creater.create_database),
    # path('createlink/',database_creater.create_link),

    path('', homepage.home_render),
    path('home/', homepage.home_render),

    path('table/', tablepage.table_render),

    path('departments/', mappage.map_render),

    path('circonscriptions/', circspage.circs_render),

    path('statistics/', statisticspage.statistics_render),

    path('mentions/', mentionpage.mention_render),
]
