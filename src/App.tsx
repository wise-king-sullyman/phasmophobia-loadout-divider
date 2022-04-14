import React from "react";
import "./App.css";

import { player, PlayerList } from "./components/PlayerList";

import equipmentData, { equipment } from "./data/equipmentImporter";
import loadouts from "./data/loadoutImporter";

function App() {
  const [players, setPlayers] = React.useState<player[]>([
    { name: "austin", assignedItems: [], assignedCost: 0 },
    { name: "tyree", assignedItems: [], assignedCost: 0 },
    { name: "joseph", assignedItems: [], assignedCost: 0 },
    { name: "jonathan", assignedItems: [], assignedCost: 0 },
  ]);

  const defaultLoadout = loadouts[0].equipment;

  function itemTotalCost(item: equipment) {
    return item.cost * defaultLoadout[item.name];
  }

  function assignEquipment(
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

  React.useEffect(() => {
    const playersWithItemsAssigned = equipmentData.reduce((acc, item) => {
      acc.sort((a, b) => a.assignedCost - b.assignedCost);
      return assignEquipment(item, acc[0], acc);
    }, players);

    setPlayers(playersWithItemsAssigned);
  }, []);

  return (
    <div className="App">
      <PlayerList players={players} />
    </div>
  );
}

export default App;
