import React, { useState } from 'react';

function StatisticsDataForm({ onAdded }) {
  const [formData, setFormData] = useState({
    month: '',
    general: {
      nbCRA: 0,
      nbAccompagnements: 0,
      nbUsagersAccompagnes: 0,
      nbAccompagnementsIndiv: 0,
      nbAteliersCollectifs: 0,
      totalParticipantsAuxAteliers: 0,
      nbDemandesPonctuelles: 0,
    },
    accompagnementsPoursuivis: {
      nbPoursuiteAccompagnementIndiv: 0,
      nbPoursuiteAtelierCollectif: 0,
      nbRedirectionsAutreStructure: 0,
    },
    canauxAccompagnements: {
      aDomicile: 0,
      aDistance: 0,
      lieuActivite: 0,
      autres: 0,
    },
    tempsEnAccompagnements: {
      totalHeures: 0,
      individuels: 0,
      collectifs: 0,
      ponctuels: 0,
    },
    dureeDesAccompagnements: {
      moins30min: 0,
      entre30_60min: 0,
      entre60_120min: 0,
      plus120min: 0,
    },
    tranchesAgeDesUsagers: {
      moins12ans: 0,
      entre12_18ans: 0,
      entre18_35ans: 0,
      entre35_60ans: 0,
      plus60ans: 0,
    },
    statutDesUsagers: {
      scolarise: 0,
      sansEmlpoi: 0,
      enEmploi: 0,
      retraite: 0,
      nonRenseigne: 0,
    },
    themesDesAccompagnements: {
      accompagnerUnAidant: 0,
      budget: 0,
      gestionDeContenusNumeriques: 0,
      courriels: 0,
      cultureNumerique: 0,
      demarcheEnLigne: 0,
      diagnosticNumerique: 0,
      echangeAvecSesProches: 0,
      prendreEnMainDuMateriel: 0,
      fraudeEtHarcelement: 0,
      naviguerSurInternet: 0,
      sante: 0,
      scolaire: 0,
      securiserEquipement: 0,
      smartphone: 0,
      numeriqueTPE_PME: 0,
      bureautique: 0,
      emlpoiEtFormation: 0,
      autre: 0,
    },
  });

  const handleChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: Number(value),
      }
    }));
  };

  const handleTopLevelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/excel/statistics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      alert('Enregistrement ajouté');
      onAdded();
    } else {
      alert('Erreur : ' + result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter des données statistiques</h2>

      <input
        name="month"
        placeholder="Mois"
        value={formData.month}
        onChange={handleTopLevelChange}
        required
      />

      {Object.entries(formData).map(([section, values]) => {
        if (typeof values !== 'object') return null;
        return (
          <fieldset key={section} style={{ marginBottom: '1rem' }}>
            <legend>{section}</legend>
            {Object.entries(values).map(([key, val]) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => handleChange(section, key, e.target.value)}
                />
              </div>
            ))}
          </fieldset>
        );
      })}

      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default StatisticsDataForm;


