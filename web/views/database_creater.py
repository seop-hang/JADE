import csv
import os

from web import models
from django.http import HttpResponse
from django.conf import settings

media_root = settings.MEDIA_ROOT

def create_database(request):
    path_decisions = os.path.join(media_root, 'decisions.csv')
    csv_reader = csv.reader(open(path_decisions,encoding='utf-8'))
    # models.Decisions.objects.all().delete()
    for i, row in enumerate(csv_reader):
        if i != 0:
            new_obj=models.Decisions(numero_dec=row[0],solution=row[1],article38=row[2],
                                     date_dec=row[3],annee_election=int(row[7]),nom_dep=row[11],
                                     circonscription=int(row[12]),tf_nb_exprimees=int(row[14]),tf_nb_votant=int(row[15]),
                                     tf_nb_inscrit=int(row[16]),tf_ecart1=int(row[17]) if row[17]!='' else 0)
            new_obj.save()
    return HttpResponse("Bien initialiser la base de données !")