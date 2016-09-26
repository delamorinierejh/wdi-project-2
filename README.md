#Date Mate London
####An app to help plan dates in London


##Overview
This application was produced as my second project for the Web Development Immersive course at General Assembly London. 

The idea for the app came as a result of my inability to find a quick, fun and efficient way for finding new places to take my girlfriend for dates. I'd find myself writing a lot of different Google searches and reading lots of different articles trying to find a good spot.

My initial aim was to build a practical was to browse all the best data in one simple and fun app. It also seemed a good idea to suggest that the venues all be grouped in similar areas so as to make travel between the different pitstops in the date as straightforward as possible - (Nobody wants to go for a cocktail in Hackney before dinner in Peckham)

![alt text](http://imgur.com/uBn22Ac.png "Coolors")

Whilst browsing the colour scheme planning website [**Coolors**](https://coolors.co/), it occured to me that it would be both fun and useful to have a fruit-machine style display that allowed visitors to quickly search through restaurants and bars that were grouped in the same area of London. As with the Coolors site, this modal would enable the user to randomly sift through the key spots in their chosen date area, with the added functionality of locking in suitable options.

This idea would form the basis for the app as it looks today, which also has other features such as driving directions form the user's current location to the various stops on the date, as well as a side bar that provides key information about the venues such as website, ratings and average cost.

##How to use the app

#####Login / Register
![alt text](http://imgur.com/do1EV8H.png "Date Mate London Homepage")
Upon pageload - the user is asked to login or register. This step is built on JWT authentication. Once the user has logged in or registered, they are assigned a unique session token which allows them to make the API requests necessary for the application to work.


#####Plan your date
![alt text](http://imgur.com/cDrmFjm.png "Plan your date screen 1")

![alt text](http://imgur.com/ANMLngV.png "Plan your date screen 2")
Once logged into the ap, the user is presented with the first modal inviting them to 'Plan their date'. This involves choosing an agenda for the date - namely, which pitstops should be made and in what order. Up to three options can be chosen, but dinner can only be chosen once. The user can click the clear button to clear the board and start selecting the agenda from the beginning.


#####Choose location

![alt text](http://imgur.com/ho8AWuW.png "Choose your location")

Having chosen an agenda for the night, the user is then asked to pick one of 9 locations in London to go out in. I decided to restrict the number of locations that the user can pick from for two reasons:

* I was only using a public Google Places API key and therefore wanted to restrict the breadth of results being brought into my API
* The data for some non-central areas of London was more likely to be less in keeping with the aesthetic and feel of the app, making for an inferior user-experience

Once the user has selected an option, they click the 'Choose your venues', to go the fruit-machine/venue-picking modal.


#####Choose venues

![alt text](http://imgur.com/PC525N4.png "Choose your venues")

![alt text](http://imgur.com/PUpDpBN.png "Choose your venues 3 options")

With an agenda and a location chosen, the fun part of the app begins: choosing the venues. With this modal, the user is able to cycle through the various options available for different stops in the area that they have chosen for their date. As with a fruit machine, one the user has found an option they like, they can click the lock button to stop that column from randomising. 

#####Plot your date

![alt text](http://imgur.com/89k39EZ.png "Plot your date screen")

![alt text](http://imgur.com/eplM0JB.png "Plot your date screen sidebar hidden")

Once the user is happy with all the options on screen - and has locked them all in - they can click the 'Plot your date' button to see their date on a map, complete with directions. The user can also open the scrolling sidebar which features key information about each of the venues as well as links to the website of the venue (where available) to make bookings etc.

If at any point during the date planning process, the user want to run a new search, they can click the 'Date Mate London' home button in the top right hand corner of the screen to go back to the first step - 'Plan your date'.

##Planning
####Wireframing
I used the tool Balsamiq to wireframe the general appearance of the main parts of the app - namely the set up process and the map itself (complete with sidebar).

#####Plan your date
![alt text](http://imgur.com/KZ7p7qi.png "Wireframe 1")
#####Choose your venues
![alt text](http://imgur.com/aPnE2N9.png "Wireframe 2")
#####Plot your date
![alt text](http://imgur.com/wIl2Duw.png "Wireframe 3")

####API
I researched which APIs would best suit the app and quickly came to the conclusion that for restaurants Zomato had the best data. It was more of a struggle to find solid data for bars, with the result that there was going to be a signifcant gap in the amount of data aviable for restaurants and bars. Ultimately I decided to use both the Zomato and Google PLaces API and came to the decision that it would be best to serve data to the site to come from my own API. This would allow me to have more uniform data between my bars and restaurants, ultimately making the code in the front end more legible and neat.

I therefore wrote 2 seeds files - one for restaurants and one for bars. In order to make use of the useful data available acoss both the Zomato and Google Places APIs (as well as the various types of query available from both sources). Using request promise, I set up functions that would make three API requests in total. For restaurants, I first queried the Zomato API for inital properties, before updating objects with further information from two Google Places searches (a search by the name of the restaurant and then a place details search using the placeId from the previous search). A simialr search was used for bars, but rather than initially querying Zomato, I merely ran a keyword search in the Google Places API (i.e. [name of area]+cocktails+london)

Ultimately I was happy with the amount of data coming in, though with mroe time, I would certainly like to improve the approach for collecting data on bars.


##Technnology used
* HTML5
* SCSS
* jQuery
* Node.js
* Express.js
* Gulp
* Bower
* GoogleMaps API
* Google Places API
* Zomato API

