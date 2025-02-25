import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [loading, setLoading] = useState(false);
  const [topSellers, setTopSellers] = useState([]);

  async function fetchTopSellers() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2  data-aos="fade-in"
                 data-aos-duration="1200"
                 data-aos-delay="200"
                 data-aos-offset="200">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list"  data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-offset="200"
            data-aos-once="true">
              {loading &&
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <a href="/">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </a>
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="100px" height="20px" />
                      <span>
                        <Skeleton width="40px" height="20px" />
                      </span>
                    </div>
                  </li>
                ))}

              {!loading &&
                topSellers &&
                topSellers.map((sellers) => (
                  <li key={sellers.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${sellers.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={sellers.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${sellers.authorId}`}>
                        {sellers.authorName}
                      </Link>
                      <span>{sellers.price} ETH</span>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
