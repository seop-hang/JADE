from django.shortcuts import render, redirect
from django import forms
from web import models
from collections import Counter


class CircsFilterForm(forms.Form):
    nom_dep = forms.CharField(label="Département", max_length=100, required=False)
    annee_election = forms.IntegerField(label="Année d'élection", required=False)

    def __init__(self, *args, **kwargs):
        super().__init__()
        for name, field_object in self.fields.items():
            field_object.widget.attrs = {"class": "form-control"}


def circs_render(request):
    active_button = "circs"

    possible_department_values = sorted(models.Decisions.objects.values_list('nom_dep', flat=True).distinct())
    possible_annee_values = sorted(models.Decisions.objects.values_list('annee_election', flat=True).distinct())

    # obtenir les décisions
    decisions = models.Decisions.objects.all()
    form = CircsFilterForm(data=request.GET)

    # filtrer
    filter_dict = {key: value for key, value in request.GET.items() if value and key != "page"}
    if "nom_dep" not in filter_dict:
        filter_dict['nom_dep']="ain"
    decisions = decisions.filter(**filter_dict)

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

    res = {"active_button": active_button, "form": form, "results": result_list,
           "possible_circ_values": possible_circ_values,
           "possible_department_values": possible_department_values,
           "possible_annee_values": possible_annee_values}
    return render(request, 'circonscriptions.html', res)
