from django.shortcuts import render,redirect

def home_render(request):
    return render(request,'home.html')