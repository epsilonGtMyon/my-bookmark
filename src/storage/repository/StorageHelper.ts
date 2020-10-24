import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

/**
 * ストレージのヘルパー
 */
class StorageHelper<T> {
  private readonly tableKey: string;

  constructor(tableKey: string) {
    this.tableKey = tableKey;
  }

  /**
   * 全部取り出す
   */
  public async extract() {
    const jsonString = (await Storage.get({ key: this.tableKey }))?.value;
    if (jsonString == null) {
      return [];
    }
    return JSON.parse(jsonString) as T[];
  }

  /**
   * 永続化
   * @param records
   */
  public async persist(records: T[]) {
    if (records.length === 0) {
      await Storage.remove({ key: this.tableKey });
      return;
    }

    await Storage.set({
      key: this.tableKey,
      value: JSON.stringify(records),
    });
  }
}

export { StorageHelper };
