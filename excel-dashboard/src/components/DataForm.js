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
    const numericFields = [
      'codeCommune', 'codePostal', 'departement', 'region', 'siret',
      'nbParticipants', 'nbParticipantsRecurrents', 'nbPoursuiviIndividuel',
      'nbPoursuiviAtelier', 'nbRedirection',
      'statutEmploie', 'statutEtudiant', 'statutRetraite',
      'statutSansEmlpoi', 'statutHeterogene',
      'ageInf12', 'ageEntre12et17', 'ageEntre18et35',
      'ageEntre35et60', 'ageSup60'
    ];

    setForm({
      ...form,
      [name]: numericFields.includes(name) ? parseInt(value, 10) || '' : value
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
    <div className="col-md-6" key={name}>
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>
  );

  // --- Render form ---
  return (
    <form onSubmit={handleSubmit} className="container my-4">

      {[
        {
          title: '🗂 Données générales',
          fields: [
            { name: 'dateAccompagnement', label: 'Date accompagnement', type: 'date' },
            { name: 'dateCreation', label: 'Date création', type: 'date' },
            { name: 'idInterne', label: 'ID Interne' }
          ]
        },
        {
          title: '📍 Localisation',
          fields: [
            { name: 'commune', label: 'Commune' },
            { name: 'codeCommune', label: 'Code Commune' },
            { name: 'codePostal', label: 'Code Postal' },
            { name: 'departement', label: 'Département' },
            { name: 'region', label: 'Région' },
            { name: 'lieuActivite', label: 'Lieu d’activité' },
            { name: 'typeLieuActivite', label: 'Type lieu d’activité' },
            { name: 'siret', label: 'SIRET' }
          ]
        },
        {
          title: '💼 Activité',
          fields: [
            { name: 'canal', label: 'Canal' },
            { name: 'typeActivite', label: 'Type d’activité' },
            { name: 'themes', label: 'Thèmes' },
            { name: 'sousThemesInformatique', label: 'Sous-thème informatique' },
            { name: 'sousThemeAccompagner', label: 'Sous-thème accompagner' },
            { name: 'sousThemeSante', label: 'Sous-thème santé' },
            { name: 'sousThemeBureautique', label: 'Sous-thème bureautique' }
          ]
        },
        {
          title: '👥 Participants',
          fields: [
            { name: 'nbParticipants', label: 'Nombre de participants' },
            { name: 'nbParticipantsRecurrents', label: 'Participants récurrents' },
            { name: 'nbPoursuiviIndividuel', label: 'Suivi individuel' },
            { name: 'nbPoursuiviAtelier', label: 'Suivi atelier' },
            { name: 'nbRedirection', label: 'Redirections' }
          ]
        },
        {
          title: '📌 Statuts',
          fields: [
            { name: 'statutEmploie', label: 'Employé' },
            { name: 'statutEtudiant', label: 'Étudiant' },
            { name: 'statutRetraite', label: 'Retraité' },
            { name: 'statutSansEmlpoi', label: 'Sans emploi' },
            { name: 'statutHeterogene', label: 'Hétérogène' }
          ]
        },
        {
          title: '🎂 Tranches d’âge',
          fields: [
            { name: 'ageInf12', label: 'Moins de 12 ans' },
            { name: 'ageEntre12et17', label: '12-17 ans' },
            { name: 'ageEntre18et35', label: '18-35 ans' },
            { name: 'ageEntre35et60', label: '35-60 ans' },
            { name: 'ageSup60', label: '60 ans et +' }
          ]
        }
      ].map((section, idx) => (
        <div className="card mb-4 shadow-sm" key={idx}>
          <div className="card-header bg-primary text-white fw-bold">
            {section.title}
          </div>
          <div className="card-body row row-cols-1 row-cols-md-2 g-3">
            {section.fields.map(field =>
              renderInput(field.name, field.label, field.type)
            )}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button type="submit" className="btn btn-success px-4 py-2 fw-bold">
          ➕ Ajouter
        </button>
      </div>
    </form>
  );
};

export default DataForm;

