const Twitter     = require('twitter');
const client      = new Twitter({
    consumer_key: 'nyUt7KByiBK7Nsakl7uU870qN',
    consumer_secret: '0ihurRQGOOoaOfEtkKkNBTsiFbCwQhXdHaapXmrt7OL96sLL66',
    access_token_key: '149378569-teGsbTggdf9m1tcYFD6ZYhXSTULODDmZxSZrJkUE',
    access_token_secret: 'QzaEBQPtWWklAmFFVdzycZV3pUbVjUOiwGgIdqxDP1gV3'
});

const pathToMovie = './example.mp4';
const mediaType   = 'video/mp4'; // `'video/mp4'` is also supported
const mediaData   = require('fs').readFileSync(pathToMovie);
const mediaSize    = require('fs').statSync(pathToMovie).size;

initUpload() // Declare that you wish to upload some media
  .then(appendUpload) // Send the data for the media
  .then(finalizeUpload) // Declare that you are done uploading chunks
  .then(mediaId => {

    console.log(mediaId)

    client.post('statuses/update', {status: 'I am a tweet', media_ids : mediaId}, function(error, tweet, response) {
        if (!error) {
          console.log(tweet);
        }

        console.log(error)
      });

    // You now have an uploaded movie/animated gif
    // that you can reference in Tweets, e.g. `update/statuses`
    // will take a `mediaIds` param.
  });

  /**
   * Step 1 of 3: Initialize a media upload
   * @return Promise resolving to String mediaId
   */
  function initUpload () {
    return makePost('media/upload.json', {
      command    : 'INIT',
      total_bytes: mediaSize,
      media_category:'tweet_video'||'amplify_video'|| "",
      media_type : mediaType,
    }).then(data => data.media_id_string).catch(err => console.log("initerror",err));
  }

  /**
   * Step 2 of 3: Append file chunk
   * @param String mediaId    Reference to media object being uploaded
   * @return Promise resolving to String mediaId (for chaining)
   */
  function appendUpload (mediaId) {
    return makePost('media/upload.json', {
      command      : 'APPEND',
      media_id     : mediaId,
      media        : mediaData,
      segment_index: 0
    }).then(data => mediaId).catch(err => console.log("appenderror",err));
  }

  /**
   * Step 3 of 3: Finalize upload
   * @param String mediaId   Reference to media
   * @return Promise resolving to mediaId (for chaining)
   */
  function finalizeUpload (mediaId) {
    return makePost('media/upload.json', {
      command : 'FINALIZE',
      media_id: mediaId
    }).then(data => mediaId).catch(err => console.log("finalerror",err));
  }

  /**
   * (Utility function) Send a POST request to the Twitter API
   * @param String endpoint  e.g. 'statuses/upload'
   * @param Object params    Params object to send
   * @return Promise         Rejects if response is error
   */
  function makePost (endpoint, params) {
    return new Promise((resolve, reject) => {
      client.post(endpoint, params, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }