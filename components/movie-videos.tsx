"use client";

import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react";
import { API_URL } from "../app/constants";
import styles from "../styles/movie-video.module.css";

async function getVideos(id) {
  console.log(`Fetching Videos: ${Date.now()}`);
  const response = await fetch(`${API_URL}/${id}/videos`);
  if (!response.ok) {
    throw new Error("네트워크 응답이 정상적이지 않습니다.");
  }
  return response.json();
}

export default function MovieVideos({ id }) {
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loadCount = 10; 


  const prevScrollYRef = useRef(0);

  useEffect(() => {
    getVideos(id)
      .then((data) => {
        setAllVideos(data);
        setDisplayedVideos(data.slice(0, loadCount));
        setCurrentIndex(loadCount);
      })
      .catch((error) => console.error("Error loading videos:", error));
  }, [id]);

  // Function to load more videos
  const loadMore = () => {
    if (currentIndex >= allVideos.length) return;

    // Save the current scroll position before state update
    prevScrollYRef.current = window.scrollY;

    const newIndex = Math.min(currentIndex + loadCount, allVideos.length);
    setDisplayedVideos(allVideos.slice(0, newIndex));
    setCurrentIndex(newIndex);
  };

  // IntersectionObserver to trigger loadMore when the last video comes into view
  const observer = useRef(null);
  const lastVideoRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentIndex < allVideos.length) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [currentIndex, allVideos]
  );

  useLayoutEffect(() => {
    window.scrollTo(0, prevScrollYRef.current);
  }, [displayedVideos]);

  return (
    <div className={styles.container}>
      {displayedVideos.map((video, index) => {
        if (index === displayedVideos.length - 1) {
          return (
            <iframe
              ref={lastVideoRef}
              key={video.id}
              src={`https://youtube.com/embed/${video.key}`}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          );
        }
        return (
          <iframe
            key={video.id}
            src={`https://youtube.com/embed/${video.key}`}
            title={video.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      })}
    </div>
  );
}
