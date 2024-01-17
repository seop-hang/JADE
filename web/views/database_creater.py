import csv
import os
import xml.etree.ElementTree as ET
# import sys
# sys.setrecursionlimit(3000)

from web import models
from django.http import HttpResponse
from django.conf import settings

media_root = settings.MEDIA_ROOT

def create_link(request):
    # models.Links.objects.all().delete()
    path_corpus = os.path.join(media_root, 'Decisions_AN')
    corpus_parser(path_corpus)
    return HttpResponse("Bien créé la base de données !")

def corpus_parser(path_corpus):
    if os.path.isfile(path_corpus):
        numero,url=file_parser(path_corpus)
        # decision_obj = models.Decisions.objects.filter(numero_dec=numero).first()
        new_obj = models.Links(link=url, numero=numero)
        new_obj.save()
    else:
        for sous_corpus in os.listdir(path_corpus):
            new_path_corpus=os.path.join(path_corpus,sous_corpus)
            corpus_parser(new_path_corpus)

def file_parser(path_file):
    tree = ET.parse(path_file)
    root = tree.getroot()
    meta=root.find('META')
    meta_spec=meta.find('META_SPEC')
    meta_juri=meta_spec.find('META_JURI')
    meta_juri_constit=meta_spec.find('META_JURI_CONSTIT')
    numero=meta_juri.find('NUMERO').text
    url=meta_juri_constit.find('URL_CC').text
    return numero,url

def create_database(request):
    path_decisions = os.path.join(media_root, 'decisions.csv')
    csv_reader = csv.reader(open(path_decisions,encoding='utf-8'))
    # models.Decisions.objects.all().delete()
    for i, row in enumerate(csv_reader):
        if i != 0:
            numero=row[0]
            numero_obj = models.Links.objects.filter(numero=numero).first()
            new_obj=models.Decisions(numero_dec=numero_obj,solution=row[1],article38=row[2],
                                     date_dec=row[3],annee_election=int(row[7]),nom_dep=row[11],
                                     circonscription=int(row[12]),tf_nb_exprimees=int(row[14]),tf_nb_votant=int(row[15]),
                                     tf_nb_inscrit=int(row[16]),tf_ecart1=int(row[17]) if row[17]!='' else 0)
            new_obj.save()
    return HttpResponse("Bien initialiser la base de données !")
