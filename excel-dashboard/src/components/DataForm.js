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
  statutEtudiant:'',
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
  sousThemeSante:'',
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

  const renderInput = (name, label, type = "text", placeholder) => (
    <div className="col-md-6" key={name}>
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder || `Ex: ${label}`}
        //required
        className="form-control"
      />
    </div>
  );

  // --- Render form ---
  return (
    <form onSubmit={handleSubmit} className="container my-4">

      {[
        {
          title: 'Données générales',
          fields: [
            { name: 'dateAccompagnement', label: 'Date accompagnement', type: 'date' },
            { name: 'dateCreation', label: 'Date création', type: 'date' },
            { name: 'idInterne', label: 'ID Interne' }
          ]
        },
        {
          title: 'Localisation',
          fields: [
            { name: 'commune', label: 'Commune', placeholder: 'Ex: NANCY' },
            { name: 'codeCommune', label: 'Code Commune', placeholder: 'Ex: 54395' },
            { name: 'codePostal', label: 'Code Postal', placeholder: 'Ex: 54100' },
            { name: 'departement', label: 'Département', placeholder: 'Ex: 54' },
            { name: 'region', label: 'Région', placeholder: 'Ex: 44' },
            { name: 'lieuActivite', label: 'Lieu d’activité', placeholder: 'Ex: CENTRE SOCIAL' },
            { name: 'typeLieuActivite', label: 'Type lieu d’activité', placeholder: 'Ex: Public' },
            { name: 'siret', label: 'SIRET', placeholder: 'Ex: 12345678901234' }
          ]
        },
        {
          title: 'Activité',
          fields: [
            { name: 'canal', label: 'Canal', placeholder: 'Ex: rattachement' },
            { name: 'typeActivite', label: 'Type d’activité', placeholder: 'collectif' },
            { name: 'themes', label: 'Thèmes', placeholder: 'equipement informatique' },
            { name: 'sousThemesInformatique', label: 'Sous-thème informatique', placeholder: '' },
            { name: 'sousThemeAccompagner', label: 'Sous-thème accompagner' , placeholder: ''},
            { name: 'sousThemeSante', label: 'Sous-thème santé', placeholder: '' },
            { name: 'sousThemeBureautique', label: 'Sous-thème bureautique', placeholder: '' }
          ]
        },
        {
          title: 'Participants',
          fields: [
            { name: 'nbParticipants', label: 'Nombre de participants' , placeholder: 'Ex: 4'},
            { name: 'nbParticipantsRecurrents', label: 'Participants récurrents', placeholder: 'Ex: 1' },
            { name: 'nbPoursuiviIndividuel', label: 'Suivi individuel' , placeholder: 'Ex: 1' },
            { name: 'nbPoursuiviAtelier', label: 'Suivi atelier' , placeholder: 'Ex: 1' },
            { name: 'nbRedirection', label: 'Redirections' , placeholder: 'Ex: 0' }
          ]
        },
        {
          title: 'Statuts',
          fields: [
            { name: 'statutEmploie', label: 'Employé' , placeholder: 'Ex: 1'},
            { name: 'statutEtudiant', label: 'Étudiant' , placeholder: 'Ex: 1'},
            { name: 'statutRetraite', label: 'Retraité' , placeholder: 'Ex: 1'},
            { name: 'statutSansEmlpoi', label: 'Sans emploi' , placeholder: 'Ex: 1'},
            { name: 'statutHeterogene', label: 'Hétérogène', placeholder: 'Ex: 1' }
          ]
        },
        {
          title: 'Tranches d’âge',
          fields: [
            { name: 'ageInf12', label: 'Moins de 12 ans'  , placeholder: 'Ex: 1'},
            { name: 'ageEntre12et17', label: '12-17 ans' , placeholder: 'Ex: 1' },
            { name: 'ageEntre18et35', label: '18-35 ans' , placeholder: 'Ex: 1' },
            { name: 'ageEntre35et60', label: '35-60 ans' , placeholder: 'Ex: 1' },
            { name: 'ageSup60', label: '60 ans et +'  , placeholder: 'Ex: 1'}
          ]
        }
      ].map((section, idx) => (
        <div className="card mb-4 shadow-sm" key={idx}>
          <div className="card-header bg-primary text-white fw-bold">
            {section.title}
          </div>
          <div className="card-body row row-cols-1 row-cols-md-2 g-3">
            {section.fields.map(field =>
              renderInput(field.name, field.label, field.type, field.placeholder)
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

