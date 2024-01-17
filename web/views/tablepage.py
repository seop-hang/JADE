from web import models
from django.shortcuts import render,redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def table_render(request):
    active_button="table"
    decision=models.Decisions.objects.all().first()
    res={"active_button":active_button,"decisions":decision}
    return render(request,'table.html',res)