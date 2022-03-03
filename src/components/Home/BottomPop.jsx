import React, {useEffect, useState} from "react";
import FriendPop from './FriendPop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrin, faFaceFrown, faFaceMeh, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames";

const axios = require('axios');

export default function BottomPop(props) {

  const { mediaID } = props
  const [ watchListButton, setWatchListButton ] = useState(2);
  const [ interactionButton, setInteractionButton ] = useState('');

  const toggleLike = classNames({"like-btn-sml-clicked rating-face-popout": interactionButton === "like", "like-btn-sml": interactionButton !== "like"});
  const toggleMeh = classNames({"meh-btn-sml-clicked rating-face-popout": interactionButton === "meh", "meh-btn-sml": interactionButton !== "meh"});
  const toggleDislike = classNames({"dislike-btn-sml-clicked rating-face-popout": interactionButton === "dislike", "dislike-btn-sml": interactionButton !== "dislike"});

  const jwt = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
  }


  // Rating button
  const postMediaButtonClick = rating => {
    axios.post('/api/interactions', {rating, mediaID}, jwt)
    .then(() => setInteractionButton(rating))
    .catch((err) => console.log(err));
  };
  
  // addToWatchList
  async function addToWatchList() {
    try {
      await axios.get(`/api/addToWatchList/${mediaID}`, jwt);

      props.setRefresh(!props.refresh);
      setWatchListButton(!watchListButton);

    } catch (e) {
      console.log(e)
    }
  }

  // RemoveToWatchList
  async function removeFromWatchList() {
    try {
      await axios.get(`/api/removeFromWatchList/${mediaID}`, jwt);

      props.setRefresh(!props.refresh);
      setWatchListButton(!watchListButton);
    } catch (e) {
      console.log(e)
    }
  }

    // isInWatchList
    useEffect(() => {

      const { refresh, setRefresh } = props

      async function isInWatchList() {
        try {
          const isInWatchListData = await axios.get(`/api/isInWatchList/${mediaID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
          });

          return isInWatchListData.data.length
        } catch (e) {
          console.log(e)
        }
      }
      
      isInWatchList().then((res) => {
        setWatchListButton(res)
      })
      
      // GET interaction button data
      axios.get(`/api/media/${mediaID}/interactions/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      })
      .then((res) => {
        setInteractionButton(res.data.rating);
        setRefresh(!refresh);
      })
      .catch(e => console.log(e))

    }, [watchListButton, interactionButton, props, mediaID])
      
  return(

    <div className='flex justify-evenly bg-black min-w-[150px] min-h-[22px] max-w-[150px] max-h-[22px] overflow-visible'>
      <FriendPop mediaID={props.mediaID}/>

        {(() => {
          switch (watchListButton) {
            case 0:
              return <button className="flex items-center">
              <FontAwesomeIcon 
              title='Add to watch list' 
              className='add-to-watch-popout' 
              icon={faCirclePlus}
              onClick={() => {
                // timeout to fix double click bug
                  setTimeout(addToWatchList, 100)
                }
              }
              />
            </button>
            case 1:
              return <button className="flex items-center">
              <FontAwesomeIcon 
              title='Remove to watch list' 
              className='remove-from-watch-popout' 
              icon={faCircleMinus}
              onClick={() => {
                // timeout to fix double click bug
                  setTimeout(removeFromWatchList, 100)
                }
              }
              />
            </button>
            default:
              return <button>E</button>
          }
        })()}


      <div className='flex justify-end min-w-[60px] min-h-[22px] max-w-[60px] max-h-[22px] overflow-visible items-center'>

        <button className="flex"><FontAwesomeIcon className={toggleLike} icon={faFaceGrin} onClick={() => postMediaButtonClick('like')} /> </button>
        <button className="flex"><FontAwesomeIcon className={toggleMeh} icon={faFaceMeh} onClick={() => postMediaButtonClick('meh')} /> </button>
        <button className="flex"><FontAwesomeIcon className={toggleDislike} icon={faFaceFrown} onClick={() => postMediaButtonClick('dislike')} /> </button>

      </div>

    </div>

  )
}