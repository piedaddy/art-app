'use-client';

import { useState } from 'react';
import Image from 'next/image';

import { ArtworkType } from '@/app/@types';
import { RATING_LABELS } from '@/app/lib/constants';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';

function ArtistsLifeInfo({ artwork }: { artwork: ArtworkType }) {
  return (
    <>
      <h3 className="font-bold mt-[.8em]">
        {artwork.artistBeginDate}
        {artwork.artistEndDate && `-${artwork.artistEndDate}`}
      </h3>
      <p>{artwork.artistNationality}</p>
    </>
  );
}

export default function Page({ artwork }: { artwork: ArtworkType }) {
  const [shouldShowBio, setShouldShowBio] = useState(false);
  const [value, setValue] = useState<number | null>(3.5);
  const [hover, setHover] = useState(-1);

  function handleShouldShowBio() {
    setShouldShowBio(!shouldShowBio);
  }

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${RATING_LABELS[value]}`;
  }

  return (
    <div className="flex flex-col items-center p-[30px] w-lg m-[5em] min-h-90 rounded-md light-sage">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl">
          {artwork.title ? artwork.title : artwork.objectName}
        </h2>
        <h2 className="font-bold font-light text-2xl italic">
          {artwork.objectDate}
        </h2>
        <div className="flex">
          <h3 className="text-xl">{artwork.artistDisplayName}</h3>
          {artwork.artistBeginDate && (
            <InfoIcon
              className="pl-[3px]"
              sx={{ fontSize: 15 }}
              onClick={handleShouldShowBio}
            />
          )}
        </div>
        {shouldShowBio && <ArtistsLifeInfo artwork={artwork} />}
      </div>
      <div className="p-[30px] pb-px">
        <Image
          src={artwork.primaryImageSmall}
          alt={artwork.title ? artwork.title : artwork.objectName}
          width={800}
          height={800}
          style={{ width: '600px', height: 'auto' }}
        />
      </div>

      <div className="flex flex-col items-center text-lg italic mt-px">
        <p>{artwork.medium}</p>

        <div className="flex flex-col items-center p-[1em]">
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>
              {RATING_LABELS[hover !== -1 ? hover : value]}
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
