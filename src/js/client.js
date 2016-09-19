const dateMate = dateMate || {};

dateMate.init = function(){
  this.setupMap();
  this.$header      = $("header");
  this.$selectionModal  = $("#selection-modal");
  this.$loginbuttons = $(".navbar ul li");
  this.$title       = $("#title");
  this.dinnerChosen = false;
  this.shownLocations = 0;
  this.numberOfVenues = 0;
  this.fruitless = true;
  this.colOneUnfixed = false;
  this.colTwoUnfixed = false;
  this.colThreeUnfixed = false;
  this.markers        = [];
  this.latLngArray    = [];
  this.sideBarOut     = false;
  this.infoForVenues = '';
  $(".stageOne").hide();
  $(".stageTwo").hide();
  $(".stageThree").hide();
  $("#selection-modal").on("click", ".options-buttons", this.optionClicked);
  $("body").on("click", "#proceed", this.chooseLocation.bind(this));
  $("body").on("click", "#randomise", this.randomise.bind(this));
  $("body").on("click", "#plot-your-date", this.plotIt.bind(this));
  $("body").on("click", ".register", this.register.bind(this));
  $("body").on("click",".login", this.login.bind(this));
  $("body").on("click", ".location-buttons", this.locationPicked);
  $("body").on("click", ".lock", this.lockThis);
  $("body").on("click", "#home-button", this.resetThePage.bind(this));
  $("header").on("click", "#logout", this.refresh);
  $(".sidebar").on("click", "#expand", this.toggleSlide);
  this.apiUrl = "http://localhost:3000/api";
  $("body").on("submit", "form", this.handleForm);
  this.$loginmodal  = $("#login-modal");
  this.setUpLogin.bind(this)();
};

dateMate.toggleSlide = function(){
  $(".sidebar").toggleClass("expanded");
  if(dateMate.sideBarOut){
    $("#expand").attr("src", "/images/expand-right.png");
    $(".side-box").fadeOut(500);
  } else {
    $("#expand").attr("src", "/images/collapse-left.png");
    $(".side-box").fadeIn(500);
  }
  dateMate.sideBarOut = !dateMate.sideBarOut;
};

dateMate.refresh = function(){
  location.reload();
};

dateMate.resetThePage = function(){
  $("#map-canvas").empty();
  this.setupMap();
  this.dinnerChosen = false;
  this.numberOfVenues = 0;
  this.shownLocations = 0;
  this.fruitless = true;
  this.colOneUnfixed = false;
  this.colTwoUnfixed = false;
  this.colThreeUnfixed = false;
  this.markers        = [];
  this.latLngArray    = [];
  this.clearChoices();
  this.chosenLocation = undefined;
  $("#venues-ul").fadeOut(400);
  this.timeToPlot = false;
  this.firstStop = undefined;
  this.secondStop = undefined;
  this.thirdStop = undefined;
  this.infoForVenues = '';
  $(".venue-details").empty();
  $(".stageOne").hide();
  $(".stageTwo").hide();
  $(".stageThree").hide();
  // this.toggleSlide();
  $("#fruit-modal").hide();
  $("#location-modal").hide();
  $("#selection-modal").hide();
  window.setTimeout(() => {$("#selection-modal").fadeIn(800);}, 200);
  $("#plot").hide();
  $("#proceed").hide();
  $("#proceedTwo").hide();
  $("#randomise").text("Keep looking");
  $(".stageOne").fadeIn(200);
  $(".sidebar").fadeOut("200").removeClass("expanded");
  this.sideBarOut = false;
  $("#expand").attr("src", "/images/expand-right.png");
};

dateMate.optionClicked = function(){
  switch(this.id){
    case "dinner":
    dateMate.addDinnerChoice();
    break;
    case "drinks":
    dateMate.addDrinksChoice();
    break;
    case "clear":
    dateMate.clearChoices();
  }
};

dateMate.addDinnerChoice = function(){
  if (!dateMate.dinnerChosen){
    dateMate.dinnerChosen = !dateMate.dinnerChosen;
    if($("#cbOne").attr("empty")) {
      $("#cbOne").css({"background-image" : "url('../images/dinner-button-large.jpg')", "border-style" : "solid"});
      $("#cbOne").attr("choice", "dinner");
      $("#cbOne").removeAttr("empty");
      $("#cbTwo").show(200);
      $("#selection-header").text("Then..?");
      $("#proceed").fadeIn(400);
      dateMate.numberOfVenues = 1;
      dateMate.choice1 = "Dinner";
    } else if ($("#cbTwo").attr("empty")){
      $("#cbTwo").css({"background-image" : "url('../images/dinner-button-large.jpg')", "border-style" : "solid"});
      $("#cbTwo").attr("choice", "dinner");
      $("#cbTwo").removeAttr("empty");
      $("#cbThree").show(200);
      $("#selection-header").text("and finally..?");
      dateMate.numberOfVenues = 2;
      dateMate.choice2 = "Dinner";
    } else if ($("#cbThree").attr("empty")){
      $("#cbThree").css({"background-image" : "url('../images/dinner-button-large.jpg')", "border-style" : "solid"});
      $("#cbThree").attr("choice", "dinner");
      $("#cbThree").removeAttr("empty");
      $("#selection-header").text("Date Mate London");
      dateMate.numberOfVenues = 3;
      dateMate.choice3 = "Dinner";
    }
  } else {
    $("#selection-header").text("Two dinners..?");
  }
};

dateMate.addDrinksChoice = function(){
  if($("#cbOne").attr("empty")) {
    $("#cbOne").css({"background-image" : "url('../images/drinks-button-large.jpg')", "border-style" : "solid"});
    $("#cbOne").attr("choice", "drinks");
    $("#cbOne").removeAttr("empty");
    $("#cbTwo").show(200);
    $("#selection-header").text("Then..?");
    $("#proceed").fadeIn(400);
    dateMate.numberOfVenues = 1;
    dateMate.choice1 = "Drinks";
  } else if ($("#cbTwo").attr("empty")){
    $("#cbTwo").css({"background-image" : "url('../images/drinks-button-large.jpg')", "border-style" : "solid"});
    $("#cbTwo").attr("choice", "drinks");
    $("#cbTwo").removeAttr("empty");
    $("#cbThree").show(200);
    $("#selection-header").text("and finally..?");
    dateMate.numberOfVenues = 2;
    dateMate.choice2 = "Drinks";
  } else if ($("#cbThree").attr("empty")){
    $("#cbThree").css({"background-image" : "url('../images/drinks-button-large.jpg')", "border-style" : "solid"});
    $("#cbThree").attr("choice", "drinks");
    $("#cbThree").removeAttr("empty");
    $("#selection-header").text("Date Mate London");
    dateMate.numberOfVenues = 3;
    dateMate.choice3 = "Drinks";
  }
};

dateMate.clearChoices = function(){
  dateMate.numberOfVenues = 0;
  dateMate.choice1  = undefined;
  dateMate.choice2  = undefined;
  dateMate.choice3  = undefined;
  if (dateMate.dinnerChosen) dateMate.dinnerChosen = false;
  $("#cbTwo").hide(200);
  $("#cbThree").hide(200);
  $("#cbOne").attr("empty", true);
  $("#cbTwo").attr("empty", true);
  $("#cbThree").attr("empty", true);
  $("#cbOne").removeAttr("choice");
  $("#cbTwo").removeAttr("choice");
  $("#cbThree").removeAttr("choice");
  $("#cbOne").css({ "background-image" : "url('../images/question-mark-2.png')", "border-style" : "dashed"});
  $("#cbTwo").css({ "background-image" : "url('../images/question-mark-2.png')", "border-style" : "dashed"});
  $("#cbThree").css({ "background-image" : "url('../images/question-mark-2.png')", "border-style" : "dashed"});
  $("#selection-header").text("Plan your date");
  $("#proceed").fadeOut(400);
};

dateMate.chooseLocation = function(){
  $(".stageOne").fadeOut(400);
  $(".stageTwo").show();
  dateMate.getCurrentLocation();
  $("#proceed").fadeOut(400);
  $("#selection-modal").fadeOut(400);
  $("#location-modal").html(`
    <h1 id="selection-header">Choose your location</h1>
    <ul>
    <li class="location-buttons" id="brixton">Brixton</li>
    <li class="location-buttons" id="shoreditch">Shoreditch</li>
    <li class="location-buttons" id="soho">Soho</li>
    </ul>
    <ul>
    <li class="location-buttons" id="camden+town">Camden Town</li>
    <li class="location-buttons" id="covent+garden">Covent Garden</li>
    <li class="location-buttons" id="clapham">Clapham</li>
    </ul>
    <ul>
    <li class="location-buttons" id="notting+hill">Notting Hill</li>
    <li class="location-buttons" id="farringdon">Farringdon</li>
    <li class="location-buttons" id="hackney+town">Hackney Town</li>
    </ul>
    </div>
    `);
    $("#location-modal").fadeIn(400);
  };

  dateMate.locationPicked = function(){
    $("#proceedTwo").off("click", dateMate.showFruitModal);
    dateMate.chosenLocation = this.id;
    $("#proceedTwo").fadeIn(400);
    $("#proceedTwo").on("click", dateMate.showFruitModal);
    $(".location-buttons").removeClass("selected");
    $(this).toggleClass("selected");
  };

  dateMate.showFruitModal = function(){
    $(".stageThree").show();
    $(".stageTwo").fadeOut(400);
    $("#proceedTwo").hide();
    $("#proceedTwo").off("click", dateMate.showFruitModal);
    $("#location-modal").fadeOut(400);
    $("#fruit-modal").html(`
      <h1>Choose your venues</h1>
      <ul id="venues-ul">
      </ul>
      `);
      if (dateMate.fruitless){
        if (dateMate.choice1){
          document.getElementById("venues-ul").innerHTML += `
          <li class="venue-choice style-${dateMate.numberOfVenues}" id="venue-one">

          </li>
          `;
          dateMate.colOneUnfixed = true;
          dateMate.getDataForFruitMachine(dateMate.choice1, 1);
        } if (dateMate.choice2){
          document.getElementById("venues-ul").innerHTML += `
          <li class="venue-choice style-${dateMate.numberOfVenues}" id="venue-two">

          </li>
          `;
          dateMate.getDataForFruitMachine(dateMate.choice2, 2);
          dateMate.colTwoUnfixed = true;
        } if (dateMate.choice3){
          document.getElementById("venues-ul").innerHTML += `
          <li class="venue-choice style-${dateMate.numberOfVenues}" id="venue-three">

          </li>
          `;
          dateMate.getDataForFruitMachine(dateMate.choice3, 3);
          dateMate.colThreeUnfixed = true;
        }
      }
      $("#fruit-modal").fadeIn(400);
      $("#plot").fadeIn(400);
      dateMate.fruitless = false;
    };

    dateMate.getDataForFruitMachine = function(option, number){
      if (number === 1){
        if (option === "Dinner"){
          $.ajax({
            method: 'GET',
            url: `http://localhost:3000/api/restaurants/${dateMate.chosenLocation}`,
            beforeSend: dateMate.setRequestHeader.bind(dateMate)
          }).done(dateMate.updateColumn1);
        } else if (option === "Drinks"){
          $.ajax({
            method: 'GET',
            url: `http://localhost:3000/api/bars/${dateMate.chosenLocation}`,
            beforeSend: dateMate.setRequestHeader.bind(dateMate)
          }).done(dateMate.updateColumn1);
        }
      } else if (number === 2){
        if (option === "Dinner"){
          $.ajax({
            method: 'GET',
            url: `http://localhost:3000/api/restaurants/${dateMate.chosenLocation}`,
            beforeSend: dateMate.setRequestHeader.bind(dateMate)
          }).done(dateMate.updateColumn2);
        } else if (option === "Drinks"){
          $.ajax({
            method: 'GET',
            url: `http://localhost:3000/api/bars/${dateMate.chosenLocation}`,
            beforeSend: dateMate.setRequestHeader.bind(dateMate)
          }).done(dateMate.updateColumn2);
        }
      } else if (number === 3){
        if (option === "Dinner"){
          $.ajax({
            method: 'GET',
            url: `http://localhost:3000/api/restaurants/${dateMate.chosenLocation}`,
            beforeSend: dateMate.setRequestHeader.bind(dateMate)
          }).done(dateMate.updateColumn3);
        } else if (option === "Drinks"){
          $.ajax({
            method: 'GET',
            url: `http://localhost:3000/api/bars/${dateMate.chosenLocation}`,
            beforeSend: dateMate.setRequestHeader.bind(dateMate)
          }).done(dateMate.updateColumn3);
        }
      }
      $("#venues-ul").hide();
      $("#venues-ul").fadeIn(200);
      $("#randomise").fadeIn(400);
    };


    dateMate.updateColumn1 = function(data){
      if (dateMate.colOneUnfixed){
        dateMate.firstStop = data;
        if (dateMate.choice1 === "Dinner"){
          $("#venue-one").html(`
            <h2>Stop 1: ${dateMate.choice1}</h2>
            <h2 class="venue-name" id="venue-one-name">${data.restaurant.name}</h2>
            <div class="img-div" ><img src="${data.restaurant.image}"id="venue-one-img"></img></div>
            <img class="lock" id="lockone" src="../images/lock-icon.png"></img>
            `);
          } else if (dateMate.choice1 === "Drinks"){
            $("#venue-one").html(`
              <h2>Stop 1: ${dateMate.choice1}</h2>
              <h2 class="venue-name" id="venue-one-name">${data.bar.name}</h2>
              <div class="img-div" ><img src="${data.bar.image}"id="venue-one-img"></img></div>
              <img class="lock" id="lockone" src="../images/lock-icon.png"></img>
              `);
            }
          }
        };

        dateMate.updateColumn2 = function(data){
          if (dateMate.colTwoUnfixed){
            dateMate.secondStop = data;
            if (dateMate.choice2 === "Dinner"){
              $("#venue-two").html(`
                <h2>Stop 2: ${dateMate.choice2}</h2>
                <h2 class="venue-name" id="venue-two-name">${data.restaurant.name}</h2>
                <div class="img-div" ><img src="${data.restaurant.image}"id="venue-two-img"></img></div>
                <img class="lock" id="locktwo" src="../images/lock-icon.png"></img>
                `);
              } else if (dateMate.choice2 === "Drinks"){
                $("#venue-two").html(`
                  <h2>Stop 2: ${dateMate.choice2}</h2>
                  <h2 class="venue-name" id="venue-two-name">${data.bar.name}</h2>
                  <div class="img-div" ><img src="${data.bar.image}"id="venue-two-img"></img></div>
                  <img class="lock" id="locktwo" src="../images/lock-icon.png"></img>
                  `);
                }
              }
            };

            dateMate.updateColumn3 = function(data){
              if (dateMate.colThreeUnfixed){
                dateMate.thirdStop = data;
                if (dateMate.choice3 === "Dinner"){
                  $("#venue-three").html(`
                    <h2>Stop 3: ${dateMate.choice3}</h2>
                    <h2 class="venue-name" id="venue-three-name">${data.restaurant.name}</h2>
                    <div class="img-div" ><img src="${data.restaurant.image}"id="venue-three-img"></img></div>
                    <img class="lock" id="lockthree" src="../images/lock-icon.png"></img>
                    `);
                  } else if (dateMate.choice3 === "Drinks"){
                    $("#venue-three").html(`
                      <h2>Stop 3: Nightcap</h2>
                      <h2 class="venue-name" id="venue-three-name">${data.bar.name}</h2>
                      <div class="img-div" ><img src="${data.bar.image}"id="venue-three-img"></img></div>
                      <img class="lock" id="lockthree" src="../images/lock-icon.png"></img>
                      `);
                    }
                  }
                };

                dateMate.randomise = function(){
                  if (dateMate.timeToPlot){
                    dateMate.plotIt();
                  } else {
                    if (this.colOneUnfixed){this.getDataForFruitMachine(this.choice1, 1);}
                    if (this.colTwoUnfixed){this.getDataForFruitMachine(this.choice2, 2);}
                    if (this.colThreeUnfixed){this.getDataForFruitMachine(this.choice3, 3);}
                  }
                };

                dateMate.lockThis = function(){
                  if (this.id === "lockone"){
                    dateMate.colOneUnfixed = !dateMate.colOneUnfixed;
                    $(this).toggleClass("selected");
                  }
                  if (this.id === "locktwo"){
                    dateMate.colTwoUnfixed = !dateMate.colTwoUnfixed;
                    $(this).toggleClass("selected");
                  }
                  if (this.id === "lockthree"){
                    dateMate.colThreeUnfixed = !dateMate.colThreeUnfixed;
                    $(this).toggleClass("selected");
                  }
                  if (dateMate.colOneUnfixed || dateMate.colTwoUnfixed || dateMate.colThreeUnfixed){
                    $("#randomise").text("Keep looking");
                    dateMate.timeToPlot = false;
                  } else{
                    $("#randomise").text("Plot your date");
                    dateMate.timeToPlot = true;
                  }
                };

                dateMate.plotIt = function(){
                  $(".stageThree").fadeOut(400);
                  dateMate.getInfoForSideBar();
                  $("#fruit-modal").fadeOut(400);
                  $("#plot").fadeOut(400);
                  $(".sidebar").fadeIn(400);
                  setTimeout(()=>{$("#expand").fadeIn(400);}, 600);
                  dateMate.showLocation(dateMate.firstStop);
                  if (dateMate.secondStop){dateMate.showLocation(dateMate.secondStop);}
                  if (dateMate.thirdStop) {dateMate.showLocation(dateMate.thirdStop);}
                };

                dateMate.getInfoForSideBar = function(){
                  if (dateMate.choice1 === "Dinner"){
                    let hold;
                    if (dateMate.firstStop.restaurant.website){
                      hold = "Go to website";
                    } else {
                      hold = '';
                    }
                    let website = dateMate.firstStop.restaurant.website || '';
                    dateMate.infoForVenues += `
                    <div class="side-box">
                    <h2>${dateMate.choice1}</h2>
                    <h2 class="side-venue-name">${dateMate.firstStop.restaurant.name}</h2>
                    <div class="img-sidebar" ><img src="${dateMate.firstStop.restaurant.image}" id="side-one-img"></img></div>
                    <p class="sidebar-blurb" id="side-one-blurb">${dateMate.firstStop.restaurant.cuisine}</p>
                    <p class="side-address" id"address-one">${dateMate.firstStop.restaurant.address}</p>
                    <p class="rating" id="rating-one">Rating: ${dateMate.firstStop.restaurant.rating}/5</p>
                    <p class="cost" id="cost-one">Dinner for two costs £${dateMate.firstStop.restaurant.costForTwo}</p>
                    <p class="website"><a href="${website}" target="_blank">${hold}</a></p>
                    <hr>
                    </div>
                    `;} else {
                      if (dateMate.firstStop.bar.website){
                        hold = "Go to website";
                      } else {
                        hold = '';
                      }
                      let website = dateMate.firstStop.bar.website || '';
                      dateMate.infoForVenues += `
                      <div class="side-box">
                      <h2>${dateMate.choice1}</h2>
                      <h2 class="side-venue-name">${dateMate.firstStop.bar.name}</h2>
                      <div class="img-sidebar" ><img src="${dateMate.firstStop.bar.image}" id="side-one-img"></img></div>
                      <p class="side-address" id"address-one">${dateMate.firstStop.bar.address}</p>
                      <p class="rating" id="rating-one">Rating: ${dateMate.firstStop.bar.rating}/5</p>
                      <p class="website"><a href="${website}"  target="_blank">${hold}</a></p>
                      <hr>
                      </div>
                      `;
                    }
                    if (dateMate.secondStop){
                      if (dateMate.choice2 === "Dinner"){
                        if (dateMate.secondStop.restaurant.website){
                          hold = "Go to website";
                        } else {
                          hold = '';
                        }
                        let website = dateMate.secondStop.restaurant.website || '';
                        dateMate.infoForVenues += `
                        <div class="side-box">
                        <h2>${dateMate.choice2}</h2>
                        <h2 class="side-venue-name">${dateMate.secondStop.restaurant.name}</h2>
                        <div class="img-sidebar" ><img src="${dateMate.secondStop.restaurant.image}" id="side-two-img"></img></div>
                        <p class="sidebar-blurb" id="side-two-blurb">${dateMate.secondStop.restaurant.cuisine}</p>
                        <p class="side-address" id"address-two">${dateMate.secondStop.restaurant.address}</p>
                        <p class="rating" id="rating-two">Rating: ${dateMate.secondStop.restaurant.rating}/5</p>
                        <p class="cost" id="cost-two">Dinner for two costs £${dateMate.secondStop.restaurant.costForTwo}</p>
                        <p class="website"><a href="${website}"  target="_blank">${hold}</a></p>
                        <hr>
                        </div>
                        `;
                      } else {
                        if (dateMate.secondStop.bar.website){
                          hold = "Go to website";
                        } else {
                          hold = '';
                        }
                        let website = dateMate.secondStop.bar.website || '';
                        dateMate.infoForVenues += `
                        <div class="side-box">
                        <h2>${dateMate.choice2}</h2>
                        <h2 class="side-venue-name">${dateMate.secondStop.bar.name}</h2>
                        <div class="img-sidebar" ><img src="${dateMate.secondStop.bar.image}" id="side-two-img"></img></div>
                        <p class="side-address" id"address-two">${dateMate.secondStop.bar.address}</p>
                        <p class="rating" id="rating-two">Rating: ${dateMate.secondStop.bar.rating}/5</p>
                        <p class="website"><a href="${website}"  target="_blank">${hold}</a></p>
                        <hr>
                        </div>
                        `;
                      }
                    }
                    if (dateMate.thirdStop){
                      if (dateMate.choice3 === "Dinner"){
                        if (dateMate.thirdStop.restaurant.website){
                          hold = "Go to website";
                        } else {
                          hold = '';
                        }
                        let website = dateMate.thirdStop.restaurant.website || '';
                        dateMate.infoForVenues += `
                        <div class="side-box">
                        <h2>${dateMate.choice3}</h2>
                        <h2 class="side-venue-name">${dateMate.thirdStop.restaurant.name}</h2>
                        <div class="img-sidebar" ><img src="${dateMate.thirdStop.restaurant.image}" id="side-three-img"></img></div>
                        <p class="sidebar-blurb" id="side-three-blurb">${dateMate.thirdStop.restaurant.cuisine}</p>
                        <p class="side-address" id"address-three">${dateMate.thirdStop.restaurant.address}</p>
                        <p class="rating" id="rating-three">Rating: ${dateMate.thirdStop.restaurant.rating}/5</p>
                        <p class="cost" id="cost-three">Dinner for two costs £${dateMate.thirdStop.restaurant.costForTwo}</p>
                        <p class="website"><a href="${website}"  target="_blank">${hold}</a></p>
                        </div>
                        `;
                      } else {
                        if (dateMate.thirdStop.bar.website){
                          hold = "Go to website";
                        } else {
                          hold = '';
                        }
                        let website = dateMate.thirdStop.bar.website || '';
                        dateMate.infoForVenues += `
                        <div class="side-box">
                        <h2>${dateMate.choice3}</h2>
                        <h2 class="side-venue-name">${dateMate.thirdStop.bar.name}</h2>
                        <div class="img-sidebar" ><img src="${dateMate.thirdStop.bar.image}" id="side-three-img"></img></div>
                        <p class="side-address" id"address-three">${dateMate.thirdStop.bar.address}</p>
                        <p class="rating" id="rating-three">Rating: ${dateMate.thirdStop.bar.rating}/5</p>
                        <p class="website"><a href="${website}"  target="_blank">${hold}</a></p>
                        </div>
                        `;
                      }
                    }
                    $(".venue-details").html(dateMate.infoForVenues);
                  };

                  dateMate.showLocation = function(venue){
                    if(venue.restaurant){
                      // let latLngArray = [];
                      let latlng = new google.maps.LatLng(venue.restaurant.lat, venue.restaurant.lng);
                      dateMate.latLngArray.push(latlng);
                      let icon = {
                        url:        "/images/dinner-marker.png",
                      };
                      let marker = new google.maps.Marker({
                        position: latlng,
                        map : dateMate.map,
                        icon,
                        animation : google.maps.Animation.DROP
                      });
                      dateMate.markers.push(marker);
                      dateMate.addInfoWindow(venue, marker);
                    } else {
                      let latlng = new google.maps.LatLng(venue.bar.lat, venue.bar.lng);
                      dateMate.latLngArray.push(latlng);
                      let icon = {
                        url:        "/images/drinks-marker.png",
                      };
                      let marker = new google.maps.Marker({
                        position: latlng,
                        map : dateMate.map,
                        icon,
                        animation : google.maps.Animation.DROP
                      });
                      dateMate.markers.push(marker);
                      dateMate.addInfoWindow(venue, marker);
                    }
                    dateMate.shownLocations++;
                    let bounds = new google.maps.LatLngBounds();
                    for (let i = 0; i < dateMate.markers.length; i++) {
                      bounds.extend(dateMate.markers[i].getPosition());
                    }
                    if (dateMate.numberOfVenues === dateMate.shownLocations){
                      dateMate.map.fitBounds(bounds);
                      dateMate.showRoute(dateMate.shownLocations);
                    }
                  };

                  dateMate.getCurrentLocation = function() {
                    navigator.geolocation.getCurrentPosition(function(position) {
                      let here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                      let marker = new google.maps.Marker({
                        position: here,
                        map: dateMate.map,
                        // animation: google.maps.Animation.DROP,
                        icon: {
                          url: "/images/person-marker-2.png",
                          scaledSize: new google.maps.Size(56, 56)
                        }
                      });
                      dateMate.latLngArray.push(here);
                      dateMate.markers.push(marker);
                    });
                  };

                  dateMate.showRoute = function(value){
                    let directionsObject = {
                      origin: dateMate.latLngArray[0],
                      waypoints: [],
                      destination: dateMate.latLngArray[dateMate.latLngArray.length-1],
                      travelMode: google.maps.TravelMode.WALKING,
                    };
                    if (value > 1){
                      directionsObject.waypoints.push(
                        {
                          location: dateMate.latLngArray[1],
                          stopover: true
                        }
                      );
                    }
                    if (value === 3){
                      directionsObject.waypoints.push({
                        location: dateMate.latLngArray[2],
                        stopover: true
                      });
                    }
                    let dateRoute = new google.maps.DirectionsService();
                    let routeDisplayer = new google.maps.DirectionsRenderer({suppressMarkers: true});
                    routeDisplayer.setMap(dateMate.map);
                    dateRoute.route(directionsObject, function(result, status) {
                      if (status == 'OK') {
                        routeDisplayer.setDirections(result);
                      }
                    });
                  };

                  dateMate.addInfoWindow = function(venue, marker) {
                    google.maps.event.addListener(marker, 'click', () => {
                      if (typeof this.infowindow != "undefined") this.infowindow.close();
                      if (venue.restaurant){
                        this.infowindow = new google.maps.InfoWindow({
                          content: `<div class="infobox">
                          <div class="iw-title"><h3>${venue.restaurant.name}</h3></div>
                          <div class="info-box-address">
                          <p>${venue.restaurant.address}</p>
                          </div>`,
                          maxWidth: 250
                        });
                        this.infowindow.open(this.map, marker);
                        this.map.setCenter(marker.getPosition());
                        this.map.panBy(0,-50);
                      }else {
                        this.infowindow = new google.maps.InfoWindow({
                          content: `<div class="infobox">
                          <div class="iw-title"><h3>${venue.bar.name}</h3></div>
                          <div class="info-box-address">
                          <p>${venue.bar.address}</p>
                          </div>`,
                          maxWidth: 250
                        });
                        this.infowindow.open(this.map, marker);
                        this.map.setCenter(marker.getPosition());
                        this.map.panBy(0,-50);
                      }
                    });
                  };

                  dateMate.setupMap = function(){
                    let canvas = document.getElementById('map-canvas');

                    let mapOptions = {
                      zoom: 13,
                      center: new google.maps.LatLng(51.505982,-0.109221),
                      mapTypeId: google.maps.MapTypeId.ROADMAP,
                      mapTypeControl: false,
                      streetViewControl: false,
                      styles:[{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"saturation":"14"},{"lightness":"-7"},{"gamma":"1.76"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"off"},{"color":"#462323"},{"saturation":"14"},{"weight":"1.10"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
                    };
                    dateMate.map = new google.maps.Map(canvas, mapOptions);
                  };


                  dateMate.setUpLogin = function(){
                    this.$loginmodal.html(`
                      <div class="navbar">
                      <ul>
                      <li class="selected"><a class="login" href="#">Login</a></li>
                      <li class="unselected"><a class="register" href="#">Register</a></li>
                      </ul>
                      </div>
                      <div class="form-area">
                      <form method="post" action="/login">
                      <div class="form-group">
                      <input class="form-control" type="email" name="email" placeholder="Email">
                      </div>
                      <div class="form-group">
                      <input class="form-control" type="password" name="password" placeholder="Password">
                      </div>
                      <input class="form-button" type="submit" value="Login">
                      </form>
                      </div>
                      `);
                      this.$formarea    = $(".form-area");
                    };

                    dateMate.register = function() {
                      event.preventDefault();
                      dateMate.$formarea.html(`
                        <form method="post" action="/register">
                        <div class="form-group">
                        <input class="form-control" type="text" name="user[username]" placeholder="Username">
                        </div>
                        <div class="form-group">
                        <input class="form-control" type="email" name="user[email]" placeholder="Email">
                        </div>
                        <div class="form-group">
                        <input class="form-control" type="password" name="user[password]" placeholder="Password">
                        </div>
                        <div class="form-group">
                        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Confirm password">
                        </div>
                        <input class="form-button" type="submit" value="Register">
                        </form>
                        `);
                        $(".login").parent().removeClass("selected");
                        $(".register").parent().addClass("selected");
                      };

                      dateMate.login = function() {
                        event.preventDefault();

                        dateMate.$formarea.html(`
                          <form method="post" action="/login">
                          <div class="form-group">
                          <input class="form-control" type="email" name="email" placeholder="Email">
                          </div>
                          <div class="form-group">
                          <input class="form-control" type="password" name="password" placeholder="Password">
                          </div>
                          <input class="form-button" type="submit" value="Login">
                          </form>
                          `);
                          $(".register").parent().removeClass("selected");
                          $(".login").parent().addClass("selected");
                        };

                        dateMate.handleForm = function(){
                          event.preventDefault();

                          let url    = `${dateMate.apiUrl}${$(this).attr("action")}`;
                          let method = $(this).attr("method");
                          let data   = $(this).serialize();

                          return dateMate.ajaxRequest(url, method, data, (data) => {
                            if (data.token) dateMate.setToken(data.token);
                            dateMate.$loginmodal.fadeOut(400);
                            dateMate.$title.fadeOut(400);
                            // if ($(this).attr("action") === "/login"){
                            //   dateMate.$header.html(`<p>Welcome back</p>`);
                            // } else {
                            dateMate.$header.html(`
                              <h3 id="home-button">Date Mate London</h3>
                              <p id="logout">Logout</p>
                              `);
                              // }
                              dateMate.$header.show(400);
                              dateMate.$selectionModal.html(`
                                <h1 id="selection-header">Plan your date</h1>
                                <ul>
                                <li class="choice-blocks" empty=true id="cbOne"></li>
                                <li class="choice-blocks" empty=true id="cbTwo" hidden=true></li>
                                <li class="choice-blocks" empty=true id="cbThree" hidden=true></li>
                                </ul>
                                <ul>
                                <li class="options-buttons" id="dinner"></li>
                                <li class="options-buttons" id="drinks"></li>
                                <li class="options-buttons" id="clear"></li>
                                </ul>
                                `);
                                $(".stageOne").show();
                                $(".loginStage").hide();
                                dateMate.$selectionModal.fadeIn(400);
                              });
                            };

                            dateMate.ajaxRequest = function(url, method, data, callback){
                              return $.ajax({
                                url,
                                method,
                                data,
                                beforeSend: dateMate.setRequestHeader.bind(this)
                              })
                              .done(callback)
                              .fail(data => {
                                dateMate.$formarea.find(".form-control").css({"border": "2px solid #c84242", "outline": "none"});
                              });
                            };

                            dateMate.setRequestHeader = function(xhr, settings) {
                              return xhr.setRequestHeader("Authorization", `Bearer ${this.getToken()}`);
                            };

                            dateMate.setToken = function(token){
                              return window.localStorage.setItem("token", token);
                            };

                            dateMate.getToken = function(){
                              return window.localStorage.getItem("token");
                            };

                            $(dateMate.init.bind(dateMate));
