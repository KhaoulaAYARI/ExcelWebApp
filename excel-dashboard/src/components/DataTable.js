import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
} from 'react-table';
import { fetchData, deleteData } from '../services/api';

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control form-control-sm"
      placeholder="Filtrer..."
    />
  );
};

const DataTable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData().then((res) => setData(res.data));
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteData(id);
    const updated = data.filter((item) => item._id !== id);
    setData(updated);
  };

  const handleEdit = (id) => {
    navigate(`/modifier-collection1/${id}`);
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows.map((row) => row.original));
    XLSX.utils.book_append_sheet(wb, ws, 'Export');
    XLSX.writeFile(wb, `export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const columns = useMemo(
    () => [
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
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-warning" onClick={() => handleEdit(row.original._id)}>
              Modifier
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.original._id)}>
              Supprimer
            </button>
          </div>
        ),
      },
    ],
    []
  );

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
      defaultColumn,
      initialState: { pageSize: 25 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;

  const handleResetFilters = () => {
    setGlobalFilter('');
    setAllFilters([]);
  };

  return (
    <div className="container">
      <div className="mb-3 d-flex flex-column flex-md-row align-items-start gap-2">
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control"
          style={{ maxWidth: '300px' }}
          placeholder="🔎 Rechercher globalement..."
        />
        <div className="d-flex gap-2">
          <button className="btn btn-secondary" onClick={handleResetFilters}>
            Réinitialiser les filtres
          </button>
          <button className="btn btn-success" onClick={handleExportExcel}>
            Exporter en Excel
          </button>
        </div>
      </div>

      <p className="fst-italic">
        {rows.length} lignes affichées sur {data.length}
      </p>

      <div className="table-responsive">
        <table {...getTableProps()} className="table table-bordered table-sm table-striped">
          <thead>
            {headerGroups.map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id} {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
                <tr>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      {column.canFilter ? column.render('Filter') : null}
                    </th>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-outline-primary" onClick={previousPage} disabled={!canPreviousPage}>
          ⬅️ Précédent
        </button>
        <button className="btn btn-outline-primary" onClick={nextPage} disabled={!canNextPage}>
          Suivant ➡️
        </button>
      </div>
    </div>
  );
};

export default DataTable;



