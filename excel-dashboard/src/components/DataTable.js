import React, { useEffect, useMemo, useState } from 'react';
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
} from 'react-table';
import { fetchData, deleteData } from '../services/api';

// 🎯 Composant pour filtrer une colonne
const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Filtrer..."
      style={{ width: '100%' }}
    />
  );
};

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

  // 🧱 Définir les colonnes
  const columns = useMemo(() => [
    { Header: 'Date Accompagnement', accessor: 'dateAccompagnement' },
    { Header: 'Date Création', accessor: 'dateCreation' },
    { Header: 'Commune', accessor: 'commune' },
    { Header: 'Code Commune', accessor: 'codeCommune' },
    { Header: 'Code Postal', accessor: 'codePostal' },
    { Header: 'Département', accessor: 'departement' },
    { Header: 'Région', accessor: 'region' },
    { Header: 'Lieu Activité', accessor: 'lieuActivite' },
    { Header: 'Type Lieu Activité', accessor: 'typeLieuActivite' },
    { Header: 'SIRET', accessor: 'siret' },
    { Header: 'Canal', accessor: 'canal' },
    { Header: 'Type Activité', accessor: 'typeActivite' },
    { Header: 'Thèmes', accessor: 'themes' },
    { Header: 'Sous-thème informatique', accessor: 'sousThemesInformatique' },
    { Header: 'Sous-thème accompagner', accessor: 'sousThemeAccompagner' },
    { Header: 'Sous-thème santé', accessor: 'sousThemeSante' },
    { Header: 'Sous-thème bureautique', accessor: 'sousThemeBureautique' },
    { Header: 'Participants', accessor: 'nbParticipants' },
    { Header: 'Participants récurrents', accessor: 'nbParticipantsRecurrents' },
    { Header: 'Suivi individuel', accessor: 'nbPoursuiviIndividuel' },
    { Header: 'Suivi atelier', accessor: 'nbPoursuiviAtelier' },
    { Header: 'Redirections', accessor: 'nbRedirection' },
    { Header: 'Employé', accessor: 'statutEmploie' },
    { Header: 'Étudiant', accessor: 'statutEtudiant' },
    { Header: 'Retraité', accessor: 'statutRetraite' },
    { Header: 'Sans emploi', accessor: 'statutSansEmlpoi' },
    { Header: 'Hétérogène', accessor: 'statutHeterogene' },
    { Header: 'Moins de 12 ans', accessor: 'ageInf12' },
    { Header: '12-17 ans', accessor: 'ageEntre12et17' },
    { Header: '18-35 ans', accessor: 'ageEntre18et35' },
    { Header: '35-60 ans', accessor: 'ageEntre35et60' },
    { Header: '60 ans et +', accessor: 'ageSup60' },
    { Header: 'ID Interne', accessor: 'idInterne' },
    {
      Header: 'Action',
      disableFilters: true, // Ne pas filtrer cette colonne
      Cell: ({ row }) => (
        <button onClick={() => handleDelete(row.original._id)}>Supprimer</button>
      ),
    }
  ], []);

  // ✅ Définir un filtre par défaut
  const defaultColumn = useMemo(() => ({
    Filter: ColumnFilter,
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setAllFilters,
    state,
    setGlobalFilter,
    rows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // 👈 Ajout important
      initialState: { pageSize: 25 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;
 // Bouton de réinitialisation
  const handleResetFilters = () => {
    setGlobalFilter('');
    setAllFilters([]);
  };
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Rechercher globalement..."
          style={{ padding: '5px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={handleResetFilters}>Réinitialiser les filtres</button>
      </div>

      {/* 🔢 Message ligne filtrée */}
      <div style={{ marginBottom: '10px', fontStyle: 'italic' }}>
        {rows.length} lignes affichées sur {data.length}
      </div>

      <table {...getTableProps()} border="1" cellPadding="8" cellSpacing="0">
        <thead>
          {headerGroups.map(headerGroup => (
            <React.Fragment key={headerGroup.id}>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} key={column.id}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
              <tr key={`filter-${headerGroup.id}`}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    {column.canFilter ? column.render('Filter') : null}
                  </th>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Précédent
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage} style={{ marginLeft: '10px' }}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default DataTable;


