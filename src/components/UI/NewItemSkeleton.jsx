import React from 'react'

const NewItemSkeleton = () => {
  return (
    <div className="nft__item">
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
      <i className="fa fa-check"></i>
    </div>

    <div className="nft__item_wrap">
      <a href="" target="_blank" rel="noreferrer">
        <Skeleton width="100%" height="350px" />
      </a>
    </div>

    <div className="nft__item_info">
      <Skeleton width="180px" height="30px" />
      <br />
      <Skeleton width="100px" height="20px" />
    </div>
    <div className="nft__item_like">
      <Skeleton width="30px" height="15px" />
    </div>
  </div>
  )
}

export default NewItemSkeleton