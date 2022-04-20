import * as React from "react";
import styled from "styled-components";

const StyledPlayerManager = styled.div`
  width: 400px;
`;

export interface PlayerManagerProps {
  playerNames: string[];
  addPlayer: (playerName: string) => void;
  removePlayer: (playerName: string) => void;
}

export const PlayerManager: React.FunctionComponent<PlayerManagerProps> = ({
  playerNames,
  addPlayer,
  removePlayer,
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  function onAddPlayer() {
    setInputValue("");
    addPlayer(inputValue);
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onAddPlayer();
  }

  return (
    <StyledPlayerManager>
      <form onSubmit={handleSubmit}>
        <label>
          New player name:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
      </form>
      <button onClick={onAddPlayer}>add player</button>
      {playerNames?.map((player) => (
        <div>
          {player}
          <button onClick={() => removePlayer(player)}>x</button>
        </div>
      ))}
    </StyledPlayerManager>
  );
};
