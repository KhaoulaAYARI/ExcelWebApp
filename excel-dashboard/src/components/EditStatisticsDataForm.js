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
      navigate('/collection2');
    } else {
      alert("❌ Échec de la mise à jour");
    }
  };

  if (!formData) return <p className="text-center mt-5">Chargement en cours...</p>;

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4">📝 Modifier les données statistiques</h2>

        <div className="card mb-4 shadow-sm">
          <div className="card-body row">
            <div className="col-md-6">
              <label className="form-label fw-bold">Mois :</label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleTopLevelChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        {Object.entries(formData).map(([section, values]) => {
          if (typeof values !== 'object') return null;

          return (
            <div className="card mb-4 shadow-sm" key={section}>
              <div className="card-header bg-primary text-white fw-bold text-capitalize">
                {section.replace(/([A-Z])/g, ' $1')}
              </div>
              <div className="card-body row row-cols-1 row-cols-md-2 g-3">
                {Object.entries(values).map(([key, val]) => (
                  <div className="col" key={key}>
                    <label className="form-label fw-semibold">{key}</label>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => handleChange(section, key, e.target.value)}
                      className="form-control"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success btn-lg">
            ✅ Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStatisticsDataForm;
