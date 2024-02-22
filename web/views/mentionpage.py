from django.shortcuts import render,redirect

def mention_render(request):
    """
    Gère le rendu de la page de mentions légales en utilisant le modèle `mentions.html`.
    Args:
        request: Objet de requête Django.
    Returns:
        HttpResponse: Réponse HTML générée par le rendu du modèle `mentions.html`.
    """
    active_button="mentions"
    context={"active_button":active_button}
    return render(request,'mentions.html',context)