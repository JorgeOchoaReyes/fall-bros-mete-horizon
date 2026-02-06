import { Component, PropTypes, CodeBlockEvents, Player, Entity } from 'horizon/core';

class ExitQueue extends Component<typeof ExitQueue> {
  static propsDefinition = {
    tpSfx: { type: PropTypes.Entity },
  };

  override preStart() {
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.onPlayerEnterTrigger(player)
    );
  }

  override start() {
    
  }

  private async onPlayerEnterTrigger(player: Player) { 
    let playerStatus = (this.world.persistentStorageWorld.getWorldVariable('GameManager:player_status') as {[key: string]: string}) || {};

    if(!playerStatus || typeof playerStatus !== 'object') {
      console.warn(`Player status data is missing or invalid. Initializing new player status object.`);
    }

    const playerId = player.id;

    const curPlayerStatus = playerStatus?.[playerId];

    if (curPlayerStatus === 'playing') {
      console.log(`Player ${player.name.get()} already has a status: ${curPlayerStatus}.`);
      return;
    }
    playerStatus[playerId] = 'dequeued'; 
    const results = await this.world.persistentStorageWorld.setWorldVariableAcrossAllInstancesAsync('GameManager:player_status', playerStatus);
    console.log(`Set player ${player.name.get()} status to 'queued' across all instances. Results:`, results); 
  }
}

Component.register(ExitQueue);