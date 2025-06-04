import React, { useEffect, useState } from 'react';

function StatisticsDataTable({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/excel/statistics')
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        else alert("Erreur de chargement");
      })
      .catch(err => {
        console.error(err);
        alert("Erreur serveur");
      });
  }, [refresh]);

  return (
    <div>
      <h2>Données Statistiques Importées</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Mois</th>
            <th># CRA</th>
            <th>Accompagnements</th>
            <th>Temps total (h)</th>
            <th>Participants ateliers</th>
            <th>En emploi</th>
            <th>Thème le + fréquent</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            const themes = item.themesDesAccompagnements;
            const maxTheme = themes
              ? Object.keys(themes).reduce((a, b) => (themes[a] > themes[b] ? a : b))
              : '—';

            return (
              <tr key={idx}>
                <td>{item.month}</td>
                <td>{item.general?.nbCRA ?? '-'}</td>
                <td>{item.general?.nbAccompagnements ?? '-'}</td>
                <td>{item.tempsEnAccompagnements?.totalHeures ?? '-'}</td>
                <td>{item.general?.totalParticipantsAuxAteliers ?? '-'}</td>
                <td>{item.statutDesUsagers?.enEmploi ?? '-'}</td>
                <td>{maxTheme}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StatisticsDataTable;



