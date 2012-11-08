Nowa API - Javascript
=====================
This is an example implimentation of an API layer for use with the Nowa classification engine


Setup
-----
1. Get an API key from Nowa [here](http://ingeniapi.com/)
2. Download the nowa.js file and include it on your page/app

  `<script type="text/javascript" src="nowa.js">`


Train Example
-------------
        
    nowa.api_key = "SASDKJH86876SDJHGBG"; // Your Ingenia api key
       
    text = "What is the best way to tame a unicorn?";
    tags = {
        "subject": [
         "animal husbandry",
         "taming"
       ],
       "animal_type": [
         "unicorns",
         "equine",       
         "rare"
       ]
     }

    nowa.train(text, tags, success, failure)

    function success(response)
    { alert('Trained!'); }

    function failure()
    { alert('Network problem!'); }
    



Classify Example
----------------

    nowa.api_key = "SASDKJH86876SDJHGBG"; // Your Ingenia api key
       
    text = "I found something called a unicorn but I'm not sure what type of animal it is";
    nowa.classify(text, success, failure);

    function success(classifications)
    {
     console.log("With regards to " = classifications.subject[0]);
     console.log("You are most likely talking about a: " = classifications.animal_type[0]);
    }
    function failure()
    { alert('Network problem!'); }
