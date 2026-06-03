import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 1000px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 480px)": { slides: { perView: 1, spacing: 10 } },
    },
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [collections, loading, instanceRef]);

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
          <div className="col-lg-12" style={{ position: "relative" }}>
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div
                      className="keen-slider__slide"
                      key={index}
                      style={{ overflow: "visible" }}
                    >
                      <div
                        className="nft_coll"
                        style={{ width: "100%", margin: 0 }}
                      >
                        <div className="nft_wrap" style={{ height: "200px" }}>
                          <Skeleton width="100%" height="100%" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="60px" height="60px" borderRadius="50%" border="solid 5px #ffffff" />
                        </div>
                        <div className="nft_coll_info">
                          <h4>
                            <Skeleton width="100px" height="20px" />
                          </h4>
                          <span>
                            <Skeleton width="50px" height="20px" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                : collections.map((collection, index) => (
                    <div
                      className="keen-slider__slide"
                      key={collection.id || index}
                      style={{ overflow: "visible" }}
                    >
                      <div
                        className="nft_coll"
                        style={{ width: "100%", margin: 0 }}
                      >
                        <div
                          className="nft_wrap"
                          style={{
                            height: "auto",
                            minHeight: "0px",
                            maxHeight: "none",
                            display: "block",
                            overflow: "hidden",
                          }}
                        >
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt=""
                              style={{
                                display: "block",
                                width: "100%",
                                height: "auto",
                              }}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <button
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
              onClick={() => instanceRef.current?.prev()}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: `translate(-50%, -50%) ${isLeftHovered ? "scale(1.12)" : "scale(1)"}`,
                transition: "all 0.25s ease-in-out",
                zIndex: 10,
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                border: isLeftHovered ? "1px solid #a0a0a0" : "1px solid #ccc",
                backgroundColor: "#fff",
                boxShadow: isLeftHovered
                  ? "0px 6px 14px rgba(0, 0, 0, 0.3)"
                  : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
              }}
            >
              &#10094;
            </button>
            <button
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => setIsRightHovered(false)}
              onClick={() => instanceRef.current?.next()}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: `translate(50%, -50%) ${isRightHovered ? "scale(1.12)" : "scale(1)"}`,
                transition: "all 0.25s ease-in-out",
                zIndex: 10,
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                border: isRightHovered ? "1px solid #a0a0a0" : "1px solid #ccc",
                backgroundColor: "#fff",
                boxShadow: isRightHovered
                  ? "0px 6px 14px rgba(0, 0, 0, 0.3)"
                  : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
              }}
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
