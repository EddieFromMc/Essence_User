/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class Essence_UserActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["Essence_User", "sheet", "actor"],
      template: "systems/Essence_User/templates/actor-character-sheet.html",
      width: 1200,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
    });
  }

  /** @override */
  get template() {
    return `systems/Essence_User/templates/actor-${this.actor.type}-sheet.html`;
  }

/* -------------------------------------------- */

/** @override */
  async getData(options) {
	  
    const context = await super.getData(options);
    const actorData = context.data.system;
	context.rollData = context.actor.getRollData();
	context.effect1HTML = await TextEditor.enrichHTML(actorData.effect1, {secrets: this.document.isOwner,async: true})
	context.effect2HTML = await TextEditor.enrichHTML(actorData.effect2, {async: true})
	context.effect3HTML = await TextEditor.enrichHTML(actorData.effect3, {async: true})
	context.effect4HTML = await TextEditor.enrichHTML(actorData.effect4, {async: true})
	context.effect5HTML = await TextEditor.enrichHTML(actorData.effect5, {async: true})
	context.effect6HTML = await TextEditor.enrichHTML(actorData.effect6, {async: true})
	context.effect7HTML = await TextEditor.enrichHTML(actorData.effect7, {async: true})
	context.effect8HTML = await TextEditor.enrichHTML(actorData.effect8, {async: true})
	context.effect8HTML = await TextEditor.enrichHTML(actorData.effect8, {async: true})
	context.effect9HTML = await TextEditor.enrichHTML(actorData.effect9, {async: true})
	context.effect10HTML = await TextEditor.enrichHTML(actorData.effect10, {async: true})
	context.effect11HTML = await TextEditor.enrichHTML(actorData.effect11, {async: true})
	context.effect12HTML = await TextEditor.enrichHTML(actorData.effect12, {async: true})
	context.effect13HTML = await TextEditor.enrichHTML(actorData.effect13, {async: true})
	context.effect14HTML = await TextEditor.enrichHTML(actorData.effect14, {async: true})
	context.effect15HTML = await TextEditor.enrichHTML(actorData.effect15, {async: true})
	context.effect16HTML = await TextEditor.enrichHTML(actorData.effect16, {async: true})
	context.effect17HTML = await TextEditor.enrichHTML(actorData.effect17, {async: true})
	context.effect18HTML = await TextEditor.enrichHTML(actorData.effect18, {async: true})
	context.effect19HTML = await TextEditor.enrichHTML(actorData.effect19, {async: true})
	context.effect20HTML = await TextEditor.enrichHTML(actorData.effect20, {async: true})
	context.raceHTML = await TextEditor.enrichHTML(actorData.race, {async: true})
	context.knowelegeHTML = await TextEditor.enrichHTML(actorData.knowelege, {async: true})
	context.usernotesHTML = await TextEditor.enrichHTML(actorData.usernotes, {async: true})
    return context;
  }
    /* -------------------------------------------- */

  }