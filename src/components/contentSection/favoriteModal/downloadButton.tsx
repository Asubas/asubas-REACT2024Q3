import './favoriteModal.scss';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { IDogItem } from '../../../interfaces/dogInterface';
import { useState } from 'react';
import downloadSvg from '../../../../src/assets/paw.svg';
import { RootState } from '../../../app/store';

function DownloadButton() {
  const favoriteDogsArray = useSelector((state: RootState) => state.favorite);
  const [url, setUrl] = useState('');

  const handleDownload = () => {
    const csvData = generateCSVData(favoriteDogsArray.initFavoriteArr);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    setUrl(URL.createObjectURL(blob));
  };

  const generateCSVData = (data: IDogItem[]) => {
    const headers = ['Thank you for download! Good luck to study!!'];
    const rows = data.map((item) => [
      `Name dog  : ${item.breeds[0].name}`,
      ` Distinctive traits for the current breed  : ${item.breeds[0].bred_for}`,
      ` Height  : ${item.breeds[0].height.imperial}`,
      ` Weight  : ${item.breeds[0].weight.imperial}`,
      ` Life expectancy  : ${item.breeds[0].life_span}`,
      ` Temperament  : ${item.breeds[0].temperament}`,
      ` Accompanying picture  : ${encodeURIComponent(item.url)}`,
      ' The good boy/girl??? :    yeeees :3',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n') + '\n';

    return csvContent;
  };

  return (
    <>
      <a href={url} download={`${favoriteDogsArray.initFavoriteArr.length}-cute-dog.csv`}>
        <button className="favorite-modal_button-download" type="button" onClick={handleDownload}>
          Download
          <Image
            className="favorite-modal_button-download_svg"
            src={downloadSvg.src}
            alt="dog svg"
          />
        </button>
      </a>
    </>
  );
}

export { DownloadButton };
