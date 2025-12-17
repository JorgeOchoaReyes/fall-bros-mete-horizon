import { CodeBlockEvents, Component, Entity, Player } from 'horizon/core';

class Velocity_Amp extends Component<typeof Velocity_Amp>{
  static propsDefinition = {
    ampSpeed: { type: 'number', default: 4.5 },
  };

  private playersAmped: Set<number> = new Set();

  private ampDefaultSpeed: number = 4.5; 

  preStart() {
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, this.OnPlayerEnterTrigger.bind(this));
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerExitTrigger, this.OnPlayerLeaveTrigger.bind(this));
    this.ampDefaultSpeed = this.props.ampSpeed;
  }

  start() {

  }

  OnPlayerEnterTrigger(player: Player) { 
    if (!this.playersAmped.has(player.id)) {
      this.playersAmped.add(player.id);
      this.setAmpedSpeed(player);
    }
  }

  OnPlayerLeaveTrigger(player: Player) { 
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
Component.register(Velocity_Amp);