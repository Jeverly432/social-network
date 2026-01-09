import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import styles from "./Stories.module.scss"
import { dataStories } from './Stories.data';
import { Story } from './Story/Story.component';
import { ActionSlider, AddStory } from '@shared/assets';
import Avatar from "@shared/assets/images/ui/avatar.png"
import cn from 'classnames';

export const Stories = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigation = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiper = (swiper: SwiperType) => {
    updateNavigation(swiper);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    updateNavigation(swiper);
  };

  const handleReachEnd = () => {
    setIsEnd(true);
    setIsBeginning(false);
  };

  const handleReachBeginning = () => {
    setIsBeginning(true);
    setIsEnd(false);
  };

  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={6.95}
        watchSlidesProgress={true}
        navigation={{
          nextEl: `.${styles.nextButton}`,
          prevEl: `.${styles.prevButton}`,
        }}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        onReachEnd={handleReachEnd}
        onReachBeginning={handleReachBeginning}
      >
        <SwiperSlide key="add-story">
          <Story icon={<AddStory />} title='Story' isWatched={false} ava={Avatar} titleClassName={styles.titleCustom} />
        </SwiperSlide>
        {dataStories.map((story, index) => (
          <SwiperSlide key={index}>
            <Story {...story} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={cn(styles.prevButton, isBeginning && styles.hidden)} aria-label="Previous slide">
        <ActionSlider />
      </div>
      <div className={cn(styles.nextButton, isEnd && styles.hidden)} aria-label="Next slide">
        <ActionSlider />
      </div>
    </div>
  )
}