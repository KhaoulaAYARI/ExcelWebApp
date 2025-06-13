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

  if (!formData) return <p>Chargement...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>📝 Modifier un enregistrement</h2>

      {Object.entries(formData).map(([key, value]) => (
        key !== '_id' && (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{key} :</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              style={{ marginLeft: '10px', width: '300px' }}
            />
          </div>
        )
      ))}

      <button type="submit">✅ Enregistrer</button>
    </form>
  );
}

export default EditDataForm;
