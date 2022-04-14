import loadoutsFile from "./loadouts.json";

export interface loadout {
  name: string,
  equipment: { [name: string]: number };
}

const loadouts = loadoutsFile.map((loadout: loadout) => loadout);

export default loadouts;
