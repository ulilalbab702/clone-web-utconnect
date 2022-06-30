import React, { useEffect, useState } from "react";
import { bgFeature } from "../../assets/images";
import { MENU } from "../../constants/menu";
import "./style/style.css";
import parse from "html-react-parser";

const HomePage = (props) => {
  const [listFitur, setListFitur] = useState([]);
  const [isSeeMore, setIsSeemore] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [remainingFitur, setRemainingFitur] = useState(null);
  const [featureUrl, setFeatureUrl] = useState("");
  const [seeMore, setSeeMore] = useState(false);
  const [listNews, setListNews] = useState(props.newsHome.data.data);



  useEffect(() => {
    async function fetchFitur() {
      await props.fetchGetFiturUTConnect();
    }

    fetchFitur();
  }, []);

  useEffect(() => {
    if (props.dataFitur) {
      const fitur = props.dataFitur;
      setListFitur(fitur);
    } else {
      setListFitur([]);
    }
  }, [props.dataFitur]);

  const onMouseOverFitur = (value) => {
    let newData = listFitur.map((fitur) => {
      if (value === fitur.name) {
        return {
          ...fitur,
          ["mouseOver"]: true,
        };
      } else {
        return {
          ...fitur,
          ["mouseOver"]: false,
        };
      }
    });
    setListFitur(newData);
  };

  useEffect(() => {
    if (props.dataFitur) {
      if (props.dataFitur.length > 5) {
        setIsSeemore(true);

        const fitur = props.dataFitur.splice(0, 5);

        setListFitur(fitur);

        setRemainingFitur(props.dataFitur.splice(0, props.dataFitur.length));
      } else {
        setListFitur(props.dataFitur);

        setIsSeemore(false);
      }
    }
  }, [props.dataFitur]);
  const _handleSeeMore = () => {
    if (remainingFitur.length > 3) {
      const fitur = remainingFitur.splice(0, 3);
      fitur.forEach((f) => listFitur.push(f));
      setRemainingFitur(remainingFitur.splice(0, remainingFitur.length));
    } else {
      remainingFitur.forEach((f) => listFitur.push(f));
      setIsSeemore(false);
    }
  };

  const _handleKlikUT = (name, url) => {
    const { user } = props;
    if (name.toUpperCase().includes("KLIK")) {
      props.push(MENU.HOME);
    } else {
      if (user) {
        if (user !== "KLIK") {
          window.open(url, '_self');
        }
      } else {
        setFeatureUrl(url);
      }
    }
  }

  useEffect(() => {
    async function fetchImgSlider() {
      await props.fetchImageslider();
    }
    fetchImgSlider();
  }, []);

  const _renderImageSlider = () => {
    if (props.loadingPromo) {
      return (
        <div>loading...</div>
      )
    } else if (props.imageSlider != null) {
      return (
        <div>
          {(props.imageSlider.data || props.imageSlider).map((item, index) => {
            return (
              <div style={{ margin: '0.6rem', display: 'flex', flexDirection: 'column' }}>
                <Swiper
                  id="main"
                  slidesPerView={1.3273}
                  centeredSlides
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {(props.imageSlider.data || props.imageSlider).map((item) => {
                    return (
                      <div>
                        <img src={item.imageUrl} className="w-full h-16" />
                      </div>
                    )
                  })}
                </Swiper>
              </div>
            )
          })}
        </div>
      )
    }
  }

  const _renderPartResponsive = () => {
    if (!listFitur || listFitur?.length === 0) {
      return null;
    } else {
      return (
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center font-sans">
            <h2 className="text-3xl mt-16 font-bold">
              Fitur UT Connect
            </h2>
            <p className="font-normal text-md text-gray-500 text-center mt-2">
              Berikut adalah fitur yang dikembangkan UT Connect untuk memberikan
              <br />
              layanan terbaik bagi pelanggan United Tractors
            </p>
          </div>
          <div>
            <div className="container">
              <main className="grid justify-center items-center">
                {listFitur.map((fitur, index) => (
                  <div
                    onMouseOver={() => onMouseOverFitur(fitur.name)}
                    key={index}
                  >
                    <div
                      className={
                        fitur.mouseOver
                          ? "card-fitur-yellow"
                          : "card-fitur-blue"
                      }
                      style={
                        fitur.mouseOver
                          ? { marginTop: "3.5vw" }
                          : { marginTop: "4.5vw" }
                      }
                    >
                      <div className="flex flex-col justify-center items-center">
                        <img src={fitur.icon} className="w-auto h-24 -mt-10" />
                        <div className="text-xl font-bold mt-6">
                          <h3>{fitur.name}</h3>
                        </div>
                        <button
                          style={
                            fitur.mouseOver
                              ? { display: "" }
                              : { display: "none" }
                          }
                          className="w-36 h-10 rounded-lg bg-black text-white font-sans text-center font-semibold mt-4"
                          onClick={() => { _handleKlikUT(fitur.name, fitur.url) }}
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </main>
              <div className="flex justify-center items-center mb-8 -mt-4">
                {isSeeMore ? (
                  <button
                    className="w-48 h-8 bg-white font-semibold text-blue-500 border-blue-500 border-2 rounded-lg cursor-pointer"
                    onClick={() => _handleSeeMore()}
                  >
                    Lihat Lebih Banyak
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    async function fetchVideo() {
      await props.fetchGetAllVideo(1, 3);
    }
    fetchVideo();
  }, []);
  // useEffect(() => {
  //   if (props.videoData !== null) {
  //     if (props.videoData.length > 3) {
  //       setSeeMore(true)
  //       const vid = props.videoData.splice(0, 3)
  //       setVideoData(vid, props.videoData.data.filter((vid) => vid.status == true))
  //     } else {
  //       setVideoData(props.videoData)
  //       setSeeMore(false)
  //     }
  //   }
  // }, [props.videoData]);

  useEffect(() => {
    if (props.videoData !== null) {
      setVideoData(props.videoData.data.filter(vid => vid.status == true));
    }
  }, [props.videoData]);

  const onMouseOverVideo = (value) => {
    let newData = videoData.map((vid) => {
      if (value === vid.id) {
        return {
          ...vid,
          ["mouseOver"]: true,
        };
      } else {
        return {
          ...vid,
          ["mouseOver"]: false,
        };
      }
    });
    setVideoData(newData);
  };

  const _renderVideo = () => {
    if (!videoData || videoData?.length === 0) {
      return null;
    } else {
      return (
        <div className="container mx-auto mt-4 overflow-x-hidden">
          <div className="flex flex-col font-sans">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold">HIGHLIGHT VIDEO</h2>
              <p className="font-normal text-lg text-md text-gray-500 text-center mt-4">
                Beragam video menarik yang membahas seputar tips untuk
                <br /> unit dan lainnya
              </p>
            </div>
            <div className="xl:overflow-x-scroll lg:overflow-x-scroll md:overflow-x-scroll sm:overflow-x-scroll ml-6 lg:ml-4 md:ml-2 sm:ml-1">
              <div className="flex flex-row 3xl:justify-center 2xl:justify-center mt-16">
                {videoData.map((vid, index) => (
                  <div onMouseOver={() => onMouseOverVideo(vid.id)}
                    key={index} className="px-1 mt-2">
                    <div className={
                      vid.mouseOver
                        ? "w-80 h-72 2xl:w-64 2xl:h-60 xl:w-64 xl:h-60 rounded p-3"
                        : "w-80 h-60 2xl:w-64 2xl:h-60 xl:w-64 xl:h-60 p-3"
                    }
                      style={vid.mouseOver ? { backgroundColor: "#FFF9D9" } : null}
                    >
                      <div className="flex flex-col justify-center">
                        <img src={vid.imageThumbnailUrl} className="w-full h-auto rounded-sm" />
                        <p className="text-gray-500 text-sm mt-2">10.5 K || 3 Months Ago</p>
                        <p className="font-semibold mt-2">{vid.title}</p>
                        <div style={
                          vid.mouseOver
                            ? { display: "" }
                            : { display: "none" }
                        }>
                          <button className="w-full h-9 mt-2 font-semibold bg-black rounded-lg text-white">Putar Video</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mr-40 mt-8">
              <button className="w-28 h-6 rounded text-center text-blue-400 font-semibold bg-blue-100">Lihat Lainnya</button>
            </div>
          </div>
        </div>
      )
    }
  }

  useEffect(() => {
    async function fetchData() {
      await props.fetchListNews("", 5, 1);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (props.newsHome.data.data !== undefined) {
      setListNews(props.newsHome.data.data);
    }
  }, [props.newsHome.data.data])

  const onMouseOverNews = (value) => {
    const newData = props.newsHome.data.data.map((item) => {
      if (value === item.newsId) {
        return {
          ...item,
          ["mouseOver"]: true,
        };
      } else {
        return {
          ...item,
          ["mouseOver"]: false,
        };
      }
    });
    setListNews(newData);
  };

  const _renderListNews = () => {
    if (listNews !== undefined) {
      return (
        <div className="flex flex-col justify-center mt-16">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold">Berita &amp; Artikel</h3>
            <p className="font-normal text-lg text-md text-gray-500 text-center mt-4">Beragam artikel menarik seputar United Tractors dan lainnya</p>
          </div>
          <div className="xl:overflow-x-scroll lg:overflow-x-scroll md:overflow-x-scroll sm:overflow-x-scroll ml-6 lg:ml-4 md:ml-2 sm:ml-1">
            <div className="flex flex-row 3xl:justify-center 2xl:justify-center xl:justify-center mt-16">
              {listNews.map((item, index) => (
                <div onMouseOver={() => onMouseOverNews(item.newsId)}
                  key={index} className="px-1">
                  <div className={
                    item.mouseOver
                      ? "w-80 max-h-full h-full rounded p-4"
                      : "w-80 max-h-full h-full p-4"
                  }
                    style={item.mouseOver ? { backgroundColor: "#FFF9D9" } : null}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <img src={item.imageThumbnailUrl} className="h-40 rounded" />
                      </div>
                      <p className="text-gray-500 text-sm mt-6 font-sans">10.5 K || 3 Months Ago</p>
                      <p className="text-lg font-semibold font-sans mt-2">{item.title}</p>
                      <p className="mt-2 text-sm text-gray-600 font-sans">{parse(item.description)}</p>
                      <div className="flex items-end mt-2"
                        style={
                          item.mouseOver
                            ? { display: "" }
                            : { display: "none" }
                        }>
                        <button className="w-full h-9 mt-2 font-semibold bg-black rounded-lg text-white">Baca Selengkapnya</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div >
      )
    }
  }

  return (
    <>
      <div className="container mx-auto" style={{ marginTop: "5rem" }}>
        {/* {_renderImageSlider()} */}
        {_renderPartResponsive()}
        {/* {_renderHighlight()} */}
        {_renderVideo()}
        {_renderListNews()}
      </div>
    </>
  );
};

export default HomePage;
