class Game {
  constructor(){  }

  /*This function will read the gameState from DB and 
  assign it to gameState variable*/
  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data)
                            {
                              gameState = data.val();
                            }
                   )
  }

  /*This function will update the gameState from code and 
  assign it back to gameState node in the DB*/
 
  update(state)
  {
    database.ref('/').update(
                              {
                                gameState: state
                              }
                            );
  }

  /*Whenever new browser is opened up for game function setup from 
    sketch.js is called. From there this stat() function gets called */
  async start()
  {
  /*If gameState is 0 i.e. not all 4 players have joined, 
  then create new player object, 
  new form object to display to new player */
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        plCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];
  }

  play()
  {
    form.hide_details();
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined)
    {
         
      //index of the CARS array
      var index = 0;

      //x and y position of the cars
      var x = 160;
      var y;

      for(var plr in allPlayers)
      {
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index)
        {
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distance +=10
      player.update();
    }

    
    drawSprites();
  }

 
}