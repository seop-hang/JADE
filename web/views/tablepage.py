from web import models
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django import forms


class DecisionFilterForm(forms.Form):
    """
    Formulaire de filtre pour les décisions.
    """
    solution = forms.CharField(label="Solution", max_length=100, required=False)
    article38 = forms.CharField(label="Article 38", max_length=100, required=False)
    annee_debut = forms.IntegerField(label="Début de la période", required=False)
    annee_end = forms.IntegerField(label="Fin de la période", required=False)
    nom_dep = forms.CharField(label="Nom du département", max_length=100, required=False)

    def __init__(self, *args, **kwargs):
        super().__init__()
        for name, field_object in self.fields.items():
            field_object.widget.attrs = {"class": "form-control"}


def table_render(request):
    """
    Gère le rendu de la page de tableau en utilisant le modèle `table.html`. Permet la recherche
    et le filtrage des décisions avec une fonctionnalité de pagination.
    Args:
        request: Objet de requête Django.
    Returns:
        HttpResponse: Réponse HTML générée par le rendu du modèle `table.html`.
    """
    # vérifier la page actuelle
    active_button = "table"
    # Obtient les valeurs possibles pour le formulaire de filtre
    possible_solution_values = models.Decisions.objects.values_list('solution', flat=True).distinct()
    possible_article38_values = models.Decisions.objects.values_list('article38', flat=True).distinct()
    possible_annee_values = sorted(models.Decisions.objects.values_list('annee_election', flat=True).distinct())
    possible_dep_values = sorted(models.Decisions.objects.values_list('nom_dep', flat=True).distinct())

    # Obtient toutes les décisions
    decisions = models.Decisions.objects.all()
    # Applique le filtre
    form = DecisionFilterForm(data=request.GET)
    filter_dict = {key: value for key, value in request.GET.items() if value and key != "page"}
    if "annee_debut" in filter_dict:
        filter_dict["annee_election__gte"] = filter_dict.pop("annee_debut")
    if "annee_end" in filter_dict:
        filter_dict["annee_election__lte"] = filter_dict.pop("annee_end")
    decisions = decisions.filter(**filter_dict)
    # Pagination
    decisions_per_page = 8
    paginator = Paginator(decisions, decisions_per_page)
    page=request.GET.get('page',1)

    try:
        # Obtient les décisions de la page actuelle
        current_page_decisions = paginator.page(page)
    except PageNotAnInteger:
        current_page_decisions = paginator.page(1)
    except EmptyPage:
        current_page_decisions = paginator.page(paginator.num_pages)

    # Contexte pour le rendu HTML
    res = {"active_button": active_button, "decisions": current_page_decisions, "form": form,
           "possible_solution_values": possible_solution_values,
           "possible_article38_values": possible_article38_values,
           "possible_annee_values": possible_annee_values,
           "possible_dep_values": possible_dep_values}
    return render(request, 'table.html', res)
