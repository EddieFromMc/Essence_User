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
	const rollData=this.actor.getRollData()
	context.effect1HTML = await TextEditor.enrichHTML(actorData.effect1, {secrets: this.document.isOwner,rollData,secrets: this.document.isOwner,async: !0})
	context.effect2HTML = await TextEditor.enrichHTML(actorData.effect2, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect3HTML = await TextEditor.enrichHTML(actorData.effect3, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect4HTML = await TextEditor.enrichHTML(actorData.effect4, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect5HTML = await TextEditor.enrichHTML(actorData.effect5, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect6HTML = await TextEditor.enrichHTML(actorData.effect6, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect7HTML = await TextEditor.enrichHTML(actorData.effect7, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect8HTML = await TextEditor.enrichHTML(actorData.effect8, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect8HTML = await TextEditor.enrichHTML(actorData.effect8, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect9HTML = await TextEditor.enrichHTML(actorData.effect9, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect10HTML = await TextEditor.enrichHTML(actorData.effect10, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect11HTML = await TextEditor.enrichHTML(actorData.effect11, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect12HTML = await TextEditor.enrichHTML(actorData.effect12, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect13HTML = await TextEditor.enrichHTML(actorData.effect13, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect14HTML = await TextEditor.enrichHTML(actorData.effect14, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect15HTML = await TextEditor.enrichHTML(actorData.effect15, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect16HTML = await TextEditor.enrichHTML(actorData.effect16, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect17HTML = await TextEditor.enrichHTML(actorData.effect17, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect18HTML = await TextEditor.enrichHTML(actorData.effect18, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect19HTML = await TextEditor.enrichHTML(actorData.effect19, {rollData,secrets: this.document.isOwner,async: !0})
	context.effect20HTML = await TextEditor.enrichHTML(actorData.effect20, {rollData,secrets: this.document.isOwner,async: !0})
	context.raceHTML = await TextEditor.enrichHTML(actorData.race, {rollData,secrets: this.document.isOwner,async: !0})
	context.knowelegeHTML = await TextEditor.enrichHTML(actorData.knowelege, {rollData,secrets: this.document.isOwner,async: !0})
	context.usernotesHTML = await TextEditor.enrichHTML(actorData.usernotes, {rollData,secrets: this.document.isOwner,async: !0})
    return context;
  }
    /* -------------------------------------------- */

  }