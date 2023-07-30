import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [loading, setLoading] = useState(false);
  const [newItems, setNewItems] = useState([]);

  async function fetchNewItems() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading && (
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
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" />
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
                </div>
              ))}
            </ReactOwlCarousel>
          )}

          {!loading && (
            <ReactOwlCarousel
              className="owl-theme"
              loop
              margin={8}
              nav
              items={4}
              dots={false}
              responsive={{
                0: {
                  items: 1,
                },
                576: {
                  items: 1,
                },
                768: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {newItems &&
                newItems.map((newNFT) => {
                  return (
                    <div key={newNFT.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${newNFT.authorId}`}>
                            <img
                              className="lazy"
                              src={newNFT.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <Countdown nftInfo={newNFT} />

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${newNFT.nftId}`}>
                            <img
                              src={newNFT.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{newNFT.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {newNFT.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{newNFT.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
