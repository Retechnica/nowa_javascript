/**
 * Nowa Javascript API example
 * 
 * This file includes a simple example implementation of calling the Nowa API to train tags and classify items with those tags.
 *
 * Requires: jQuery
 *
 * Author: Joran Kikke (@donkeyscience)
 * Date: November 2012
 *
 * ------------------------------------------------------------------------------  
 * Example training call:
 * ------------------------------------------------------------------------------  
 *  nowa.api_key = "SASDKJH86876SDJHGBG"; // Your api key
 *  
 *  text = "What is the best way to tame a unicorn?";
 *  tags = {
 *       "subject": [
 *        "animal husbandry",
 *        "taming"
 *      ],
 *      "animal_type": [
 *        "unicorns",
 *        "equine",       
 *        "rare"
 *      ]
 *    }
 * 
 *  nowa.train(text, tags)
 *
 *
 * ------------------------------------------------------------------------------  
 * Example classification call:
 * ------------------------------------------------------------------------------  
 *  nowa.api_key = "SASDKJH86876SDJHGBG"; // Your api key
 *  
 *  text = "I found something called a unicorn but I'm not sure what type of animal it is";
 *  classifications = nowa.classify(text);
 *
 *  console.log("With regards to " = classifications.subject[0]);
 *  console.log("You are most likely talking about a: " = classifications.animal_type[0]);
 *
 * ------------------------------------------------------------------------------
 */

(function( nowa, $, undefined ) {
    // SET ME! - your API key
    nowa.api_key = "YOUR_API_KEY";

    // Private internal variables
    // API Details
    var api_end_point = "www.ingeniapi.com"
    var api_version   = "1.0"
          
    // Paths
    var train_path      = api_end_point + "/train"
    var classify_path   = api_end_point + "/classify"

    /**
     * Classify this text and return any relevant tags, together with their certrainty
     * 
     * params: text - the text to classify
     * returns: response - JSON hash in the form:
     *
     * {
     *    "classification_status":"complete",
     *    "results":{
     *         "subject":{
     *             "unicorns":0.96
     *         }
     *     },
     *     "api_version":"1.0",
     *     "status":"okay"
     * }
     *
     */
    nowa.classify = function(text){
      authenticate();

      $.post(classify_path, 
        { 
          text: text,
          api_version: api_version
        },
        function(response_data)
        {
          return response_data;
        }, 
        "json");
    };

    /**
     * Train 
     * Teach now that this text is associated with the supplied tags
     * 
     * params: text - the text to train
     * params: tags - the tags relating to this text, in the form:
     *   {
     *       "subject": [
     *        "animal husbandry",
     *        "taming"
     *      ],
     *      "animal_type": [
     *        "unicorns",
     *        "rare"
     *      ]
     *    }
     *
     * returns: response - JSON hash in the form:
     *   {
     *        "api_version":"1.0",
     *        "status":"okay"
     *   }
     */
    nowa.train = function(text, tags)
    {
      authenticate();

      $.post(train_path, 
      { 
          text: text,
          tag_set: JSON.stringify(tags),
          api_version: api_version
      },
      function(data)
      {
        return data;
      }, "json");
    }

    //Private Methods
    function authenticate()
    {
      $.ajaxSetup({
        beforeSend: function (xhr)
        { 
          xhr.setRequestHeader('Authorization', make_base_auth(nowa.api_key)); 
        }
      });
    }

    function make_base_auth(token)
    {
      var tok = token + ':';
      var hash = btoa(tok);
      return "Basic " + hash;
    }

}( window.nowa = window.nowa || {}, jQuery ));












