from django.shortcuts import render,redirect

def home_render(request):
    """
    Gère le rendu de la page d'accueil en utilisant le modèle `home.html`.
    Args:
        request: Objet de requête Django.
    Returns:
        HttpResponse: Réponse HTML générée par le rendu du modèle `home.html`.
    """
    active_button="home"
    context={"active_button":active_button}
    return render(request,'home.html',context)