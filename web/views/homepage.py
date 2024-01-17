from django.shortcuts import render,redirect

def home_render(request):
    active_button="home"
    context={"active_button":active_button}
    return render(request,'home.html',context)