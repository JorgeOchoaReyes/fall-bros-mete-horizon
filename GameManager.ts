import * as hz from 'horizon/core';

class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {};

  

  start() {
     this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, (player: hz.Player) => {

     });
     this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerExitTrigger, (player: hz.Player) => {
       this.onPlayerExit(player);
     });
  }

  onPlayerExit(player: hz.Player) {
    this.world.persistentStorage.setPlayerVariable(player, 'GameManager:player_status', 'dequeued');
  }
}
hz.Component.register(GameManager);