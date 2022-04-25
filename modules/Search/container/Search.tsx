import React, { useReducer } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

import { Pagination, Sorting, Searcher, ResumeList, JobList } from 'common'
import { SEARCH } from 'common/Searcher/interfaces/searcher'

import { palette } from 'utils'
import { sortOptions } from '../../Resume/data'
import { getAllResumesRequest, getFilteredResumesRequest } from '../../Resume/resume.api'
import { getAllJobsRequest, getFilteredJobsRequest } from '../../Job/job.api'

import { getConfigWithoutDefaults } from '../utils'
import {
  addLocation,
  initSearchState,
  removeLocation,
  resetFilterConfig,
  searchReducer,
  setJobList,
  setResumeList,
  setSearchValue,
  updateFilterConfig,
} from '../duckLocal'
import { IGetResumeListResponse } from '../../Resume/resume.api.interfaces'
import { IGetJobListResponse } from '../../Job/job.api.interfaces'
import { setSearchError, setSearchMode, setSortValue } from '../../HomeScreen/duckLocal'

const LIMIT_NUM_PAGES = window.innerWidth > 768 ? 5 : 3

export const Search: React.FC = (): JSX.Element => {
  const [
    { searchMode, cvs, jobs, filterConfig, searchValue, sortValue, pages, page, searchError },
    dispatch,
  ] = useReducer(searchReducer, initSearchState)

  const getFilteredList = async (config: any, page: number) => {
    try {
      const body = { ...config, sort: sortValue, page }
      if (searchValue) body.job_title_token = searchValue

      const { data } =
        searchMode === SEARCH.staff
          ? await getFilteredResumesRequest(body)
          : await getFilteredJobsRequest(body)

      setList(data)
    } catch (error) {
      console.error('Error while getting whole resume list.', error)
    }
  }

  const getAllList = async (page: number) => {
    try {
      const body = { page, sort: sortValue }

      const { data } =
        searchMode === SEARCH.staff
          ? await getAllResumesRequest(body)
          : await getAllJobsRequest(body)

      setList(data)
    } catch (error) {
      console.error('Error while getting whole resume list.', error)
    }
  }

  const getList = (page: number = 0) => {
    const configWithoutDefaults = getConfigWithoutDefaults(filterConfig)

    if (!filterConfig.min_wage && !filterConfig.max_wage) {
      delete configWithoutDefaults.currency
    }

    !isEmpty(configWithoutDefaults) || searchValue
      ? getFilteredList(configWithoutDefaults, page)
      : getAllList(page)
  }

  const setList = (data: IGetResumeListResponse | IGetJobListResponse) => {
    if ('cvs' in data) {
      const cvs = [...data.promoted_cvs, ...data.cvs]
      cvs.length
        ? dispatch(setResumeList({ cvs, pages: data.pages, page }))
        : dispatch(setSearchError())
    } else if ('jobs' in data) {
      const jobs = [...data.promoted_jobs, ...data.jobs]
      jobs.length
        ? dispatch(setJobList({ jobs, pages: data.pages, page }))
        : dispatch(setSearchError())
    }
  }

  const isData = !!cvs.length || !!jobs.length

  return (
    <Container>
      <Searcher
        $background={palette.bg.secondary}
        searchMode={searchMode}
        setSearchMode={value => dispatch(setSearchMode(value))}
        filterConfig={filterConfig}
        updateFilters={(name, value) => dispatch(updateFilterConfig(name, value))}
        addLocation={value => dispatch(addLocation(value))}
        removeLocation={value => dispatch(removeLocation(value))}
        searchValue={searchValue}
        setSearchValue={value => dispatch(setSearchValue(value))}
        resetFilters={() => dispatch(resetFilterConfig())}
        onClickSearch={() => getList()}
        applyFilters={() => getList()}
      />

      <SortingSection>
        <Label>Сортировка:</Label>
        <Sorting
          value={sortValue}
          options={sortOptions}
          onChange={value => dispatch(setSortValue(value))}
        />
      </SortingSection>

      {!!cvs.length && <ResumeList list={cvs} bg={palette.bg.secondary} />}
      {!!jobs.length && <JobList list={jobs} bg={palette.bg.secondary} />}

      {isData && (
        <Pagination
          page={page + 1}
          pages={pages}
          limitNumPages={LIMIT_NUM_PAGES}
          onChange={page => getList(page - 1)}
        />
      )}

      {searchError && <SearchError>По вашему запросу ничего не найдено</SearchError>}
    </Container>
  )
}

const Container = styled.section`
  margin: 0 auto;
  padding: 32px 64px 64px;
  width: 100%;
  max-width: 1312px;

  @media (max-width: 1312px) {
    padding: 40px 40px 64px;
  }

  @media (max-width: 768px) {
    padding: 20px 16px 24px;
  }
`

const SortingSection = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 24px;

  @media (max-width: 1312px) {
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    margin-top: 24px;
    margin-bottom: 16px;
  }
`

const Label = styled.h4`
  font-family: Ubuntu;
  font-weight: bold;
  font-size: 1em;
  line-height: 125%;
  color: ${palette.text.primary};
  margin-right: 32px;

  @media (max-width: 1312px) {
    margin-right: 0;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    padding-bottom: 8px;
    margin-bottom: 12px;
    border-bottom: 1px solid ${palette.border.tetriary};
  }
`

const SearchError = styled.div`
  font-family: Ubuntu;
  font-weight: bold;
  font-size: 0.875em;
  line-height: 118%;
  color: ${palette.text.primary};
  text-align: center;
  background: ${palette.bg.secondary};
  border-radius: 16px;
  padding: 40px 0;
`
