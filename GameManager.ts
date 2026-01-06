import * as hz from 'horizon/core';

class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {};

  

  start() {
     this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, (player: hz.Player) => {
       this.onPlayerEnter(player);
     });
  }

  onPlayerEnter(player: hz.Player) {
    
  }
}
hz.Component.register(GameManager);