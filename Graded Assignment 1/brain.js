const prompts = require("prompts");

let RoomNo=0;
let continueGame = true;
let RatStatus=true;
let DragonStatus=true;

class Room {
  constructor(roomcount) {
    this.roomcount = roomcount;
  }
}

class Player {
  constructor(hitpoints, attackdamagepts, chance) {
    this.hitpoints = hitpoints;
    this.attackdamagepts = attackdamagepts;
    this.chance = chance;
   
  }

  async MoveBetweenRooms() {
    // Example set of UI options for the user to select
    if (RoomNo == 0) {
      const initialActionChoices = [
          { title: "Entrance", value: "Entrance" },
      ];
      const response = await prompts({
          type: "select",
          name: "value",
          message: "Choose your action",
          choices: initialActionChoices
        });
    
        switch(response.value) {
            case "Entrance":
             RoomNo++;
             console.log("You Are In The Entrance");
             
             break;
          }
          gameLoop();
      return;
  }
 

  if (RoomNo == 1) {
    const initialActionChoices = [
      { title: "Entrance", value: "Entrance" },
      { title: "Hallway", value: "Hallway" },
    ];

    const response = await prompts({
      type: "select",
      name: "value",
      message: "Choose your action",
      choices: initialActionChoices,
    });

    switch (response.value) {
      case "Hallway":
        SewerRat.Attack();
        RoomNo++;
        break;
    }
    gameLoop();
    return;
  }
  if (RoomNo == 2) {
    const initialActionChoices = [
      { title: "Entrance", value: "Entrance" },
      { title: "Hallway", value: "Hallway" },
      { title: "Chamber", value: "Chamber" },
    ];

    const response = await prompts({
      type: "select",
      name: "value",
      message: "Choose your action",
      choices: initialActionChoices,
    });

    switch (response.value) {
      case "Entrance":
        RoomNo--;
        SewerRat.Attack();

        break;
      case "Chamber":
        GiantDragon.Attack();
        RoomNo++;
        break;
    }
    gameLoop();
    return;
  }

  if (RoomNo == 3) {
    const initialActionChoices = [
      { title: "Entrance", value: "Entrance" },
      { title: "Hallway", value: "Hallway" },
      { title: "Chamber", value: "Chamber" },
      { title: "Portal", value: "Portal" },
    ];

    const response = await prompts({
      type: "select",
      name: "value",
      message: "Choose your action",
      choices: initialActionChoices,
    });

    switch (response.value) {
      case "Portal":
        console.log("Congratulations,You Made It Through The Dungeons");
        continueGame = false;
                  break;

    }
    gameLoop();
    return;

  }

    
  }

  LookAround(Room) {
    if (RoomNo == 0) {
      console.log("You Are In The Entrance");
    }
    if (RoomNo == 1) {
      console.log("You Are In The Hallway");
    }
    if (RoomNo == 2) {
      console.log("You Are In The Chamber");
    }
    if (RoomNo == 3) {
      console.log("You Are In The The Portal");
    }
    gameLoop();
  }

  async Attack() {

    const initialActionChoices = [
      { title: "Small Sewer Rat", value: "Rat" },
      { title: "Giant Monster Dragon", value: "Dragon" },

  ];
  const response = await prompts({
      type: "select",
      name: "value",
      message: "Choose your action",
      choices: initialActionChoices
    });

    switch(response.value) {
        case "Rat":
          if(RatStatus==false)
          {
            console.log("Enemy Already Dead");
          }
          else
          {
            console.log("You Bravely Attack Small Sewer Rat With Your Sword");
            let Probability=Math.random()*100;
            if (Probability<P1.chance) {
              SewerRat.hitpoints -= P1.attackdamagepts;
              if (SewerRat.hitpoints == 0) {
                console.log("Enemy Eliminated");
                RatStatus=false;
              }
            }
            else
            {
              console.log("Player Missed The Target");
            }
          }
          
         
         break;
         case "Dragon":
            if(DragonStatus==false)
            {
              console.log("Enemy Already Dead");
            }
            else
            {
              console.log("You Bravely Attack Monster Dragon With Your Sword");
              let Probability=Math.random()*100;
              if (Probability < P1.chance) {
                GiantDragon.hitpoints -= P1.attackdamagepts;
                if (GiantDragon.hitpoints == 0) {
                  console.log("Enemy Eliminated");
                  DragonStatus=false;
                }
              }
            else
            {
              console.log("Player Missed The Target");
            }
            }
          
         
         break;
      }
      gameLoop();
  return;

  }
}

let P1 = new Player(10, 2, 75);
//Objects Of Class Room
let Entrance = new Room(1);
let Hallway = new Room(2);
let Chamber = new Room(3);
let Portal = new Room(4);

//The Object For The Player
//Enemy Objects

class Enemy extends Player {
  constructor(hitpoints, attackdamagepts, chance) {
    super(hitpoints, attackdamagepts, chance);
    this.hitpoints = hitpoints;
    this.attackdamagepts = attackdamagepts;
    this.chance = chance;

  }

  Attack() {
    if (RoomNo == 1) {
      console.log("You See A Small Sewer Rat");
      console.log("Small Sewer Rat Attacks Players With Its Sharp Claws");
      let Probability=Math.random()*100;
      if (Probability<SewerRat.chance) {
        P1.hitpoints -= SewerRat.attackdamagepts;
        if (P1.hitpoints == 0) {
          console.log("Player Has 0 Hit Points");
        }
      } else {
        console.log("Small Sewer Rat Attack Misses!");
      }
    }
    if (RoomNo==2) {
      console.log("You See A Giant Dragon");
      console.log("Giant Dragon Attacks Player With Its Claws");
      let Probability=Math.random()*100;

      if (Probability<GiantDragon.chance) {
        P1.hitpoints -= GiantDragon.attackdamagepts;
        if (P1.hitpoints == 0) {
          console.log("Player Hit Points Are 0");
          console.log("You Lose!");
        }
        console.log("Giant Dragon Hits Player With 8 Points");
        console.log(
          "Player Is Hit And " + P1.hitpoints + " Hitpoints Are Remaining"
        );
      }
    }
  }
}

let SewerRat = new Enemy(2, 1, 50);
let GiantDragon = new Enemy(4, 8, 90);

async function gameLoop() {

  
  // Example set of UI options for the user to select
  const initialActionChoices = [
    { title: "Look Around", value: "LookAround" },
    { title: "Go To Room", value: "GoToRoom" },
    { title: "Attack", value: "AttackEnemy" },
    { title: "Exit game", value: "exit" },
  ];

  // Show the list of options for the user.
  // The execution does not proceed from here until the user selects an option.
  const response = await prompts({
    type: "select",
    name: "value",
    message: "Choose your action",
    choices: initialActionChoices,
  });

  // Deal with the selected value
  console.log("You selected " + response.value);
  switch (response.value) {
    case "LookAround":
      P1.LookAround();
      break;

    case "GoToRoom":
     P1.MoveBetweenRooms();
      break;

    case "AttackEnemy":
     P1.Attack();
      
      
      
      break;

    case "exit":
      continueGame = false;
      break;
  }


}

process.stdout.write("\033c"); // clear screen on windows

console.log("WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!");
console.log("================================================");
console.log("You walk down the stairs to the dungeons");
gameLoop();