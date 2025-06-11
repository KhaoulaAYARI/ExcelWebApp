import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditStatisticsDataForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/statistics/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => {
        console.error(err);
        alert("Erreur lors du chargement des données");
      });
  }, [id]);

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
    const res = await fetch(`http://localhost:5000/api/statistics/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("✅ Donnée modifiée avec succès");
      navigate('/collection2'); // Retour à la liste
    } else {
      alert("❌ Échec de la mise à jour");
    }
  };

  if (!formData) return <p>Chargement en cours...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>📝 Modifier les données statistiques</h2>

      <label>Mois :</label>
      <input
        name="month"
        value={formData.month}
        onChange={handleTopLevelChange}
        required
      />

      {Object.entries(formData).map(([section, values]) => {
        if (typeof values !== 'object') return null;
        return (
          <fieldset key={section} style={{ marginTop: '1rem' }}>
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

      <button type="submit" style={{ marginTop: '1rem' }}>✅ Enregistrer</button>
    </form>
  );
}

export default EditStatisticsDataForm;
