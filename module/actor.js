/**
 * Extend the base data.actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {data.actor}
 */
export class Essence_UserActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
    //Quick Reference this.system for readablity
    let  data = this.system;
    // Check we are actually using a character sheet, ignore otherwise | Gonna go comment-heavy to help Dan and Beef, remove comments if you wish
    if (this.type==="character") {
      // Tables listing uses required to reach the next tier
      let usesActive = [1,2,3,4,5,6,7,8,9,10,11];
      let usesPassive = [1,1,1,1,1,2,2,2,2,5];
      let scumUsesActive = [1,2,3,3,4,5,6,6,7,9];
      let scumUsesPassive = [1,1,1,1,1,2,2,2,2,4];
      let special = [1,1,1,1,1,1,1,1,1,1,0];
      // Transform 1D array above into 2D data.array for ease of use later
      const uses = [usesActive,usesPassive,scumUsesActive,scumUsesPassive,special];
      // data.array for 20 data.abilities, [Note! The template wasn't uploaded, so to be filled in, pseudocode for now]
      const abilities = [data.abilities.ability1,data.abilities.ability2,data.abilities.ability2,data.abilities.ability3,data.abilities.ability4,data.abilities.ability5,data.abilities.ability6,data.abilities.ability7,data.abilities.ability8,data.abilities.ability9,data.abilities.ability10,data.abilities.ability11,data.abilities.ability12,data.abilities.ability13,data.abilities.ability14,data.abilities.ability15,data.abilities.ability16,data.abilities.ability17,data.abilities.ability18,data.abilities.ability19,data.abilities.ability20];
      //For loop, to loop through all 20 abilities, i represent the ability number here
      for(let i = 0;i<abilities.length;i++) {
        //quickly checks amount of capped abilities, for use in equations later
        var Capped = 0;
	      
	//Ignore for loop if capped is already 3 or higher
        for(let z = 0;z<abilities.length;z++) {
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
        var totalUses=Math.floor(abilities[i].tu);
        //variable for looping through the level of ability
        var level = 1;
        // While loop, goes through and levels up abilities, while total uses are greater than or equal to the requirement for the next tier
        while(totalUses==uses[type][level-1] || totalUses>uses[type][level-1]){
          //breaks the while loop if the level gets too high.
          if(level>9){break;}
          //if Capped is greater than 0 and level equals 9(data.abilities.ability tier 10) gives bonus uses from capped.
          if(Capped>0 && level==9){totalUses+=Capped;}
          //subtract the tier-up cost from totalUses, 
          totalUses-=uses[type][level-1];
          //increases abilities tier
          abilities[i].value=level+1;
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
        if((Math.floor(abilities[i].tu)==0 || Math.floor(abilities[i].tu)=="") && abilities[i].type!=""){abilities[i].value=1;}
        //End For Loop & Character check
      }
    }
    //Grab stats as array
    const stats = [data.stats.power,data.stats.speed,data.stats.spirit,data.stats.recovery];
    //Calculate Rank
    data.rank.value=(((Number(stats[0].value)+Number(stats[1].value)+Number(stats[2].value)+Number(stats[3].value))/4) ^ 0);
    data.rank.max = Math.ceil(data.rank.value/10);
    //Force update from Unranked to Iron.
    if((data.rank.value*4)>3 && (data.rank.value*4)<16 ){data.rank.max=1}
    //data.array of Names corresponding to rank
    let ranks = ["Unranked","Iron","Bronze","Silver","Gold","Diamond"];
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
    data.health.max=Math.floor(((Math.floor(Number(stats[2].value))*(3+Number(data.rank.max)))+Number(10)+Number(data.rank.max)*Number(10)+(Math.floor(Number(stats[3].value))*(6+Number(data.rank.max)))+data.health.mod)*data.health.mult)
    //Low data.aC Calc
    data.ac.value=5+Math.floor(stats[0].value)+data.ac.low_mod;
    //High data.aC Calc
    data.ac.max=15+Math.floor(stats[0].value)+Math.floor(stats[1].value)-9*data.rank.max+data.ac.high_mod;
    //Movespeed Calc
    data.movespeed.value=(Math.floor(stats[1].value/5)*Math.min((10+5*Math.floor((data.skills.acrobatics/data.rank.max)/2)),20)+data.movespeed.mod)*data.movespeed.mult
    //Movespeed override for 0 Speed
    if(data.movespeed.value==0){data.movespeed.value=(5+data.movespeed.mod)*data.movespeed.mult}
	///Set movespeed to min if less.
	if(data.movespeed.min>data.movespeed.value){data.movespeed.value=data.movespeed.min;}
    //Mana recovery Calc
    data.recovery.mana.value=Math.round(((0.1+data.rank.max/20)*Math.floor(data.recovery.value)+data.recovery.mana.mod)*data.recovery.mana.mult*100)/100
    //Stamina recovery Calc
    data.recovery.stamina.value=Math.round(((0.1+data.rank.max/20)*Math.floor(data.recovery.value)+data.recovery.stamina.mod)*data.recovery.stamina.mult*100)/100
    //Health recovery Calc
    data.recovery.health.value=Math.round(((data.rank.max/50)*Math.floor(data.recovery.value)+data.recovery.health.mod)*data.recovery.health.mult*1000)/1000
	
	//Bar Adjustments for sheet
	data.health.bar=(data.health.value/data.health.max)*100
	data.stamina.bar=(data.stamina.value/data.stamina.max)*100
	data.mana.bar=(data.mana.value/data.mana.max)*100
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * data.augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    let actorData = this;
    let systemData = actorData.system;
    let flags = actorData.flags.boilerplate || {};

    // Make separate methods for each data.actor type (character, npc, etc.) to keep
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
    let systemData = actorData.system;

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
    let systemData = actorData.system;
    // systemData.xp = (systemData.cr * systemData.cr) * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    let data = super.getRollData();

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

    // data.add level for easier access, or fall back to 0.
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
