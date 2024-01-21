from django.shortcuts import render,redirect

def maps_render(request):
    active_button="maps"
    context={"active_button":active_button}
    return render(request, 'circonscriptions.html', context)