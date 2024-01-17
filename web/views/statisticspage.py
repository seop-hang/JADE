from django.shortcuts import render,redirect

def statistics_render(request):
    active_button="statistics"
    context={"active_button":active_button}
    return render(request,'statistics.html',context)