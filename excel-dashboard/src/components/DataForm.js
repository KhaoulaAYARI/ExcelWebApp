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
  idInterne: '',
  __v: ''
};

const DataForm = ({ onAdded }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

  const renderField = (name, placeholder) => (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      <label style={{ fontWeight: 'bold', fontSize: '14px' }}>{placeholder}</label>
      <input
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px',
      background: '#f9f9f9',
      borderRadius: '8px',
      marginBottom: '40px'
    }}>
      {Object.keys(initialState).map((key) =>
        renderField(key, key)
      )}
      <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          ➕ Ajouter
        </button>
      </div>
    </form>
  );
};

export default DataForm;
