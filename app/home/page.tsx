'use client';

import Button from '@mui/material/Button';
import {
  GET_URL,
  defaultList,
  OBJECTS_URL,
  SEARCH_PARAMS,
} from '@/app/lib/constants';
import Artwork from '@/app/home/(components)/(artwork)/page';
import Filter from '@/app/ui/home/filter';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import Loading from '@/app/home/loading';
import { ArtworkType } from '@/app/@types';

function ShowArtwork({ artworks }: { artworks: ArtworkType[] }) {
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
  const [objectIds, setObjectIds] = useState([]);
  const [paginationValue, setPaginationValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setArtworks(defaultList);
  }, []);

  async function getArtworks(objectIDs: number[]) {
    const works = [];
    for (const id of objectIDs.slice(paginationValue, paginationValue + 10)) {
      const json = await fetchData(`${OBJECTS_URL}/${id}`);
      works.push(json);
    }
    setArtworks(works);
    setIsLoading(false);
  }

  async function getItemsByDepartment(id: string) {
    setIsLoading(true);
    const data = await fetchData(
      `${GET_URL}${SEARCH_PARAMS.DEPARTMENTS}=${id}`,
    );
    console.log('items', data);
    setObjectIds(data.objectIDs);
    await getArtworks(data.objectIDs);
  }

  async function fetchData(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  function handlePageChange(e: ChangeEvent<unknown>, value: number) {
    const newPaginationValue = (value - 1) * 10;
    setPaginationValue(newPaginationValue);
    getArtworks(objectIds);
  }
  return (
    <>
      <Filter onChange={getItemsByDepartment} />
      <Button onClick={() => getItemsByDepartment('19')}>fetch</Button>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ShowArtwork artworks={artworks} />
          <div className="flex justify-center m-[1em]">
            <Pagination
              count={10}
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
