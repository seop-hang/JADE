from django.shortcuts import render,redirect

def map_render(request):
    return render(request,'map.html')