from django.shortcuts import render, redirect
from web import models
from collections import Counter


def statistics_render(request):
    """
    Gère le rendu de la page des statistiques (statistics.html). Récupère et organise les données nécessaires
    pour générer des visualisations statistiques basées sur les décisions enregistrées dans la base de données.
    Args:
        request: Objet de requête Django.
    Returns:
        HttpResponse: Réponse HTML générée par le rendu du modèle `statistics.html`.
    """
    active_button = "statistics"

    # Obtient les valeurs possibles pour le formulaire de filtre
    possible_department_values = sorted(models.Decisions.objects.values_list('nom_dep', flat=True).distinct())
    possible_annee_values = sorted(models.Decisions.objects.values_list('annee_election', flat=True).distinct())
    possible_solution_values = sorted(models.Decisions.objects.values_list('solution', flat=True).distinct())

    # Obtient toutes les décisions
    decisions = models.Decisions.objects.all()

    # filtrer
    annee_values = []
    for annee in possible_annee_values:
        annee_values.append(len(decisions.filter(annee_election=annee)))

    solution_values = []
    for solution in possible_solution_values:
        solution_values.append(len(decisions.filter(solution=solution)))

    # Contexte pour le rendu HTML
    res = {"active_button": active_button,
           "possible_department_values": possible_department_values,
           "possible_annee_values": possible_annee_values,
           "annee_values": annee_values,
           "possible_solution_values": possible_solution_values,
           "solution_values": solution_values}
    return render(request, 'statistics.html', res)
