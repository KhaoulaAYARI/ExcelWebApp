import React, { useEffect, useState } from 'react';
import { fetchData, deleteData } from '../services/api';

const DataTable = ({ refresh }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(res => setData(res.data));
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteData(id);
    const updated = data.filter((item) => item._id !== id);
    setData(updated);
  };

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>dateAccompagnement</th>
          <th>dateCreation</th>
          <th>commune</th>
          <th>codeCommune</th>
          <th>codePostal</th>
          <th>departement</th>
          <th>region</th>
          <th>lieuActivite</th>
          <th>typeLieuActivite</th>
          <th>siret</th>
          <th>canal</th>
          <th>typeActivite</th>
          <th>duree</th>
          <th>nbParticipants</th>
          <th>nbParticipantsRecurrents</th>
          <th>nbPoursuiviIndividuel</th>
          <th>nbPoursuiviAtelier</th>
          <th>nbRedirection</th>
          <th>statutEmploie</th>
          <th>statutEtudiant</th>
          <th>statutRetraite</th>
          <th>statutSansEmlpoi</th>
          <th>statutHeterogene</th>
          <th>ageInf12</th>
          <th>ageEntre12et17</th>
          <th>ageEntre18et35</th>
          <th>ageEntre35et60</th>
          <th>ageSup60</th>
          <th>themes</th>
          <th>sousThemesInformatique</th>
          <th>sousThemeAccompagner</th>
          <th>sousThemeSante</th>
          <th>sousThemeBureautique</th>
          <th>idInterne</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row._id}>
            <td>{row.dateAccompagnement}</td>
            <td>{row.dateCreation}</td>
            <td>{row.commune}</td>
            <td>{row.codeCommune}</td>
            <td>{row.codePostal}</td>
            <td>{row.departement}</td>
            <td>{row.region}</td>
            <td>{row.lieuActivite}</td>
            <td>{row.typeLieuActivite}</td>
            <td>{row.siret}</td>
            <td>{row.canal}</td>
            <td>{row.typeActivite}</td>
            <td>{row.nbParticipants}</td>
            <td>{row.nbParticipantsRecurrents}</td>
            <td>{row.nbPoursuiviIndividuel}</td>
            <td>{row.nbPoursuiviAtelier}</td>
            <td>{row.nbRedirection}</td>
            <td>{row.statutEmploie}</td>
            <td>{row.statutEtudiant}</td>
            <td>{row.statutRetraite}</td>
            <td>{row.statutSansEmlpoi}</td>
            <td>{row.statutHeterogene}</td>
            <td>{row.ageInf12}</td>
            <td>{row.ageEntre12et17}</td>
            <td>{row.ageEntre18et35}</td>
            <td>{row.ageEntre35et60}</td>
            <td>{row.ageSup60}</td>
            <td>{row.themes}</td>
            <td>{row.sousThemesInformatique}</td>
            <td>{row.sousThemeAccompagner}</td>
            <td>{row.sousThemeSante}</td>
            <td>{row.sousThemeBureautique}</td>
            <td>{row.idInterne}</td>
            <td><button onClick={() => handleDelete(row._id)}>Supprimer</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
