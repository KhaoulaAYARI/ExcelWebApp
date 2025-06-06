import React, { useEffect, useState } from 'react';

function StatisticsDataTable({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/statistics')
      .then(res => res.json())
      .then(json => {
        console.log("Réponse API:", json);
        // Accepte à la fois {success, data} ET le tableau direct
        setData(Array.isArray(json) ? json : (json.success ? json.data : []));
      })
      .catch(err => {
        console.error(err);
        alert("Erreur serveur");
      });
  }, [refresh]);

  return (
    <div>
      <h2>Données Statistiques Importées</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Mois</th>
            <th>nbCRA</th>
            <th>nbAccompagnements</th>
            <th>nbUsagersAccompagnes</th>
            <th>nbAccompagnementsIndiv</th>
            <th>nbAteliersCollectifs</th>
            <th>nbDemandesPonctuelles</th>
            <th>nbPoursuiteAccompagnementIndiv</th>
            <th>nbPoursuiteAtelierCollectif</th>
            <th>nbRedirectionsAutreStructure</th>
            <th>aDomicile</th>
            <th>aDistance</th>
            <th>lieuActivite</th>
            <th>autres</th>
            <th>totalHeures</th>
            <th>individuels</th>
            <th>collectifs</th>
            <th>ponctuels</th>
            <th>moins30min</th>
            <th>entre30_60min</th>
            <th>entre60_120min</th>
            <th>plus120min</th>
            <th>moins12ans</th>
            <th>entre12_18ans</th>
            <th>entre18_35ans</th>
            <th>entre35_60ans</th>
            <th>plus60ans</th>
            <th>scolarise</th>
            <th>sansEmlpoi</th>
            <th>enEmploi</th>
            <th>retraite</th>
            <th>nonRenseigne</th>
            <th>accompagnerUnAidant</th>
            <th>budget</th>
            <th>gestionDeContenusNumeriques</th>
            <th>courriels</th>
            <th>cultureNumerique</th>
            <th>demarcheEnLigne</th>
            <th>diagnosticNumerique</th>
            <th>echangeAvecSesProches</th>
            <th>prendreEnMainDuMateriel</th>
            <th>fraudeEtHarcelement</th>
            <th>naviguerSurInternet</th>
            <th>sante</th>
            <th>scolaire</th>
            <th>securiserEquipement</th>
            <th>smartphone</th>
            <th>numeriqueTPE_PME</th>
            <th>bureautique</th>
            <th>emlpoiEtFormation</th>
            <th>autre</th>
          </tr>
        </thead>
            <tbody>
      {data.map((item, idx) => {
        const themes = item.themesDesAccompagnements;
        const maxTheme = themes
          ? Object.keys(themes).reduce((a, b) => (themes[a] > themes[b] ? a : b))
          : '—';

        return (
          <tr key={item._id || idx}>
            <td>{item.month}</td>
            <td>{item.general?.nbCRA ?? '-'}</td>
            <td>{item.general?.nbAccompagnements ?? '-'}</td>
            <td>{item.general?.nbUsagersAccompagnes ?? '-'}</td>
            <td>{item.general?.nbAccompagnementsIndiv ?? '-'}</td>
            <td>{item.general?.nbAteliersCollectifs ?? '-'}</td>
            <td>{item.general?.totalParticipantsAuxAteliers ?? '-'}</td>
            <td>{item.general?.nbDemandesPonctuelles ?? '-'}</td>
            <td>{item.accompagnementsPoursuivis?.nbPoursuiteAccompagnementIndiv ?? '-'}</td>
            <td>{item.accompagnementsPoursuivis?.nbPoursuiteAtelierCollectif ?? '-'}</td>
            <td>{item.accompagnementsPoursuivis?.nbRedirectionsAutreStructure ?? '-'}</td>
            <td>{item.canauxAccompagnements?.aDomicile ?? '-'}</td>
            <td>{item.canauxAccompagnements?.aDistance ?? '-'}</td>
            <td>{item.canauxAccompagnements?.lieuActivite ?? '-'}</td>
            <td>{item.canauxAccompagnements?.autres ?? '-'}</td>
            <td>{item.tempsEnAccompagnements?.totalHeures ?? '-'}</td>
            <td>{item.tempsEnAccompagnements?.individuels ?? '-'}</td>
            <td>{item.tempsEnAccompagnements?.collectifs ?? '-'}</td>
            <td>{item.tempsEnAccompagnements?.ponctuels ?? '-'}</td>
            <td>{item.dureeDesAccompagnements?.moins30min ?? '-'}</td>
            <td>{item.dureeDesAccompagnements?.entre30_60min ?? '-'}</td>
            <td>{item.dureeDesAccompagnements?.entre60_120min ?? '-'}</td>
            <td>{item.dureeDesAccompagnements?.plus120min ?? '-'}</td>
            <td>{item.tranchesAgeDesUsagers?.moins12ans ?? '-'}</td>
            <td>{item.tranchesAgeDesUsagers?.entre12_18ans ?? '-'}</td>
            <td>{item.tranchesAgeDesUsagers?.entre18_35ans ?? '-'}</td>
            <td>{item.tranchesAgeDesUsagers?.entre35_60ans ?? '-'}</td>
            <td>{item.tranchesAgeDesUsagers?.plus60ans ?? '-'}</td>
            <td>{item.statutDesUsagers?.scolarise ?? '-'}</td>
            <td>{item.statutDesUsagers?.sansEmlpoi ?? '-'}</td>
            <td>{item.statutDesUsagers?.enEmploi ?? '-'}</td>
            <td>{item.statutDesUsagers?.retraite ?? '-'}</td>
            <td>{item.statutDesUsagers?.nonRenseigne ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.accompagnerUnAidant ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.budget ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.gestionDeContenusNumeriques ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.courriels ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.cultureNumerique ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.diagnosticNumerique ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.echangeAvecSesProches ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.prendreEnMainDuMateriel ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.fraudeEtHarcelement ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.naviguerSurInternet ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.sante ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.scolaire ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.securiserEquipement ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.smartphone ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.numeriqueTPE_PME ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.bureautique ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.emlpoiEtFormation ?? '-'}</td>
            <td>{item.themesDesAccompagnements?.autre ?? '-'}</td>
            
          </tr>
        );
      })}
    </tbody>

      </table>
    </div>
  );
}

export default StatisticsDataTable;



