from web import models
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django import forms


class DecisionFilterForm(forms.Form):
    solution = forms.CharField(label="Solution", max_length=100, required=False)
    article38 = forms.CharField(label="Article38", max_length=100, required=False)
    annee_election = forms.IntegerField(label="Année d'élection", required=False)
    nom_dep = forms.CharField(label="Nom du département", max_length=100, required=False)

    def __init__(self, *args, **kwargs):
        super().__init__()
        for name, field_object in self.fields.items():
            field_object.widget.attrs = {"class": "form-control"}


def table_render(request):
    # vérifier la page actuelle
    active_button = "table"

    possible_solution_values = models.Decisions.objects.values_list('solution', flat=True).distinct()
    possible_article38_values = models.Decisions.objects.values_list('article38', flat=True).distinct()
    possible_annee_values = models.Decisions.objects.values_list('annee_election', flat=True).distinct()
    possible_dep_values = models.Decisions.objects.values_list('nom_dep', flat=True).distinct()

    # obtenir les décisions
    decisions = models.Decisions.objects.all()
    form = DecisionFilterForm(data=request.GET)
    filter_dict = {key: value for key, value in request.GET.items() if value and key != "page"}
    decisions = decisions.filter(**filter_dict)
    decisions_per_page = 8
    paginator = Paginator(decisions, decisions_per_page)
    page=request.GET.get('page',1)

    try:
        # obtenir les décisions de page actuelle
        current_page_decisions = paginator.page(page)
    except PageNotAnInteger:
        current_page_decisions = paginator.page(1)
    except EmptyPage:
        current_page_decisions = paginator.page(paginator.num_pages)

    current_url=request.get_full_path()
    res = {"active_button": active_button, "decisions": current_page_decisions, "form": form,
           "possible_solution_values": possible_solution_values,
           "possible_article38_values": possible_article38_values,
           "possible_annee_values": possible_annee_values,
           "possible_dep_values": possible_dep_values}
    return render(request, 'table.html', res)
