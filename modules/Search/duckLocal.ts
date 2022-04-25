import {
  IAddLocation,
  IJobListData,
  IRemoveLocation,
  IResetFilterConfig,
  IResumeListData,
  ISearchState,
  ISetJobList,
  ISetResumeList,
  ISetSearchError,
  ISetSearchMode,
  ISetSearchValue,
  ISetSortValue,
  IUpdateFilterConfig,
  SearchAction,
  searchActionsTypes,
} from './interfaces'

import { SEARCH } from 'common/Searcher/interfaces/searcher'
import { SortValue } from 'common/Sorting/Sorting'

export const initSearchState: ISearchState = {
  searchMode: SEARCH.staff,
  cvs: [],
  jobs: [],
  pages: 0,
  page: 0,
  sortValue: 'updated_dttm_asc',
  searchValue: '',
  searchError: false,
  filterConfig: {
    cities: [],
    min_wage: 0,
    max_wage: 0,
    currency: 'rub',
    education_type: '',
    schedule_type: '',
    work_experience: '',
    employment_type: '',
  },
}

export const searchReducer = (state: ISearchState, action: SearchAction): ISearchState => {
  switch (action.type) {
    case searchActionsTypes.SET_RESUME_LIST:
      return {
        ...state,
        ...action.payload,
        jobs: [],
        searchError: false,
      }

    case searchActionsTypes.SET_JOB_LIST:
      return {
        ...state,
        ...action.payload,
        cvs: [],
        searchError: false,
      }

    case searchActionsTypes.UPDATE_FILTER_CONFIG:
      return {
        ...state,
        filterConfig: { ...state.filterConfig, [action.payload.name]: action.payload.value },
      }

    case searchActionsTypes.RESET_FILTER_CONFIG:
      return {
        ...state,
        filterConfig: { ...initSearchState.filterConfig },
      }

    case searchActionsTypes.ADD_LOCATION:
      return {
        ...state,
        filterConfig: {
          ...state.filterConfig,
          cities: [...state.filterConfig.cities, action.payload],
        },
      }

    case searchActionsTypes.REMOVE_LOCATION:
      return {
        ...state,
        filterConfig: {
          ...state.filterConfig,
          cities: [...state.filterConfig.cities.filter(city => city !== action.payload)],
        },
      }

    case searchActionsTypes.SET_SORT_VALUE:
      return {
        ...state,
        sortValue: action.payload,
      }

    case searchActionsTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      }

    case searchActionsTypes.SET_SEARCH_MODE:
      return { ...initSearchState, searchMode: action.payload }

    case searchActionsTypes.SET_SEARCH_ERROR:
      return { ...state, cvs: [], jobs: [], searchError: true }

    default:
      return state
  }
}

export const setResumeList = (payload: IResumeListData): ISetResumeList => ({
  type: searchActionsTypes.SET_RESUME_LIST,
  payload,
})

export const setJobList = (payload: IJobListData): ISetJobList => ({
  type: searchActionsTypes.SET_JOB_LIST,
  payload,
})

export const updateFilterConfig = (name: string, value: string | number): IUpdateFilterConfig => ({
  type: searchActionsTypes.UPDATE_FILTER_CONFIG,
  payload: { name, value },
})

export const resetFilterConfig = (): IResetFilterConfig => ({
  type: searchActionsTypes.RESET_FILTER_CONFIG,
})

export const addLocation = (value: string): IAddLocation => ({
  type: searchActionsTypes.ADD_LOCATION,
  payload: value,
})

export const removeLocation = (value: string): IRemoveLocation => ({
  type: searchActionsTypes.REMOVE_LOCATION,
  payload: value,
})

export const setSortValue = (value: SortValue): ISetSortValue => ({
  type: searchActionsTypes.SET_SORT_VALUE,
  payload: value,
})

export const setSearchValue = (value: string): ISetSearchValue => ({
  type: searchActionsTypes.SET_SEARCH_VALUE,
  payload: value,
})

export const setSearchMode = (mode: SEARCH): ISetSearchMode => ({
  type: searchActionsTypes.SET_SEARCH_MODE,
  payload: mode,
})

export const setSearchError = (): ISetSearchError => ({
  type: searchActionsTypes.SET_SEARCH_ERROR,
})
