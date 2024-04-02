export default class Utils {
  static getNextInList(value: number, array: number[]) {
    const next = array.indexOf(value) + 1;
    return array[next];
  }

  static getPrevInList(value: number, array: number[]) {
    const prev = array.indexOf(value) - 1;
    return array[prev];
  }
}
