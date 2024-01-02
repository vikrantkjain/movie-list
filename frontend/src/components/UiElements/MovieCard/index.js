import Link from 'next/link';
import React from 'react';

function MovieCard({item}) {
  return (
    <div className='movieCard'>
      <Link href={`/editMovie?id=${item.id}`}>
        <img src={item?.movieImageUrl} className='img-fluid' alt="image" />
        </Link>
        <div className='movieCard_info'>
            <h2>{item?.title}</h2>
            <p className='mb-0'>{item?.publishingYear}</p>
        </div>
    </div>
  )
}

export default MovieCard;