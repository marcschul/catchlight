import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";

const axios = require('axios');

export default function FriendRecommendations(props) {

  const [mediaData, setMediaData] = useState([]);
  
  useEffect(() => {

    async function getMedia() {
      try {
        const mediaFriendsInteractions = await axios.get('/api/mediaFriendsRecommendations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        });
        // console.log(mediaFriendsInteractions.data);
        const media = await axios.get('/api/media', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        });

        const mediaIDs = [];

        for (const friend of mediaFriendsInteractions.data) {
          for (const interaction of friend.interactions) {
            if (!mediaIDs.includes(interaction.media_id)) {
              mediaIDs.push(interaction.media_id);
            }
          }
        }

        const mediaArray = [];

        for (const mediaData of media.data) {
          if (mediaIDs.includes(mediaData.id)) {
            mediaArray.push(mediaData)
          }
          // console.log(mediaArray);
        }

        return mediaArray;
      } catch (err) {
        console.log(err);
      }
    };



    getMedia().then((res) => {
      setMediaData(res);
    });
  }, []);
  
  return (
      <CardContainer
        mediaData={mediaData}
      >
        {props.children}
      </CardContainer>
  );
};
