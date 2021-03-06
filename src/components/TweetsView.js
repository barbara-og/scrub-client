import React, { useState, useEffect } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

function TweetsView({ toDisplay, setToDisplay }) {
  const [deleteList, setDeleteList] = useState([]);

  useEffect(() => {
    //update state with list of tweets
    fetch("http://localhost:4000/alltweets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(resJson => {
        /* use setTweetsList(resJson.tweetsList.tweets) to update*/
        if (resJson.success) {
          //setTweetsList(resJson.tweets);
          setToDisplay(resJson.tweets);
        }
      })
      .catch(err => console.log("get all tweets error", err));
  }, []);

  function onDeleteClick(event) {
    event.preventDefault();
    if (
      window.confirm(
        "Are you sure? You cannot restore tweets once they are deleted"
      )
    ) {
      //make API call to delete all the tweets whose IDs are in the deleteList array
      //alert number of tweets deleted
      //re render page not showing deleted tweets //maybe by deleting them from the in-app version of tweetsList?
      console.log("Im gonna delete these tweets:", deleteList);
      fetch("http://localhost:4000/deleteTweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ deleteList })
      }).then(res => console.log(res));
    } else {
      console.log("you wimp");
    }
  }

  function testAPI() {
    fetch("http://localhost:4000/findTweetById", {
      method: "GET"
      // mode: "no-cors"
    })
      .then(res => res.json())
      .then(resJson => console.log(resJson))
      .catch(err => console.log("ERROR:", err));
  }

  return (
    <div>
      <h2> Tweets </h2>
      <button type="submit" onClick={event => onDeleteClick(event)}>
        Delete Tweets
      </button>
      <div>
        {/* div containing all tweets */}
        {toDisplay.map(tweet => {
          // return (
          //   <div className="tweetContainer">
          //     <span>Display Name</span>
          //     <span> @ name</span>
          //     <span> date tweeted</span>
          //     <p> {tweet.full_text}</p>
          //   </div>
          // );
          return (
            <div
              style={{ display: "flex" }}
              key={toDisplay.indexOf(tweet)}
              className="tweetContainer"
            >
              {/* {console.log(String(tweet.id))} */}
              <TwitterTweetEmbed tweetId={"1164227922783277059"} />
              {/* <TwitterTweetEmbed tweetId={String(tweet.id)} /> */}
              <input
                type="checkbox"
                id={`check${toDisplay.indexOf(tweet)}`}
                value={tweet.id} //string to use as value of checkbox if it is submitted while toggled on
                onChange={event => {
                  if (!deleteList.includes(event.target.value)) {
                    deleteList.push(event.target.value);
                  } else {
                    deleteList.splice(
                      deleteList.indexOf(event.target.value),
                      1
                    );
                  }
                  console.log("delete list is now", deleteList);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TweetsView;
