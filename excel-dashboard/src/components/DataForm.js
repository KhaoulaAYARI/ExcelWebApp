import React, { useState } from 'react';
import { createData } from '../services/api';

const initialState = {
  dateAccompagnement: '',
  dateCreation: '',
  commune: '',
  codeCommune: '',
  codePostal: '',
  departement: '',
  region: '',
  lieuActivite: '',
  typeLieuActivite: '',
  siret: '',
  canal: '',
  typeActivite: '',
  nbParticipants: '',
  nbParticipantsRecurrents: '',
  nbPoursuiviIndividuel: '',
  nbPoursuiviAtelier: '',
  nbRedirection: '',
  statutEmploie: '',
  statutEtudiant: '',
  statutRetraite: '',
  statutSansEmlpoi: '',
  statutHeterogene: '',
  ageInf12: '',
  ageEntre12et17: '',
  ageEntre18et35: '',
  ageEntre35et60: '',
  ageSup60: '',
  themes: '',
  sousThemesInformatique: '',
  sousThemeAccompagner: '',
  sousThemeSante: '',
  sousThemeBureautique: '',
  idInterne: ''
};

const DataForm = ({ onAdded }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
  const { name, value } = e.target;

  // Champs numériques (doivent correspondre EXACTEMENT aux champs Number du modèle)
  const numericFields = [
    'codeCommune', 'codePostal', 'departement', 'region', 'siret', 'duree',
    'nbParticipants', 'nbParticipantsRecurrents', 'nbPoursuiviIndividuel',
    'nbPoursuiviAtelier', 'nbRedirection', 'structuresRedirection',
    'statutEmploie', 'statutEtudiant', 'statutRetraite',
    'statutSansEmlpoi', 'statutHeterogene',
    'ageInf12', 'ageEntre12et17', 'ageEntre18et35',
    'ageEntre35et60', 'ageSup60'
  ];

  setForm({
    ...form,
    [name]: numericFields.includes(name) ? parseInt(value, 10) : value
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createData(form);
      setForm(initialState);
      onAdded();
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
    }
  };

  const renderInput = (name, label, type = "text") => (
  <div style={{ marginBottom: '10px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{label}</label>
    <input
      type={type}
      name={name}
      value={form[name]}
      onChange={handleChange}
      required
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  </div>
);


  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Données générales</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {renderInput("dateAccompagnement", "Date accompagnement","date")}
        {renderInput("dateCreation", "Date création","date")}
        {renderInput("idInterne", "ID Interne")}
      
      </div>

      <h2>Localisation</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {renderInput("commune", "Commune")}
        {renderInput("codeCommune", "Code Commune")}
        {renderInput("codePostal", "Code Postal")}
        {renderInput("departement", "Département")}
        {renderInput("region", "Région")}
        {renderInput("lieuActivite", "Lieu d’activité")}
        {renderInput("typeLieuActivite", "Type lieu d’activité")}
        {renderInput("siret", "SIRET")}
      </div>

      <h2>Activité</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {renderInput("canal", "Canal")}
        {renderInput("typeActivite", "Type d’activité")}
        {renderInput("themes", "Thèmes")}
        {renderInput("sousThemesInformatique", "Sous-thème informatique")}
        {renderInput("sousThemeAccompagner", "Sous-thème accompagner")}
        {renderInput("sousThemeSante", "Sous-thème santé")}
        {renderInput("sousThemeBureautique", "Sous-thème bureautique")}
      </div>

      <h2>Participants</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {renderInput("nbParticipants", "Nombre de participants")}
        {renderInput("nbParticipantsRecurrents", "Participants récurrents")}
        {renderInput("nbPoursuiviIndividuel", "Suivi individuel")}
        {renderInput("nbPoursuiviAtelier", "Suivi atelier")}
        {renderInput("nbRedirection", "Redirections")}
      </div>

      <h2>Statuts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {renderInput("statutEmploie", "Employé")}
        {renderInput("statutEtudiant", "Étudiant")}
        {renderInput("statutRetraite", "Retraité")}
        {renderInput("statutSansEmlpoi", "Sans emploi")}
        {renderInput("statutHeterogene", "Hétérogène")}
      </div>

      <h2>Tranches d’âge</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {renderInput("ageInf12", "Moins de 12 ans")}
        {renderInput("ageEntre12et17", "12-17 ans")}
        {renderInput("ageEntre18et35", "18-35 ans")}
        {renderInput("ageEntre35et60", "35-60 ans")}
        {renderInput("ageSup60", "60 ans et +")}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button type="submit" style={{
          padding: '12px 30px',
          backgroundColor: '#007bff',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          ➕ Ajouter
        </button>
      </div>
    </form>
  );
};

export default DataForm;

