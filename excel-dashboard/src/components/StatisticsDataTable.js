import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

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
        console.log("🧪 Exemple d'une ligne de données :", newData[0]);
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

      const valStr = (val !== undefined && val !== null) ? val.toString().toLowerCase() : '';

      const filterStr = value.toLowerCase();
      ///Test filter
      console.log(`🔎 Clé: ${key} | Valeur dans data:`, val, '| Filtre:', value);

      if (key === 'month') {
        // Match sur mois, année, ou full
        return (
          valStr.includes(filterStr) ||              // ex: "08/2023" includes "2023"
          valStr.startsWith(filterStr + '/') ||      // ex: "08" => "08/"
          valStr.endsWith('/' + filterStr)           // ex: "2023" => "/2023"
        );
      }

      return valStr === filterStr;
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
    // Redirige vers une page de modification
    window.location.href = `/modifier-collection2/${id}`;
  };
  const handleExportExcel = () => {
    try {
      // 1. Aplatir la structure imbriquée
      const flattenData = filteredData.map(item => {
        const flatItem = {
          month: item.month,
          // Général
          'general.nbCRA': item.general?.nbCRA,
          'general.nbAccompagnements': item.general?.nbAccompagnements,
          'general.nbUsagersAccompagnes': item.general?.nbUsagersAccompagnes,
          'general.nbAccompagnementsIndiv': item.general?.nbAccompagnementsIndiv,
          'general.nbAteliersCollectifs': item.general?.nbAteliersCollectifs,
          'general.totalParticipantsAuxAteliers': item.totalParticipantsAuxAteliers?.nbCRA,
          'general.nbDemandesPonctuelles': item.general?.nbDemandesPonctuelles,

          // Accompagnements poursuivis
          'accompagnementsPoursuivis.nbPoursuiteAccompagnementIndiv': item.accompagnementsPoursuivis?.nbPoursuiteAccompagnementIndiv,
         'accompagnementsPoursuivis.nbPoursuiteAtelierCollectif': item.accompagnementsPoursuivis?.nbPoursuiteAtelierCollectif,
         'accompagnementsPoursuivis.nbRedirectionsAutreStructure': item.accompagnementsPoursuivis?.nbRedirectionsAutreStructure,
          //canauxAccompagnements
          'canauxAccompagnements.aDomicile': item.canauxAccompagnements?.aDomicile,     
          'canauxAccompagnements.aDistance': item.canauxAccompagnements?.aDistance,   
          'canauxAccompagnements.lieuActivite': item.canauxAccompagnements?.lieuActivite,   
          'canauxAccompagnements.autres': item.canauxAccompagnements?.autres, 
          //tempsEnAccompagnements
          'tempsEnAccompagnements.totalHeures': item.tempsEnAccompagnements?.totalHeures,
          'tempsEnAccompagnements.individuels': item.tempsEnAccompagnements?.individuels,
          'tempsEnAccompagnements.collectifs': item.tempsEnAccompagnements?.collectifs,
          'tempsEnAccompagnements.ponctuels': item.tempsEnAccompagnements?.ponctuels,
          //dureeDesAccompagnements
          'dureeDesAccompagnements.moins30min': item.dureeDesAccompagnements?.moins30min,
          'dureeDesAccompagnements.entre30_60min': item.dureeDesAccompagnements?.entre30_60min,
          'dureeDesAccompagnements.entre60_120min': item.dureeDesAccompagnements?.entre60_120min,
          'dureeDesAccompagnements.plus120min': item.dureeDesAccompagnements?.plus120min,

          //tranchesAgeDesUsagers
           'tranchesAgeDesUsagers.moins12ans': item.tranchesAgeDesUsagers?.moins12ans,
          'tranchesAgeDesUsagers.entre12_18ans': item.tranchesAgeDesUsagers?.entre12_18ans,
          'tranchesAgeDesUsagers.entre18_35ans': item.tranchesAgeDesUsagers?.entre18_35ans,
          'tranchesAgeDesUsagers.entre35_60ans': item.tranchesAgeDesUsagers?.entre35_60ans,
          'tranchesAgeDesUsagers.plus60ans': item.tranchesAgeDesUsagers?.plus60ans,
          //statutDesUsagers
          'statutDesUsagers.scolarise': item.statutDesUsagers?.scolarise,
          'statutDesUsagers.sansEmlpoi': item.statutDesUsagers?.sansEmlpoi,
          'statutDesUsagers.enEmploi': item.statutDesUsagers?.enEmploi,
          'statutDesUsagers.retraite': item.statutDesUsagers?.retraite,
          'statutDesUsagers.nonRenseigne': item.statutDesUsagers?.nonRenseigne,
          //themesDesAccompagnements
           'themesDesAccompagnements.accompagnerUnAidant': item.themesDesAccompagnements?.accompagnerUnAidant,
          'themesDesAccompagnements.budget': item.themesDesAccompagnements?.budget,
          'themesDesAccompagnements.gestionDeContenusNumeriques': item.themesDesAccompagnements?.gestionDeContenusNumeriques,
          'themesDesAccompagnements.courriels': item.themesDesAccompagnements?.courriels,
          'themesDesAccompagnements.cultureNumerique': item.themesDesAccompagnements?.cultureNumerique,
          'themesDesAccompagnements.demarcheEnLigne': item.themesDesAccompagnements?.demarcheEnLigne,
          'themesDesAccompagnements.diagnosticNumerique': item.themesDesAccompagnements?.diagnosticNumerique,
          'themesDesAccompagnements.echangeAvecSesProches': item.themesDesAccompagnements?.echangeAvecSesProches,
          'themesDesAccompagnements.prendreEnMainDuMateriel': item.themesDesAccompagnements?.prendreEnMainDuMateriel,
          'themesDesAccompagnements.fraudeEtHarcelement': item.themesDesAccompagnements?.fraudeEtHarcelement,
          'themesDesAccompagnements.naviguerSurInternet': item.themesDesAccompagnements?.naviguerSurInternet,
          'themesDesAccompagnements.sante': item.themesDesAccompagnements?.sante,
          'themesDesAccompagnements.scolaire': item.themesDesAccompagnements?.scolaire,
          'themesDesAccompagnements.securiserEquipement': item.themesDesAccompagnements?.securiserEquipement,
          'themesDesAccompagnements.smartphone': item.themesDesAccompagnements?.smartphone,
          'themesDesAccompagnements.numeriqueTPE_PME': item.themesDesAccompagnements?.numeriqueTPE_PME,
           'themesDesAccompagnements.bureautique': item.themesDesAccompagnements?.bureautique,
           'themesDesAccompagnements.emlpoiEtFormation': item.themesDesAccompagnements?.emlpoiEtFormation,
          'themesDesAccompagnements.autre': item.themesDesAccompagnements?.autre,


        };
        return flatItem;
      });

      // 2. Créer les en-têtes manuellement (ou générés dynamiquement)
      const headers = [
        { key: 'month', label: 'Mois' },
        { key: 'general.nbCRA', label: 'Nb CRA' },
        { key: 'general.nbAccompagnements', label: 'Nb Accompagnements' },
        { key: 'general.nbUsagersAccompagnes', label: 'nbUsagersAccompagnes' },
        { key: 'general.nbAccompagnementsIndiv', label: 'nbAccompagnementsIndiv' },
        { key: 'general.nbAteliersCollectifs', label: 'nbAteliersCollectifs' },
        { key: 'general.totalParticipantsAuxAteliers', label: 'totalParticipantsAuxAteliers' },
        { key: 'general.nbDemandesPonctuelles', label: 'nbDemandesPonctuelles' },

        { key: 'accompagnementsPoursuivis.nbPoursuiteAccompagnementIndiv', label: 'nbPoursuiteAccompagnementIndiv' },
        { key: 'accompagnementsPoursuivis.nbPoursuiteAtelierCollectif', label: 'nbPoursuiteAtelierCollectif' },
        { key: 'accompagnementsPoursuivis.nbRedirectionsAutreStructure', label: 'nbRedirectionsAutreStructure' },

        { key: 'canauxAccompagnements.aDomicile', label: 'aDomicile' },
        { key: 'canauxAccompagnements.aDistance', label: 'aDistance' },
        { key: 'canauxAccompagnements.lieuActivite', label: 'lieuActivite' },
        { key: 'canauxAccompagnements.autres', label: 'autres' },

        { key: 'tempsEnAccompagnements.totalHeures', label: 'totalHeures' },
        { key: 'tempsEnAccompagnements.individuels', label: 'individuels' },
        { key: 'tempsEnAccompagnements.collectifs', label: 'collectifs' },
        { key: 'tempsEnAccompagnements.ponctuels', label: 'ponctuels' },

        { key: 'dureeDesAccompagnements.moins30min', label: 'moins30min' },
        { key: 'dureeDesAccompagnements.entre30_60min', label: 'entre30_60min' },
        { key: 'dureeDesAccompagnements.entre60_120min', label: 'entre60_120min' },
        { key: 'dureeDesAccompagnements.plus120min', label: 'plus120min' },

        { key: 'tranchesAgeDesUsagers.moins12ans', label: 'moins12ans' },
        { key: 'tranchesAgeDesUsagers.entre12_18ans', label: 'entre12_18ans' },
        { key: 'tranchesAgeDesUsagers.entre18_35ans', label: 'entre18_35ans' },
         { key: 'tranchesAgeDesUsagers.entre35_60ans', label: 'entre35_60ans' },
        { key: 'tranchesAgeDesUsagers.plus60ans', label: 'plus60ans' },

        { key: 'statutDesUsagers.scolarise', label: 'scolarise' },
        { key: 'statutDesUsagers.sansEmlpoi', label: 'sansEmlpoi' },
         { key: 'statutDesUsagers.enEmploi', label: 'enEmploi' },
        { key: 'statutDesUsagers.retraite', label: 'retraite' },
         { key: 'statutDesUsagers.nonRenseigne', label: 'nonRenseigne' },

        { key: 'themesDesAccompagnements.accompagnerUnAidant', label: 'accompagnerUnAidant' },
        { key: 'themesDesAccompagnements.budget', label: 'budget' },
        { key: 'themesDesAccompagnements.gestionDeContenusNumeriques', label: 'gestionDeContenusNumeriques' },
         { key: 'themesDesAccompagnements.courriels', label: 'courriels' },
        { key: 'themesDesAccompagnements.cultureNumerique', label: 'cultureNumerique' },
         { key: 'themesDesAccompagnements.demarcheEnLigne', label: 'demarcheEnLigne' },
        { key: 'themesDesAccompagnements.diagnosticNumerique', label: 'diagnosticNumerique' },
        { key: 'themesDesAccompagnements.echangeAvecSesProches', label: 'echangeAvecSesProches' },
        { key: 'themesDesAccompagnements.prendreEnMainDuMateriel', label: 'prendreEnMainDuMateriel' },
         { key: 'themesDesAccompagnements.fraudeEtHarcelement', label: 'fraudeEtHarcelement' },
        { key: 'themesDesAccompagnements.naviguerSurInternet', label: 'naviguerSurInternet' },
         { key: 'themesDesAccompagnements.sante', label: 'sante' },
        { key: 'themesDesAccompagnements.scolaire', label: 'scolaire' },
        { key: 'themesDesAccompagnements.securiserEquipement', label: 'securiserEquipement' },
        { key: 'themesDesAccompagnements.smartphone', label: 'smartphone' },
         { key: 'themesDesAccompagnements.numeriqueTPE_PME', label: 'numeriqueTPE_PME' },
        { key: 'themesDesAccompagnements.bureautique', label: 'bureautique' },
         { key: 'themesDesAccompagnements.emlpoiEtFormation', label: 'emlpoiEtFormation' },
        { key: 'themesDesAccompagnements.autre', label: 'autre' },
      ];

      // 3. Créer le workbook
      const wb = XLSX.utils.book_new();
      
      // 4. Préparer les données pour l'export
      const exportData = [
        headers.map(h => h.label), // Ligne d'en-tête
        ...flattenData.map(item => 
          headers.map(header => item[header.key] || '')
        )
      ];

      // 5. Créer la feuille Excel
      const ws = XLSX.utils.aoa_to_sheet(exportData);
      
      // 6. Ajouter la feuille au workbook
      XLSX.utils.book_append_sheet(wb, ws, "Statistiques");
      
      // 7. Exporter le fichier
      XLSX.writeFile(wb, `statistiques_${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      alert("Erreur lors de la génération du fichier Excel");
    }
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
           <button 
              onClick={handleExportExcel}
              style={{ marginLeft: '10px', background: '#4CAF50', color: 'white' }}
            >
              Exporter en Excel
          </button>
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
            <th>totalParticipantsAuxAteliers<br/>
            <input
            type="text"
            value={columnFilters['general.totalParticipantsAuxAteliers'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'general.totalParticipantsAuxAteliers': e.target.value }))
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
            <th>aDomicile<br/>
            <input
            type="text"
            value={columnFilters['canauxAccompagnements.aDomicile'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'canauxAccompagnements.aDomicile': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>aDistance<br/>
            <input
            type="text"
            value={columnFilters['canauxAccompagnements.aDistance'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'canauxAccompagnements.aDistance': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>lieuActivite<br/>
            <input
            type="text"
            value={columnFilters['canauxAccompagnements.lieuActivite'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'canauxAccompagnements.lieuActivite': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>autres<br/>
            <input
            type="text"
            value={columnFilters['canauxAccompagnements.autres'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'canauxAccompagnements.autres': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>totalHeures<br/>
            <input
            type="text"
            value={columnFilters['tempsEnAccompagnements.totalHeures'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tempsEnAccompagnements.totalHeures': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>individuels<br/>
            <input
            type="text"
            value={columnFilters['tempsEnAccompagnements.individuels'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tempsEnAccompagnements.individuels': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>collectifs<br/>
            <input
            type="text"
            value={columnFilters['tempsEnAccompagnements.collectifs'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tempsEnAccompagnements.collectifs': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>ponctuels<br/>
            <input
            type="text"
            value={columnFilters['tempsEnAccompagnements.ponctuels'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tempsEnAccompagnements.ponctuels': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>moins30min<br/>
            <input
            type="text"
            value={columnFilters['dureeDesAccompagnements.moins30min'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'dureeDesAccompagnements.moins30min': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>entre30_60min<br/>
            <input
            type="text"
            value={columnFilters['dureeDesAccompagnements.entre30_60min'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'dureeDesAccompagnements.entre30_60min': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>entre60_120min<br/>
            <input
            type="text"
            value={columnFilters['dureeDesAccompagnements.entre60_120min'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'dureeDesAccompagnements.entre60_120min': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>plus120min<br/>
            <input
            type="text"
            value={columnFilters['dureeDesAccompagnements.plus120min'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'dureeDesAccompagnements.plus120min': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>moins12ans<br/>
            <input
            type="text"
            value={columnFilters['tranchesAgeDesUsagers.moins12ans'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tranchesAgeDesUsagers.moins12ans': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>entre12_18ans<br/>
            <input
            type="text"
            value={columnFilters['tranchesAgeDesUsagers.entre12_18ans'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tranchesAgeDesUsagers.entre12_18ans': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>entre18_35ans<br/>
            <input
            type="text"
            value={columnFilters['tranchesAgeDesUsagers.entre18_35ans'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tranchesAgeDesUsagers.entre18_35ans': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>entre35_60ans<br/>
            <input
            type="text"
            value={columnFilters['tranchesAgeDesUsagers.entre35_60ans'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tranchesAgeDesUsagers.entre35_60ans': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>plus60ans<br/>
            <input
            type="text"
            value={columnFilters['tranchesAgeDesUsagers.plus60ans'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'tranchesAgeDesUsagers.plus60ans': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>scolarise<br/>
            <input
            type="text"
            value={columnFilters['statutDesUsagers.scolarise'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'statutDesUsagers.scolarise': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>sansEmlpoi<br/>
            <input
            type="text"
            value={columnFilters['statutDesUsagers.sansEmlpoi'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'statutDesUsagers.sansEmlpoi': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>enEmploi<br/>
            <input
            type="text"
            value={columnFilters['statutDesUsagers.enEmploi'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'statutDesUsagers.enEmploi': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>retraite<br/>
            <input
            type="text"
            value={columnFilters['statutDesUsagers.retraite'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'statutDesUsagers.retraite': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>nonRenseigne<br/>
            <input
            type="text"
            value={columnFilters['statutDesUsagers.nonRenseigne'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'statutDesUsagers.nonRenseigne': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>accompagnerUnAidant<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.accompagnerUnAidant'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.accompagnerUnAidant': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>budget<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.budget'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.budget': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>gestionDeContenusNumeriques<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.gestionDeContenusNumeriques'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.gestionDeContenusNumeriques': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>courriels<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.courriels'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.courriels': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>cultureNumerique<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.cultureNumerique'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.cultureNumerique': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>demarcheEnLigne<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.demarcheEnLigne'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.demarcheEnLigne': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>diagnosticNumerique<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.diagnosticNumerique'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.diagnosticNumerique': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>echangeAvecSesProches<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.echangeAvecSesProches'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.echangeAvecSesProches': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>prendreEnMainDuMateriel<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.prendreEnMainDuMateriel'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.prendreEnMainDuMateriel': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>fraudeEtHarcelement<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.fraudeEtHarcelement'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.fraudeEtHarcelement': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>naviguerSurInternet<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.naviguerSurInternet'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.naviguerSurInternet': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>sante<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.sante'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.sante': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>scolaire<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.scolaire'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.scolaire': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>securiserEquipement<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.securiserEquipement'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.securiserEquipement': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>smartphone<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.smartphone'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.smartphone': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>numeriqueTPE_PME<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.numeriqueTPE_PME'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.numeriqueTPE_PME': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>bureautique<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.bureautique'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.bureautique': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>emlpoiEtFormation<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.emlpoiEtFormation'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.emlpoiEtFormation': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>autre<br/>
            <input
            type="text"
            value={columnFilters['themesDesAccompagnements.autre'] || ''}
            onChange={e =>
            setColumnFilters(prev => ({ ...prev, 'themesDesAccompagnements.autre': e.target.value }))
             }
            placeholder="Filtrer"
            /></th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
        {filteredData.map((item, idx) => {
        

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
            <td>{item.themesDesAccompagnements?.demarcheEnLigne ?? '-'}</td>
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



