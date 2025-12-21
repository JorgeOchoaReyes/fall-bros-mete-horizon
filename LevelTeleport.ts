import * as hz from 'horizon/core';

class LevelTeleport extends hz.Component<typeof LevelTeleport>{  
  static propsDefinition = {
    teleportTo: { type: hz.PropTypes.Entity }, 
    tpSfx: { type: hz.PropTypes.Entity },
  };

  private playerCheckpoints: Map<number, hz.SpawnPointGizmo> = new Map();

  start() { 
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, (player: hz.Player) => {
      this.onPlayerEnter(player);
    });
  }

  onPlayerEnter(player: hz.Player) { 
    if (this.props.teleportTo) {
      const sound = this.props.tpSfx?.as(hz.AudioGizmo);
      if (sound) {
        sound.play({
          fade: 0,
          players: [player],
        });
      }
      const checkpoint = this.props.teleportTo?.as(hz.SpawnPointGizmo)!;
      this.playerCheckpoints.set(player.id, checkpoint); 
      this.props.teleportTo?.as(hz.SpawnPointGizmo).teleportPlayer(player);
    }
  }

}

hz.Component.register(LevelTeleport);