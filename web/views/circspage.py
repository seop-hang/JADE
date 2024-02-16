from django.shortcuts import render, redirect
from django import forms
from web import models
from collections import Counter


class CircsFilterForm(forms.Form):
    """
    Formulaire de filtre pour la page des circonscriptions (circonscriptions.html).
    """
    nom_dep = forms.CharField(label="Département", max_length=100, required=False)
    annee_election = forms.IntegerField(label="Année d'élection", required=False)

    def __init__(self, *args, **kwargs):
        super().__init__()
        for name, field_object in self.fields.items():
            field_object.widget.attrs = {"class": "form-control"}


def circs_render(request):
    """
    Gère le rendu de la page des circonscriptions (circonscriptions.html). Utilise le modèle de filtre pour permettre
    la recherche et le filtrage des décisions, puis génère une visualisation des décisions par circonscription.
    Args:
        request: Objet de requête Django.
    Returns:
        HttpResponse: Réponse HTML générée par le rendu du modèle `circonscriptions.html`.
    """
    active_button = "circs"

    # Obtient les valeurs possibles pour le formulaire de filtre
    possible_department_values = sorted(models.Decisions.objects.values_list('nom_dep', flat=True).distinct())
    possible_annee_values = sorted(models.Decisions.objects.values_list('annee_election', flat=True).distinct())

    # Obtient toutes les décisions
    decisions = models.Decisions.objects.all()
    form = CircsFilterForm(data=request.GET)

    # Applique le filtre
    filter_dict = {key: value for key, value in request.GET.items() if value and key != "page"}
    if "nom_dep" not in filter_dict:
        filter_dict['nom_dep']="ain"
    decisions = decisions.filter(**filter_dict)

    # Obtient les valeurs possibles pour les circonscriptions
    possible_circ_values = sorted(decisions.values_list('circonscription', flat=True).distinct())

    # # Une liste pour sauvegarder les infos
    result_list = []
    for circ in possible_circ_values:
        new_decisions=decisions.filter(circonscription=circ)
        value1=len(new_decisions.filter(solution='Inéligibilité'))
        value2=len(new_decisions.filter(solution='Rejet'))
        value3=len(new_decisions.filter(solution='Annulation'))
        value4=len(new_decisions.filter(solution="Non lieu à prononcer l'inéligibilité"))
        circ_dict={"name":"circonscription "+str(circ),"value":len(new_decisions),"value1":value1,"value2":value2,
                   "value3":value3,"value4":value4}
        result_list.append(circ_dict)

    # Contexte pour le rendu HTML
    res = {"active_button": active_button, "form": form, "results": result_list,
           "possible_circ_values": possible_circ_values,
           "possible_department_values": possible_department_values,
           "possible_annee_values": possible_annee_values}
    return render(request, 'circonscriptions.html', res)
