// Import sheet code
import { Essence_UserActor } from "./actor.js";
// Import sheet
import { Essence_UserActorSheet } from "./actor-sheet.js";
// Import Other
// Nothing for now

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */
Hooks.once("init", async function() {
  console.log(`Initializing Essence User`);
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.Essence_User = {
    Essence_UserActor
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d10 + @spirit.value",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = Essence_UserActor;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("Essence_User", Essence_UserActorSheet, { makeDefault: true });
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", function() {
  // Include steps that need to happen after Foundry has fully loaded here.
});