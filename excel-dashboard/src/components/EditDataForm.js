import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditDataForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/excel/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => {
        console.error(err);
        alert("Erreur lors du chargement des données");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/excel/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("✅ Données mises à jour !");
      navigate('/collection1');
    } else {
      alert("❌ Échec de la mise à jour");
    }
  };

  if (!formData) return <p className="text-center mt-5">Chargement...</p>;

  // Regroupement logique des champs
  const fieldGroups = [
    {
      title: '🗂 Données générales',
      fields: ['dateAccompagnement', 'dateCreation', 'idInterne']
    },
    {
      title: '📍 Localisation',
      fields: ['commune', 'codeCommune', 'codePostal', 'departement', 'region', 'lieuActivite', 'typeLieuActivite', 'siret']
    },
    {
      title: '💼 Activité',
      fields: ['canal', 'typeActivite', 'themes', 'sousThemesInformatique', 'sousThemeAccompagner', 'sousThemeSante', 'sousThemeBureautique']
    },
    {
      title: '👥 Participants',
      fields: ['nbParticipants', 'nbParticipantsRecurrents', 'nbPoursuiviIndividuel', 'nbPoursuiviAtelier', 'nbRedirection']
    },
    {
      title: '📌 Statuts',
      fields: ['statutEmploie', 'statutEtudiant', 'statutRetraite', 'statutSansEmlpoi', 'statutHeterogene']
    },
    {
      title: '🎂 Tranches d’âge',
      fields: ['ageInf12', 'ageEntre12et17', 'ageEntre18et35', 'ageEntre35et60', 'ageSup60']
    }
  ];

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4">📝 Modifier un enregistrement</h2>

        {fieldGroups.map((group, idx) => (
          <div className="card mb-4 shadow-sm" key={idx}>
            <div className="card-header bg-info text-white fw-bold">
              {group.title}
            </div>
            <div className="card-body row row-cols-1 row-cols-md-2 g-3">
              {group.fields.map(field => (
                <div className="col" key={field}>
                  <label className="form-label fw-semibold">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            ✅ Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDataForm;

