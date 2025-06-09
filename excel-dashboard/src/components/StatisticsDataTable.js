import React, { useEffect, useState } from 'react';

function StatisticsDataTable({ refresh }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/statistics')
      .then(res => res.json())
      .then(json => {
        const newData = Array.isArray(json) ? json : (json.success ? json.data : []);
        setData(newData);
      })
      .catch(err => {
        console.error(err);
        alert("Erreur serveur");
      });
  }, [refresh]);

  useEffect(() => {
    let tempData = [...data];

    // Filtre global
    if (globalFilter) {
      const lower = globalFilter.toLowerCase();
      tempData = tempData.filter(item =>
        Object.values(item).some(val =>
          typeof val === 'string' && val.toLowerCase().includes(lower)
        )
      );
    }

    // Filtres par colonne
    Object.entries(columnFilters).forEach(([key, value]) => {
  if (value) {
    tempData = tempData.filter(item => {
      const keys = key.split('.');
      let val = item;
      for (let k of keys) val = val?.[k];

      const valStr = val ? val.toString().toLowerCase() : '';
      const filterStr = value.toLowerCase();

      if (key === 'month') {
        // Match sur mois, année, ou full
        return (
          valStr.includes(filterStr) ||              // ex: "08/2023" includes "2023"
          valStr.startsWith(filterStr + '/') ||      // ex: "08" => "08/"
          valStr.endsWith('/' + filterStr)           // ex: "2023" => "/2023"
        );
      }

      return valStr.includes(filterStr);
    });
  }
});



    setFilteredData(tempData);
  }, [data, globalFilter, columnFilters]);

    const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette ligne ?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/statistics/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Supprimé !");
        setData(data.filter(item => item._id !== id)); // Mise à jour locale
      } else {
        const errorData = await res.json();
        alert("Erreur : " + errorData.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de suppression");
    }
  };

  const handleEdit = (id) => {
    // Redirige vers une page d’édition ou ouvre un modal
    window.location.href = `/modifier-donnees/${id}`;
  };
  const resetFilters = () => {
  setGlobalFilter('');
  setColumnFilters({});
  };

  return (
    <div>
      <h2>Données Statistiques Importées</h2>
              <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Filtre global..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
          />
          <button onClick={resetFilters}>Réinitialiser les filtres</button>
          <p>{filteredData.length} lignes affichées sur {data.length}</p>
        </div>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Mois
            <br/>
            <input
            type="text"
            value={columnFilters['month'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, month: e.target.value }))
             }
            placeholder="Filtrer"
            />
            </th>
            <th>nbCRA<br/>
            <input
            type="text"
            value={columnFilters['general.nbCRA'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'general.nbCRA': e.target.value }))
             }
            placeholder="Filtrer"
            />
            </th>
            <th>nbAccompagnements<br/>
            <input
            type="text"
            value={columnFilters['general.nbAccompagnements'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'general.nbAccompagnements': e.target.value }))
             }
            placeholder="Filtrer"
            />
            </th>
            <th>nbUsagersAccompagnes<br/>
            <input
            type="text"
            value={columnFilters['general.nbUsagersAccompagnes'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'general.nbUsagersAccompagnes': e.target.value }))
             }
            placeholder="Filtrer"
            />
            </th>
            <th>nbAccompagnementsIndiv<br/>
            <input
            type="text"
            value={columnFilters['general.nbAccompagnementsIndiv'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'general.nbAccompagnementsIndiv': e.target.value }))
             }
            placeholder="Filtrer"
            />
            </th>
            <th>nbAteliersCollectifs<br/>
            <input
            type="text"
            value={columnFilters['general.nbAteliersCollectifs'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'general.nbAteliersCollectifs': e.target.value }))
             }
            placeholder="Filtrer"
            />
            </th>
            <th>nbDemandesPonctuelles<br/>
            <input
            type="text"
            value={columnFilters['general.nbDemandesPonctuelles'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'general.nbDemandesPonctuelles': e.target.value }))
             }
            placeholder="Filtrer"
            />
            </th>
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
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
        {filteredData.map((item, idx) => {
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
            <td>
                  <button onClick={() => handleEdit(item._id)}>Modifier</button>
                  <button onClick={() => handleDelete(item._id)}>Supprimer</button>
                </td>
          </tr>
        );
      })}
    </tbody>

      </table>
    </div>
  );
}

export default StatisticsDataTable;



