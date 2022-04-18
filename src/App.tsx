import React from "react";
import "./App.css";

import { player, PlayerList } from "./components/PlayerList";
import { PlayerManager } from "./components/PlayerManager";

import equipmentData, { equipment } from "./data/equipmentImporter";
import loadouts from "./data/loadoutImporter";

function App() {
  const [players, setPlayers] = React.useState<player[]>([]);

  function addPlayer(playerName: string) {
    const newPlayer = {
      name: playerName,
      assignedItems: [],
      assignedCost: 0,
    };

    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  }

  function removePlayer(playerName: string) {
    const remainingPlayers = players.filter(
      (player) => player.name !== playerName
    );

    setPlayers(remainingPlayers);
  }

  function resetAssignment(players: player[]) {
    const resetPlayers = players.map((player) => {
      return {
        name: player.name,
        assignedItems: [],
        assignedCost: 0,
      };
    });

    return resetPlayers;
  }

  const defaultLoadout = loadouts[0].equipment;

  function itemTotalCost(item: equipment) {
    return item.cost * defaultLoadout[item.name];
  }

  function assignItem(
    item: equipment,
    targetPlayer: player,
    currentPlayers: player[]
  ) {
    if (!defaultLoadout[item.name]) {
      return currentPlayers;
    }

    const otherPlayers = currentPlayers.filter(
      (otherPlayer) => otherPlayer.name !== targetPlayer.name
    );

    const updatePlayer = currentPlayers.filter(
      (p) => p.name === targetPlayer.name
    );

    const newPlayer = {
      name: targetPlayer.name,
      assignedItems: [...updatePlayer[0].assignedItems, item],
      assignedCost: updatePlayer[0].assignedCost + itemTotalCost(item),
    };

    return [...otherPlayers, newPlayer];
  }

  function assignItems() {
    const resetPlayers = resetAssignment(players);
    const playersWithItemsAssigned = equipmentData.reduce((acc, item) => {
      acc.sort((a, b) => a.assignedCost - b.assignedCost);
      return assignItem(item, acc[0], acc);
    }, resetPlayers as player[]);

    setPlayers(playersWithItemsAssigned);
  }

  return (
    <div className="App">
      <PlayerManager
        playerNames={players.map((player) => player.name)}
        addPlayer={addPlayer}
        removePlayer={removePlayer}
      />
      <button onClick={assignItems}>Assign Items</button>
      <PlayerList players={players} />
    </div>
  );
}

export default App;
