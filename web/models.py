from django.db import models


class Links(models.Model):
    """ Le tableau de liens des décisions """
    link = models.CharField(verbose_name="Lien de décision", max_length=64, blank=True, null=True)
    numero = models.CharField(verbose_name="Numéro de décision", max_length=16, primary_key=True)

class Decisions(models.Model):
    """ Le tableau des décisions """
    numero_dec = models.ForeignKey(verbose_name="Numéro de décision", to=Links, on_delete=models.CASCADE,
                                   to_field="numero",null=True,blank=True)
    solution = models.CharField(verbose_name="Solution", max_length=32)
    article38 = models.CharField(verbose_name="Donnée CRJ", max_length=8, blank=True, null=True)
    date_dec = models.CharField(verbose_name="Date de décision", max_length=16)
    annee_election = models.IntegerField(verbose_name="Année d'élection")
    nom_dep = models.CharField(verbose_name="Nom du département", max_length=16)
    circonscription = models.SmallIntegerField(verbose_name="Numéro de circonscription")
    tf_nb_exprimees = models.IntegerField(verbose_name="Nb voix exprimées tour final")
    tf_nb_votant = models.IntegerField(verbose_name="Nb voix votant tour final")
    tf_nb_inscrit = models.IntegerField(verbose_name="Nb voix inscrits tour final")
    tf_ecart1 = models.IntegerField(verbose_name="Tour final, écart candidat 1 et 2")
