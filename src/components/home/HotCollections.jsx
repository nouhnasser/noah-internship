import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function main() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setHotCollections(data);
    setIsLoading(false);
  }

  useEffect(() => {
    main();
  }, []);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width={60} height={60} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="40%" height={20} />

                    <span>
                      <Skeleton width="20%" height={20} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <ReactOwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              items={4}
              dots={false}
              responsive={{
                1200: { items: 4 },
                992: { items: 3 },
                768: { items: 2 },
                0: { items: 1 },
              }}
            >
              {hotCollections.map((hot) => (
                <div key={hot.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={hot.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={hot.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{hot.title}</h4>
                      </Link>
                      <span>ERC-{hot.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
