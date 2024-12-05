import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'turn.js';
import './storybook.css';

const stories = [
  { title: "The Very Hungry Caterpillar", author: "Eric Carle", pages: [
    { text: "In the light of the moon, a little egg lay on a leaf.", illustration: "moon_and_egg.jpg" },
    { text: "One Sunday morning, the warm sun came up and - pop! - out of the egg came a tiny and very hungry caterpillar.", illustration: "caterpillar_hatched.jpg" },
    { text: "The caterpillar goes to space", illustration: "caterpillar_space.jpg" }
  ] }
];

const StorybookApp = () => {
  const [currentStory, setCurrentStory] = useState(null);
  const bookRef = useRef(null);

  useEffect(() => {
    if (currentStory) {
      $(bookRef.current).turn({
        width: 800,
        height: 600,
        autoCenter: true
      });
    }
  }, [currentStory]);

  const selectStory = (index) => {
    setCurrentStory(stories[index]);
  };

  return (
    <div className="storybook">
      {!currentStory ? (
        <div className="library">
          <h1>Select a Story</h1>
          {stories.map((story, index) => (
            <div key={index} className="story" onClick={() => selectStory(index)}>
              <h2>{story.title}</h2>
              <p>By {story.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="story-view">
          <div ref={bookRef} className="flipbook">
            {currentStory.pages.map((page, index) => (
              <div key={index} className="page">
                <img src={`/images/${page.illustration}`} alt="illustration" className="illustration" />
                <p className="text">{page.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StorybookApp;
