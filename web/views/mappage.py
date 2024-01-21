from django.shortcuts import render, redirect
from django import forms
from web import models
from collections import Counter


class MapFilterForm(forms.Form):
    solution = forms.CharField(label="Solution", max_length=100, required=False)
    article38 = forms.CharField(label="Article38", max_length=100, required=False)
    annee_debut = forms.IntegerField(label="Début de la période", required=False)
    annee_end = forms.IntegerField(label="Fin de la période", required=False)

    def __init__(self, *args, **kwargs):
        super().__init__()
        for name, field_object in self.fields.items():
            field_object.widget.attrs = {"class": "form-control"}


def map_render(request):
    active_button = "map"

    possible_solution_values = models.Decisions.objects.values_list('solution', flat=True).distinct()
    possible_article38_values = models.Decisions.objects.values_list('article38', flat=True).distinct()
    possible_annee_values = sorted(models.Decisions.objects.values_list('annee_election', flat=True).distinct())

    # obtenir les décisions
    decisions = models.Decisions.objects.all()
    form = MapFilterForm(data=request.GET)
    filter_dict = {key: value for key, value in request.GET.items() if value and key != "page"}
    if "annee_debut" in filter_dict:
        filter_dict["annee_election__gte"] = filter_dict.pop("annee_debut")
    if "annee_end" in filter_dict:
        filter_dict["annee_election__lte"] = filter_dict.pop("annee_end")
    decisions = decisions.filter(**filter_dict)

    possible_nom_dep_values = models.Decisions.objects.values_list('nom_dep', flat=True).distinct()
    # Une liste pour sauvegarder les infos
    result_list = []
    for nom_dep in possible_nom_dep_values:
        decisions_for_nom_dep = decisions.filter(nom_dep=nom_dep)
        solution_counts = Counter(decision.solution for decision in decisions_for_nom_dep)
        result_dict = {'name': nom_dep}
        for solution in possible_solution_values:
            result_dict[solution] = solution_counts.get(solution, 0)
        result_list.append(result_dict)

    res = {"active_button": active_button, "form": form, "results": result_list,
           "possible_solution_values": possible_solution_values,
           "possible_article38_values": possible_article38_values,
           "possible_annee_values": possible_annee_values}
    return render(request, 'departments.html', res)
