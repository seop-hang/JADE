from django.shortcuts import render,redirect

def map_render(request):
    active_button="map"
    context={"active_button":active_button}
    return render(request,'map.html',context)