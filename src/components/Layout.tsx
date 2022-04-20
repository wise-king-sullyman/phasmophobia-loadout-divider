import * as React from "react";
import styled from "styled-components";

import equipmentData, { equipment } from "../data/equipmentImporter";
import loadouts from "../data/loadoutImporter";

import { player, PlayerList } from "./PlayerList";
import { PlayerManager } from "./PlayerManager";
import Button from "./Button";

const StyledLayout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export interface LayoutProps {

}

const Layout: React.FunctionComponent<LayoutProps> = () => {
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
    <StyledLayout>
      <PlayerManager
        playerNames={players.map((player) => player.name)}
        addPlayer={addPlayer}
        removePlayer={removePlayer}
      />
      <Button onClick={assignItems}>Assign Items</Button>
      <PlayerList players={players} />
    </StyledLayout>
  );
};

export default Layout;
