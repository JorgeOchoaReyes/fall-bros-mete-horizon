import { CodeBlockEvents, Component, Entity, Player } from 'horizon/core';

class Charm extends Component<typeof Charm> {
  static propsDefinition = {
    ampSpeed: { type: 'number', default: 4.5 },
  };

  private playersAmped: Set<number> = new Set();

  private ampDefaultSpeed: number = 4.5; 

  preStart() {
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnGrabStart, this.OnPlayerEnterTrigger.bind(this));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnGrabEnd, this.OnPlayerLeaveTrigger.bind(this));
    this.ampDefaultSpeed = this.props.ampSpeed;
  }

  start() {

  }

  private OnPlayerEnterTrigger(r: boolean, player: Player) { 
    if (!this.playersAmped.has(player.id)) {
      this.playersAmped.add(player.id);
      this.setAmpedSpeed(player);
    }
  }

  private OnPlayerLeaveTrigger(player: Player) { 
    if (this.playersAmped.has(player.id)) {
      this.playersAmped.delete(player.id);
      this.setDefaultPhysics(player);
    }
  }
 

  private setAmpedSpeed(player: Player) { 
    player.locomotionSpeed.set(this.ampDefaultSpeed);
    console.log(`Player ${player.name.get()} started skating.`);
  }

  private setDefaultPhysics(player: Player) { 
    player.locomotionSpeed.set(4.5);
    console.log(`Player ${player.name.get()} stopped skating.`);
  }
}
Component.register(Charm);