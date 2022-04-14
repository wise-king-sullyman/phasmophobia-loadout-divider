import * as React from "react";

import { equipment } from "../data/equipmentImporter";
import loadouts from "../data/loadoutImporter";

export interface player {
  name: string;
  assignedItems: equipment[];
  assignedCost: number;
}

export interface PlayerListProps {
  players: player[];
}

export const PlayerList: React.FunctionComponent<PlayerListProps> = ({
  players,
}: PlayerListProps) => {
  const defaultLoadout = loadouts[0].equipment;

  return (
    <div>
      {players.map((player) => (
        <div key={player.name}>
          <h2>{player.name}</h2>
          <ul>
            {player.assignedItems.map((item) => {
              return (
                defaultLoadout[item.name] && (
                  <li key={item.name}>
                    {item.name}: {defaultLoadout[item.name]}
                  </li>
                )
              );
            })}
          </ul>
          <p>Total cost: {player.assignedCost}</p>
        </div>
      ))}
    </div>
  );
};
