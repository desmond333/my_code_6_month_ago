import {
  Currency,
  Education,
  Employment,
  IResume,
  Schedule,
  WorkExperiences,
} from 'modules/Resume/interfaces'

import { IJob } from 'modules/Job/interfaces'
import { SEARCH } from 'common/Searcher/interfaces/searcher'
import { SortValue } from 'common/Sorting/Sorting'

export interface IFilterConfig {
  currency: Currency
  cities: string[]
  min_wage: number
  max_wage: number
  education_type: Education | ''
  schedule_type: Schedule | ''
  work_experience: WorkExperiences | ''
  employment_type: Employment | ''
}

export interface ISearchState {
  searchMode: SEARCH
  cvs: IResume[]
  jobs: IJob[]
  pages: number
  page: number
  sortValue: SortValue
  searchValue: string
  filterConfig: IFilterConfig
  searchError: boolean
}

export enum searchActionsTypes {
  SET_RESUME_LIST = 'app/common/home/SET_RESUME_LIST',
  SET_JOB_LIST = 'app/common/home/SET_JOB_LIST',
  UPDATE_FILTER_CONFIG = 'app/common/home/UPDATE_FILTER_CONFIG',
  RESET_FILTER_CONFIG = 'app/common/home/RESET_FILTER_CONFIG',
  ADD_LOCATION = 'app/common/home/ADD_LOCATION',
  REMOVE_LOCATION = 'app/common/home/REMOVE_LOCATION',
  SET_SEARCH_VALUE = 'app/common/home/SET_SEARCH_VALUE',
  SET_SORT_VALUE = 'app/common/home/SET_SORT_VALUE',
  SET_SEARCH_MODE = 'app/common/home/SET_SEARCH_MODE',
  SET_SEARCH_ERROR = 'app/common/home/SET_SEARCH_ERROR',
}

export interface IResumeListData {
  cvs: IResume[]
  pages: number
  page: number
}

export interface ISetResumeList {
  type: searchActionsTypes.SET_RESUME_LIST
  payload: IResumeListData
}

export interface IJobListData {
  jobs: IJob[]
  pages: number
  page: number
}

export interface ISetJobList {
  type: searchActionsTypes.SET_JOB_LIST
  payload: IJobListData
}

export interface IUpdateFilterConfig {
  type: searchActionsTypes.UPDATE_FILTER_CONFIG
  payload: {
    name: string
    value: string | number
  }
}

export interface IResetFilterConfig {
  type: searchActionsTypes.RESET_FILTER_CONFIG
}

export interface IAddLocation {
  type: searchActionsTypes.ADD_LOCATION
  payload: string
}

export interface IRemoveLocation {
  type: searchActionsTypes.REMOVE_LOCATION
  payload: string
}

export interface ISetSortValue {
  type: searchActionsTypes.SET_SORT_VALUE
  payload: SortValue
}

export interface ISetSearchValue {
  type: searchActionsTypes.SET_SEARCH_VALUE
  payload: string
}

export interface ISetSearchMode {
  type: searchActionsTypes.SET_SEARCH_MODE
  payload: SEARCH
}

export interface ISetSearchError {
  type: searchActionsTypes.SET_SEARCH_ERROR
}

export type SearchAction =
  | ISetResumeList
  | ISetJobList
  | IUpdateFilterConfig
  | IResetFilterConfig
  | IAddLocation
  | IRemoveLocation
  | ISetSortValue
  | ISetSearchValue
  | ISetSearchMode
  | ISetSearchError
