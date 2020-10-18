import { v4 as uuidv4 } from "uuid";
import { Plugins } from "@capacitor/core";
import { Bookmark } from "@/storage/entity/Bookmark";

const { Storage } = Plugins;
const tableKey = "bookmark";

class BookmarkRepository {
  /**
   * 追加します。
   * @param entity
   */
  public async add(entity: Bookmark) {
    entity.id = uuidv4();

    const records = await this.extract<Bookmark>();
    records.push(entity);

    await this.persist<Bookmark>(records);
  }

  /**
   * IDを指定して取得します。
   * @param id
   */
  async findById(id: string) {
    const records = await this.extract<Bookmark>();
    return records.find((x) => x.id === id);
  }

  /**
   * 全件取得します。
   */
  async findAll() {
    return await this.extract<Bookmark>();
  }

  //---------------------------

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
