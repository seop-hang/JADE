from django.shortcuts import render,redirect

def table_render(request):
    return render(request,'table.html')