from django.shortcuts import render,redirect

def statistics_render(request):
    return render(request,'statistics.html')