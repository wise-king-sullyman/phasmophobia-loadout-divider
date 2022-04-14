import equipmentFile from "./equipment.json";

export interface equipment {
  name: string;
  cost: number;
  defaultQuantity: number;
  maxQuantity: number;
}

const equipmentData = equipmentFile.map((item: equipment) => item);

export default equipmentData;
