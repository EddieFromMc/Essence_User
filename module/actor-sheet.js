/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class Essence_UserActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["Essence_User", "sheet", "actor"],
      template: "systems/Essence_User/templates/actor-sheet.html",
      width: 1000,
      height: 1000,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
    });
  }

  /** @override */
  get template() {
    return `systems/Essence_User/templates/actor-${this.actor.data.type}-sheet.html`;
  }
}