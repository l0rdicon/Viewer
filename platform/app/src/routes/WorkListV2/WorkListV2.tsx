import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
//import qs from 'query-string';
//import isEqual from 'lodash.isequal';
import { useTranslation } from 'react-i18next';
//
//import filtersMeta from './filtersMeta.js';
import { useAppConfig } from '@state';
//import { useDebounce, useSearchParams } from '@hooks';
import { utils, hotkeys, ServicesManager } from '@ohif/core';

import DetailCellRenderer from './detailCellRenderer';
import StatusBarComponent from './statusBar';

import {
  Icon,
  StudyListExpandedRow,
  LegacyButton,
  EmptyStudies,
  StudyListTable,
  StudyListPagination,
  StudyListFilter,
  TooltipClipboard,
  Header,
  useModal,
  useDialog,
  AboutModal,
  UserPreferences,
  LoadingIndicatorProgress,
  ButtonEnums,
  Dialog,
  Typography,
} from '@ohif/ui';

import i18n from '@ohif/i18n';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import './ag-theme-balham.css';

import { StatusPanelDef } from 'ag-grid-community';
import { forEach } from 'lodash';

//import 'ag-grid-community/styles/ag-theme-alpine.css'

const { sortBySeriesDate } = utils;

const { availableLanguages, defaultLanguage, currentLanguage } = i18n;

const seriesInStudiesMap = new Map();

/**
 * TODO:
 * - debounce `setFilterValues` (150ms?)
 */
function WorkListV2({
  data: studies,
  dataTotal: studiesTotal,
  isLoadingData,
  dataSource,
  hotkeysManager,
  dataPath,
  onRefresh,
  servicesManager,
}) {
  const { hotkeyDefinitions, hotkeyDefaults } = hotkeysManager;
  const { show, hide } = useModal();
  const { t } = useTranslation();
  const gridRef = useRef();

  // ~ Modes
  const [appConfig] = useAppConfig();
  const { create, dismiss } = useDialog();
  // ~ Filters
  //const searchParams = useSearchParams();
  const navigate = useNavigate();
  //const STUDIES_LIMIT = 101;
  //const queryFilterValues = _getQueryFilterValues(searchParams);
  /* const [filterValues, _setFilterValues] = useState({
    ...defaultFilterValues,
    ...queryFilterValues,
  });*/

  //const debouncedFilterValues = useDebounce(filterValues, 200);
  //const { resultsPerPage, pageNumber, sortBy, sortDirection } = filterValues;

  /*
   * The default sort value keep the filters synchronized with runtime conditional sorting
   * Only applied if no other sorting is specified and there are less than 101 studies
   */

  //const canSort = studiesTotal < STUDIES_LIMIT;
  //const shouldUseDefaultSort = sortBy === '' || !sortBy;

  const [studiesWithSeriesData, setStudiesWithSeriesData] = useState([]);
  const numOfStudies = studiesTotal;

  // Set body style
  useEffect(() => {
    document.body.classList.add('bg-black');
    return () => {
      document.body.classList.remove('bg-black');
    };
  }, []);

  const [rowData, setRowData] = useState(studies);
  console.log('loading worklist, studies: ', studies);

  useEffect(() => setRowData(studies), [studies]);

  const getRowId = useMemo(() => {
    return params => {
      console.log('getRowId: ', params.data);
      return params.data.studyInstanceUid;
    };
  }, []);

  const cellDoubleClickedListener = useCallback(event => {
    const validDisplayModes = [];
    appConfig.loadedModes.map((mode, i) => {
      const modalitiesToCheck = event.data.modalities.replaceAll('/', '\\');
      const study = event.data;
      const isValidMode = mode.isValidMode({
        modalities: modalitiesToCheck,
        study,
      });

      if (isValidMode) {
        validDisplayModes.push({
          mode: mode,
          study: study,
        });
      }
    });
    if (validDisplayModes.length > 1) {
      const actions = [];
      validDisplayModes.map((display, i) => {
        actions.push({
          id: display.mode.routeName,
          text: display.mode.displayName,
          type: ButtonEnums.type.primary,
          value: display.study.studyInstanceUid,
        });
      });

      create({
        id: 'display-mode-dialog',
        centralize: true,
        isDraggable: false,
        content: Dialog,
        contentProps: {
          title: 'Select a Display Mode',
          onSubmit: ({ action, value }) => {
            const query = new URLSearchParams();
            query.append('StudyInstanceUIDs', action.value);
            const to = dataPath
              ? '../../'
              : '' + action.id + (dataPath || '') + '?' + query.toString();
            console.log('submit: ', action.id, action.value, to);

            dismiss({ id: 'display-mode-dialog' });
            navigate(to);
          },
          actions: actions,
          onClose: () => {
            dismiss({ id: 'display-mode-dialog' });
          },
          body: ({ value, setValue }) => {
            return (
              <div>
                <Typography
                  variant="subtitle"
                  component="p"
                  color="initial"
                  className="flex items-center"
                  data-cy="options-chevron-down-icon"
                ></Typography>
              </div>
            );
          },
        },
      });
    } else if (validDisplayModes.length === 1) {
      const query = new URLSearchParams();
      query.append('StudyInstanceUIDs', validDisplayModes[0].study.studyInstanceUid);
      const to = dataPath
        ? '../../'
        : '' + validDisplayModes[0].mode.routeName + (dataPath || '') + '?' + query.toString();

      console.log('to: ', validDisplayModes, to);
      navigate(to);
    }

    console.log('cellDoubleClickedListener', event, validDisplayModes.length, validDisplayModes);
  }, []);

  const dateFromatter = params => {
    const studyDate =
      params.value &&
      moment(params.value, ['YYYYMMDD', 'YYYY.MM.DD'], true).isValid() &&
      moment(params.value, ['YYYYMMDD', 'YYYY.MM.DD']).format('MMM-DD-YYYY');
    return studyDate;
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'patientName',
      filterParams: {
        caseSensitive: true,
      },
      filter: 'agTextColumnFilter',
      cellRenderer: 'agGroupCellRenderer',
    },
    { field: 'mrn', filter: 'agTextColumnFilter' },
    { field: 'date', filter: 'agDateColumnFilter', valueFormatter: dateFromatter },
    { field: 'description' },
    { field: 'modality', filter: 'agTextColumnFilter' },
    { field: 'accession', filter: 'agTextColumnFilter' },
    { field: 'instances' },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      floatingFilter: true,
    }),
    null
  );

  const detailCellRenderer = useMemo(() => {
    return DetailCellRenderer;
  }, []);

  // Sync URL query parameters with filters
  /*useEffect(() => {
    if (!debouncedFilterValues) {
      return;
    }

    const queryString = {};
    Object.keys(defaultFilterValues).forEach(key => {
      const defaultValue = defaultFilterValues[key];
      const currValue = debouncedFilterValues[key];

      // TODO: nesting/recursion?
      if (key === 'studyDate') {
        if (
          currValue.startDate &&
          defaultValue.startDate !== currValue.startDate
        ) {
          queryString.startDate = currValue.startDate;
        }
        if (currValue.endDate && defaultValue.endDate !== currValue.endDate) {
          queryString.endDate = currValue.endDate;
        }
      } else if (key === 'modalities' && currValue.length) {
        queryString.modalities = currValue.join(',');
      } else if (currValue !== defaultValue) {
        queryString[key] = currValue;
      }
    });

    const search = qs.stringify(queryString, {
      skipNull: true,
      skipEmptyString: true,
    });

    navigate({
      pathname: '/',
      search: search ? `?${search}` : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilterValues]);
  */

  const onGridReady = useCallback(params => {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    if (gridRef && gridRef.current) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  const statusBar = useMemo<{
    statusPanels: StatusPanelDef[];
  }>(() => {
    return {
      statusPanels: [
        {
          statusPanel: StatusBarComponent,
        },
      ],
    };
  }, []);

  // Query for series information
  useEffect(() => {
    const fetchSeries = async studyInstanceUid => {
      try {
        const series = await dataSource.query.series.search(studyInstanceUid);
        seriesInStudiesMap.set(studyInstanceUid, sortBySeriesDate(series));
        setStudiesWithSeriesData([...studiesWithSeriesData, studyInstanceUid]);
      } catch (ex) {
        // TODO: UI Notification Service
        console.warn(ex);
      }
    };
    // fetchSeries(studyInstanceUid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studies]);

  const onSelectionChanged = useCallback(() => {
    if (gridRef && gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      console.log('selectedRows: ', selectedRows);

      //setRowData(studies);
    }
  }, []);

  const hasStudies = numOfStudies > 0;
  const versionNumber = process.env.VERSION_NUMBER;
  const commitHash = process.env.COMMIT_HASH;

  const menuOptions = [
    {
      title: t('Header:About'),
      icon: 'info',
      onClick: () =>
        show({
          content: AboutModal,
          title: 'About OHIF Viewer',
          contentProps: { versionNumber, commitHash },
        }),
    },
    {
      title: t('Header:Preferences'),
      icon: 'settings',
      onClick: () =>
        show({
          title: t('UserPreferencesModal:User Preferences'),
          content: UserPreferences,
          contentProps: {
            hotkeyDefaults: hotkeysManager.getValidHotkeyDefinitions(hotkeyDefaults),
            hotkeyDefinitions,
            onCancel: hide,
            currentLanguage: currentLanguage(),
            availableLanguages,
            defaultLanguage,
            onSubmit: state => {
              i18n.changeLanguage(state.language.value);
              hotkeysManager.setHotkeys(state.hotkeyDefinitions);
              hide();
            },
            onReset: () => hotkeysManager.restoreDefaultBindings(),
            hotkeysModule: hotkeys,
          },
        }),
    },
  ];

  return (
    <div className="flex h-screen flex-col bg-black ">
      <Header
        isSticky
        menuOptions={menuOptions}
        isReturnEnabled={false}
        WhiteLabeling={appConfig.whiteLabeling}
      />
      <div
        className="ag-theme-balham-dark ohif-scrollbar overflow-y-auto"
        style={{ width: '100%', height: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          onGridReady={onGridReady}
          masterDetail={true}
          detailCellRenderer={detailCellRenderer}
          detailRowHeight={210}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={getRowId}
          suppressCellFocus={true}
          onCellDoubleClicked={cellDoubleClickedListener}
          statusBar={statusBar}
          //enableAdvancedFilter={true}

          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
        ></AgGridReact>
      </div>
    </div>
  );
}

WorkListV2.propTypes = {
  data: PropTypes.array.isRequired,
  dataSource: PropTypes.shape({
    query: PropTypes.object.isRequired,
    getConfig: PropTypes.func,
  }).isRequired,
  isLoadingData: PropTypes.bool.isRequired,
  servicesManager: PropTypes.instanceOf(ServicesManager),
};

const defaultFilterValues = {
  patientName: '',
  mrn: '',
  studyDate: {
    startDate: null,
    endDate: null,
  },
  description: '',
  modalities: [],
  accession: '',
  sortBy: '',
  sortDirection: 'none',
  pageNumber: 1,
  resultsPerPage: 25,
  datasources: '',
  configUrl: null,
};

function _tryParseInt(str, defaultValue) {
  let retValue = defaultValue;
  if (str && str.length > 0) {
    if (!isNaN(str)) {
      retValue = parseInt(str);
    }
  }
  return retValue;
}

function _getQueryFilterValues(params) {
  const queryFilterValues = {
    patientName: params.get('patientname'),
    mrn: params.get('mrn'),
    studyDate: {
      startDate: params.get('startdate') || null,
      endDate: params.get('enddate') || null,
    },
    description: params.get('description'),
    modalities: params.get('modalities') ? params.get('modalities').split(',') : [],
    accession: params.get('accession'),
    sortBy: params.get('sortby'),
    sortDirection: params.get('sortdirection'),
    pageNumber: _tryParseInt(params.get('pagenumber'), undefined),
    resultsPerPage: _tryParseInt(params.get('resultsperpage'), undefined),
    datasources: params.get('datasources'),
    configUrl: params.get('configurl'),
  };

  // Delete null/undefined keys
  Object.keys(queryFilterValues).forEach(
    key => queryFilterValues[key] == null && delete queryFilterValues[key]
  );

  return queryFilterValues;
}

export default WorkListV2;
