import { v4 as uuidv4 } from "uuid";
import { Plugins } from "@capacitor/core";
import { Bookmark } from "@/storage/entity/Bookmark";

const { Storage } = Plugins;
const tableKey = "bookmark";

class BookmarkRepository {
  public async add(entity: Bookmark) {
    entity.id = uuidv4();

    const records = await this.extract();
    records.push(entity);

    await this.persist(records);
  }

  private async extract<T>() {
    const jsonString = (await Storage.get({ key: tableKey }))?.value;
    if (jsonString == null) {
      return [];
    }
    return JSON.parse(jsonString) as T[];
  }

  private async persist<T>(records: T[]) {
    if (records.length === 0) {
      await Storage.remove({ key: tableKey });
      return;
    }

    await Storage.set({
      key: tableKey,
      value: JSON.stringify(records),
    });
  }
}

export { BookmarkRepository };
