/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class EssenceUserActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
    //Quick Reference this.system for readablity
    const  data = this.system;
    // Check we are actually using a character sheet, ignore otherwise | Gonna go comment-heavy to help Dan and Beef, remove comments if you wish
    if (this.type==="character") {
      // Tables listing uses required to reach the next tier
      const usesActive = [1,2,3,4,5,6,7,8,9,10,11];
      const usesPassive = [1,1,1,1,1,2,2,2,2,5];
      const scumUsesActive = [1,2,3,3,4,5,6,6,7,9];
      const scumUsesPassive = [1,1,1,1,1,2,2,2,2,4];
      const special = [1,1,1,1,1,1,1,1,1,1,0];
      // Transform 1D array above into 2D Array for ease of use later
      const uses = [usesActive,usesPassive,scumUsesActive,scumUsesPassive,special];
      // Array for 20 Abilities, [Note! The template wasn't uploaded, so to be filled in, pseudocode for now]
      const abilities = [Ability1,Ability2,Ability2,Ability3,Ability4,Ability5,Ability6,Ability7,Ability8,Ability9,Ability10,Ability11,Ability12,Ability13,Ability14,Ability15,Ability16,Ability17,Ability18,Ability19,Ability20];
      //For loop, to loop through all 20 abilities, i represent the ability number here
      for(let i = 0;i<abilites.length;i++) {
        //quickly checks amount of capped abilities, for use in equations later
        var Capped = 0;
	      
	//Ignore for loop if capped is already 3 or higher
        for(let z = 0;z<abilites.length;z++) {
          //breaks if capped abilities are greater than or equal to 3, and sets it to 3
	  if(Capped>3 || Capped==3){
            Capped=3;
            break;
	  }
          //Totals capped abilities
          if(abilities[i].capped==1) { Capped++; }
        }
	      
        //ability type input for array use later
        var type = 0;
        //Check type of ability, through convoluted if statements (Can use some work)
        if(abilities[i].type=="Active" ||  abilities[i].type=="Reactive"){type=0;
        }else if(abilities[i].type=="Passive"){type=1;
        }else if(abilities[i].type=="!Active" || abilities[i].type=="!Reactive" ){type=2;
        }else if(abilities[i].type=="!Passive"){type=3;     
        }else{type=4;}
	      
        //preference uses of abilities for quick use later(Probably not needed, but makes it more readable)
        var totalUses=Math.floor(abilites[i].tu);
        //variable for looping through the level of ability
        var level = 1;
	      
        // While loop, goes through and levels up abilities, while total uses are greater than or equal to the requirement for the next tier
        while(totalUses==uses[type][level-1] || totalUses>uses[type][level-1]){
          //breaks the while loop if the level gets too high.
          if(level>9){break;}
          //if Capped is greater than 0 and level equals 9(Ability tier 10) gives bonus uses from capped.
          if(Capped>0 && level==9){total uses+=Capped;}
          //subtract the tier-up cost from totalUses, 
          totalUses-=uses[t][x-1]
          //increases abilities tier
          abilities[i].value=x+1;
          //Sets display of requirement to next tier to capped if TotalUses is Not a Number or if the ability is capped.
          if(isNaN(totalUses/uses[type][level]) || (Math.round((totalUses/uses[type][level])*100))>99){
            abilities[i].next="(Capped)";
            abilities[i].value++;
            abilities[i].capped=1;
          }
        //Sets capped to null if next does not equal (Capped)
 	if(abilities[i].next=="(Capped)"){abilities[i].capped=0}
        }
	      
        //sets abilities with 0 or "" use to tier 1
        if((Math.floor(abilites[i].tu)==0 || Math.floor(abilites[i].tu)=="") && abilites[i].type!=""){abilites[i].value=1;}
        //End For Loop & Character check
      }
    }
  
    //Grab stats as array=
    const stats = [data.power,data.speed,data.spirit,data.recovery];
    //Calculate Rank
    data.rank.value=(((Number(data.power.value)+Number(data.speed.value)+Number(data.spirit.value)+Number(data.recovery.value))/4) ^ 0);
    data.rank.max = Math.ceil(data.rank.value/10);
    //Force update from Unranked to Iron.
    if((data.rank.value*4)>3 && (data.rank.value*4)<16 ){data.rank.max=1}
    //Array of Names corresponding to rank
    const ranks = ["Unranked","Iron","Bronze","Silver","Gold","Diamond"];
    //variable to track if stats reached peak, and if statement to check for that
    var peakTest = false; 
    //Loop through stats for below
    for (let i = 0; i < stats.length; i++) {
      //Why/how this works, I can't tell you quickly or at a galance, but it does, so don't question it
      if(((((stats[i].value ^ 0)-1)%10)==0 || (((stats[i].value ^ 0)-2)%10)==0) && (stats[i].value-data.rank.max*10)>0){
      data.rank.max++
      peakTest=true
    }
    //Setup display for stats (Why is it that the 'display to person' part of the sheet has the most complicated code?)
    stats[i].display = ""+ranks[Number(data.rank.max)]+" "+((Number(stats[i].value))-(data.rank.max-1)*10 ^ 0)
    //Force apply correct value for Unranked and Between Iron 1&2
    if((stats[i].value*5)==0){stats[i].display="Unranked"
    }else if((stats[i].value*5)==1){stats[i].display="Iron 1 - (0%)"
    }else if((stats[i].value*5)==2){stats[i].display="Iron 1 - (0%)"
    }else if((stats[i].value*5)==3){stats[i].display="Iron 1 - (0%)"
    }else if((stats[i].value*5)==4){stats[i].display="Iron 1 - (0%)"}
    //Override if peak tested true
    if(peakTest){
      peakTest=false;
      data.rank.max--
      stats[i].display=stats[i].display+" - (Capped)"
    }else{stats[i].display=stats[i].display+" - ("+(((Number(stats[i].value)%1)*100) ^ 0)+"%)"}
      //Finally, set stat value to whole number.
      stats[i].value=Math.floor(stats[i].value)
    }
    //Health Calc, Not breaking any of the below down, do it yourself xD
    data.health.max=Math.floor(((Math.floor(Number(data.spirit.value))*(3+Number(data.rank.max)))+Number(10)+Number(temp)+Number(data.rank.max)*Number(10)+(Math.floor(Number(data.recovery.value))*(6+Number(data.rank.max)))+data.health.mod)*data.health.mult)
    //Low AC Calc
    data.ac.value=5+Math.floor(data.power.value)+data.ac.modl;
    //High AC Calc
    data.ac.max=15+Math.floor(data.power.value)+Math.floor(data.speed.value)-9*data.rank.max+data.ac.modh;
    //Movespeed Calc
    data.movespeed.value=(Math.floor(data.speed.value/5)*Math.min((10+5*Math.floor((data.skills.acrobatics/data.rank.max)/2)),20)+data.movespeed.mod)*data.movespeed.mult
    //Movespeed override for 0 Speed
    if(data.movespeed.value==0){data.movespeed.value=(5+data.movespeed.mod)*data.movespeed.mult}
    //Mana recovery Calc
    data.recovery.mana.value=Math.round(((0.1+data.rank.max/20)*Math.floor(data.recovery.value)+data.recovery.mana.mod)*data.recovery.mana.mult*100)/100
    //Stamina recovery Calc
    data.recovery.stamina.value=Math.round(((0.1+data.rank.max/20)*Math.floor(data.recovery.value)+data.recovery.stamina.mod)*data.recovery.stamina.mult*100)/100
    //Health recovery Calc
    data.recovery.health.value=Math.round(((data.rank.max/50)*Math.floor(data.recovery.value)+data.recovery.health.mod)*data.recovery.health.mult*1000)/1000
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.boilerplate || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareMonsterData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier using d20 rules.
      ability.mod = Math.floor((ability.value - 10) / 2);
    }
  }

  /**
   * Prepare Monster type specific data.
   */
  _prepareMonsterData(actorData) {
    if (actorData.type !== 'monster') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    // systemData.xp = (systemData.cr * systemData.cr) * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getMonsterRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getMonsterRollData(data) {
    if (this.type !== 'monster') return;

    // Process additional NPC data here.
  }

}
