import Image from 'next/image'
import { addBlogs, getBlogposts, getDocumentById, myfunction } from '@/firebase'
import { useEffect, useState} from 'react';
import styles from '@/styles/home.module.css'
import Head from 'next/head';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function Carousel({ data }) {
  const [slides, setSlides] = useState([]);
  const [titles, setTitles] = useState([]);
  const [links, setLinks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideData = [];
    const titleData = [];
    const linkData = [];

    // use data to set slideData, titleData, and linkData arrays
    if (data !== undefined) {
      for (let i = 0; i < data.length; i++) {
        slideData.push({ url: data[i].Image });
        titleData.push({ title: data[i].Title });
        linkData.push({ link: data[i].Link });
      }

      setSlides(slideData);
      setTitles(titleData);
      setLinks(linkData);
    }
  }, [data]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto lg:w-3/4">
      <a href={links[currentIndex].link !== '' ? links[currentIndex].link : ''} target="_blank" rel="noreferrer">
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
          }}
          className="h-[400px] rounded-2xl bg-center bg-cover duration-500 mx-4 mt-6 flex items-end justify-center lg:min-h-[600px]"
        >
          <p className="text-white text-center  rounded-b-2xl py-2 w-full font-bold text-2xl">
            {titles[currentIndex].title}
          </p>
        </div>
      </a>
      <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-slate-500 transition ease-out">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-slate-500 transition ease-out">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            {/* <RxDotFilled /> */}
          </div>
        ))}
      </div>
    </div>
  );
}



export default function Home() {
  const carouselData = [
    {
      Image: '/pexels-francesco-ungaro-1525041.jpg',
      Title: "Escape into nature's embrace",
    },
    {
      Image: '/pexels-andrea-piacquadio-3865557.jpg',
      Title: 'Unity in Diversity: Stories that Bind Us.',
    },
    {
      Image: '/pexels-rachel-claire-4997819.jpg',
      Title: 'Where Ideas Take Flight and Dreams are Built.',
    }
  ];

  return (
    <>
      <Head>
        <title>BlogBurst</title>
      </Head>
      <div className={styles.container}>

      <div className={`${styles.section} ${styles.welcomeSection}`}>
        <h1 className={styles.title}>Welcome to <span className={styles.mainText}>BlogBurst</span>!</h1>
        <p className={styles.subtitle}>Dive into the world of <span className={styles.secondaryText}>stories</span>, <span className={styles.secondaryText}>experiences</span>, and <span className={styles.secondaryText}>ideas</span>.</p>
      </div>

      <Carousel data={carouselData}  />

          {/* <footer className={`${styles.section} ${styles.footer}`}>
              <p className={styles.footerText}>BlogBurst - Where your thoughts come alive.</p>
          </footer> */}
    </div>
    </>
);
}