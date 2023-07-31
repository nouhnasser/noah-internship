import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemSkeleton from "../UI/ItemSkeleton";
import NewCardItem from "../UI/NewCardItem";

const ExploreItems = () => {
  const [loading, setLoading] = useState(false);
  const [exploreItems, setExploreItems] = useState([]);
  const [displayedItemsNum, setDisplayedItemsNum] = useState(8);

  async function fetchExplore() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreItems(data);
      console.log("data at ExploreItems", data);
    } finally {
      setLoading(false);
    }
  }

  async function filterItems(filter) {
    if (filter === "price_low_to_high") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
      setExploreItems(data);
    }  if (filter === "price_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
      setExploreItems(data);
    }  if (filter === "likes_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
      setExploreItems(data);
    }
  }

  function loadMore() {
    if (exploreItems.length > displayedItemsNum) {
      setDisplayedItemsNum((prevNum) => prevNum + 4);
    }
  }

  useEffect(() => {
    fetchExplore();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading &&
        new Array(8).fill(0).map((_, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <ItemSkeleton />
          </div>
        ))}

      {!loading &&
        exploreItems.slice(0, displayedItemsNum).map((item) => (
          <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <NewCardItem nft={item} />
          </div>
        ))}

      {exploreItems.length > displayedItemsNum && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;