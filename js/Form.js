class Form {
    constructor() {
      //Create HTML design elements
      this.input = createInput("Name");
      this.button = createButton('Play');
      this.greeting = createElement('h3');
      this.title = createElement('h2');
    }
    /* hide_details function will hide form fields*/ 
    hide_details()
    {
      this.input.hide();
      this.greeting.hide();
      this.button.hide();
    }
    display(){
      this.title.html("Car Racing Game");
      this.title.position(displayWidth/2 - 50, 0);
              
      this.input.position(displayWidth/2 - 40, displayHeight/2 - 80);
      this.button.position(displayWidth/2 + 30, displayHeight/2);
  
      /*When user clicks on play button, the name which he had entered will
      be read into player.name, player count will increment by 1
      whatever is player's count that will be assigned as player index
      after that player's name and distance will get updated back into the DB */
      this.button.mousePressed(()=>
      {
        this.input.hide();
        this.button.hide();
        
        player.name = this.input.value();
        plCount+=1;
        
        player.index = plCount;
        
        player.update();
        player.updateCount(plCount);
        
        this.greeting.html("Hello " + player.name ) 
        this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      });
  
    }
  }