'use client';

import {
  GET_URL,
  defaultList,
  OBJECTS_URL,
  SEARCH_PARAMS,
  SEARCH_URL,
} from '@/app/lib/constants';
import Artwork from '@/app/home/(components)/(artwork)/page';
import Filter from '@/app/ui/home/filter';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import Loading from '@/app/home/loading';
import { ArtworkType } from '@/app/@types';

const FILTER_MAX = 20;
const PAGINATION_MAX = 5;
const PAGINATION_COUNT = 4;

function ShowArtwork({
  artworks,
}: {
  artworks: ArtworkType[];
  paginationValue: number;
}) {
  return (
    <>
      {artworks.map(
        (artwork) =>
          artwork.primaryImageSmall && (
            <div key={artwork.objectID}>
              <Artwork artwork={artwork} key={artwork.objectID} />
            </div>
          ),
      )}
    </>
  );
}

export default function Page() {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [artworksToShow, setArtworksToShow] = useState<ArtworkType[]>([]);
  // const [objectIds, setObjectIds] = useState([]);
  const [paginationValue, setPaginationValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setArtworks(defaultList);
  }, []);

  useEffect(() => {
    setArtworksToShow(
      artworks.slice(paginationValue, paginationValue + PAGINATION_MAX),
    );
  }, [paginationValue, artworks]);

  // old way with calling the api on each page change
  // async function getArtworks(objectIDs: number[]) {
  //   const works = [];
  //   for (const id of objectIDs.slice(paginationValue, paginationValue + 10)) {
  //     const json = await fetchData(`${OBJECTS_URL}/${id}`);
  //     works.push(json);
  //   }
  //   setArtworks(works);
  //   setIsLoading(false);
  // }

  // async function getItemsByDepartment(id: string) {
  //   setIsLoading(true);
  //   const data = await fetchData(
  //     `${GET_URL}${SEARCH_PARAMS.DEPARTMENTS}=${id}`,
  //   );
  //   console.log('items', data);
  //   setObjectIds(data.objectIDs);
  //   await getArtworks(data.objectIDs);
  // }

  // function handlePageChange(e: ChangeEvent<unknown>, value: number) {
  //   const newPaginationValue = (value - 1) * 10;
  //   setPaginationValue(newPaginationValue);
  //   getArtworks(objectIds);
  // }

  async function fetchData(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  async function getFilteredItems(url: string) {
    setIsLoading(true);

    const data = await fetchData(url);
    const works = [];
    for (const id of data.objectIDs.slice(0, FILTER_MAX)) {
      const response = await fetchData(`${OBJECTS_URL}/${id}`);
      if (response.primaryImageSmall) {
        works.push(response);
      }
    }
    setArtworks(works);
    setIsLoading(false);
  }

  async function getItemsByDepartment(id: string) {
    const url = `${GET_URL}&${SEARCH_PARAMS.DEPARTMENTS}=${id}`;
    getFilteredItems(url);
  }

  async function getItemsByFilter(
    contentName: string,
    mediumId?: string,
    dateBegin?: string,
    dateEnd?: string,
  ) {
    const datesSearch =
      dateBegin && dateEnd
        ? `${SEARCH_PARAMS.DATE_BEGIN}=${dateBegin}&${SEARCH_PARAMS.DATE_END}=${dateEnd}`
        : null;

    const mediumSearch = mediumId
      ? `${SEARCH_PARAMS.MEDIUM}=${mediumId}`
      : null;

    const additionalSearchParams =
      datesSearch && mediumSearch
        ? `${mediumSearch}&${datesSearch}`
        : mediumSearch && !datesSearch
        ? mediumSearch
        : !mediumSearch && datesSearch
        ? datesSearch
        : null;

    const contentSearch = `${SEARCH_PARAMS.CONTENT}=${contentName}`;
    const url = additionalSearchParams
      ? `${SEARCH_URL}${additionalSearchParams}&${contentSearch}`
      : `${SEARCH_URL}${contentSearch}`;

    console.log('url', url);
    getFilteredItems(url);
  }

  function handlePageChange(e: ChangeEvent<unknown>, value: number) {
    const newPaginationValue = (value - 1) * 5;
    setPaginationValue(newPaginationValue);
  }

  return (
    <>
      <Filter
        filterByDepartment={getItemsByDepartment}
        filter={getItemsByFilter}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ShowArtwork
            artworks={artworksToShow}
            paginationValue={paginationValue}
          />
          <div className="flex justify-center m-[1em]">
            <Pagination
              count={PAGINATION_COUNT}
              variant="outlined"
              color="secondary"
              size="large"
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
