/**
 * Fichier table.js : Ce fichier contient une fonction pour changer la page en fonction du numéro de page fourni.
 * La fonction utilise l'objet URLSearchParams pour gérer les paramètres d'URL et mettre à jour la page en conséquence.
 * @param {number} num - Numéro de la page vers laquelle naviguer.
 */
function changePage(num) {
    const urlParams = new URLSearchParams(window.location.search);
    // Vérifier si le paramètre 'page' existe dans l'URL
    if (urlParams.has('page')) {
      urlParams.set('page', num);
      const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
      window.location.href = newUrl;
    }else{
      urlParams.append('page', num);
      // Construire la nouvelle URL avec les paramètres mis à jour et rediriger
      const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
      window.location.href = newUrl;
    }
}