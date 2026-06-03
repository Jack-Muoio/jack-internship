import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemsCarousel = ({ items }) => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

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

  return (
    <div className="col-lg-12" style={{ position: "relative" }}>
      <div ref={sliderRef} className="keen-slider">
        {items.map((item, index) => (
          <div
            className="keen-slider__slide"
            key={item.id || index}
            style={{ overflow: "visible" }}
          >
            <div className="nft__item" style={{ width: "100%", margin: 0 }}>
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              
              <CountdownTimer expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
                      <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
                      <a href=""><i className="fa fa-envelope fa-lg"></i></a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
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
          boxShadow: isLeftHovered ? "0px 6px 14px rgba(0, 0, 0, 0.25)" : "0px 4px 8px rgba(0,0,0,0.1)",
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
          boxShadow: isRightHovered ? "0px 6px 14px rgba(0, 0, 0, 0.25)" : "0px 4px 8px rgba(0,0,0,0.1)",
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
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade" data-aos-delay="150" data-aos-duration="1000">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          {loading ? (
            <div className="col-lg-12">
              <div className="row" style={{ display: "flex", gap: "10px", flexWrap: "nowrap", overflow: "hidden" }}>
                {new Array(4).fill(0).map((_, index) => (
                  <div style={{ flex: "1 0 23%" }} key={index}>
                    <div className="nft__item" style={{ width: "100%", margin: 0 }}>
                      <div className="author_list_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </div>
                      <div className="de_countdown">
                        <Skeleton width="60px" height="15px" />
                      </div>
                      <div className="nft__item_wrap" style={{ height: "200px" }}>
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className="nft__item_info">
                        <h4><Skeleton width="100px" height="20px" /></h4>
                        <div className="nft__item_price"><Skeleton width="50px" height="15px" /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ItemsCarousel items={items} />
          )}

        </div>
      </div>
    </section>
  );
};

export default NewItems;