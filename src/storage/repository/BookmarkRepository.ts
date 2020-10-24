import { v4 as uuidv4 } from "uuid";
import { Bookmark } from "@/storage/entity/Bookmark";
import { StorageHelper } from "./StorageHelper";

const tableKey = "bookmark";

class BookmarkRepository {
  private readonly storageHelper: StorageHelper<Bookmark>;

  constructor() {
    this.storageHelper = new StorageHelper(tableKey);
  }

  /**
   * 追加します。
   * @param entity
   */
  public async add(entity: Bookmark) {
    entity.id = uuidv4();

    const records = await this.storageHelper.extract();
    records.push(entity);

    await this.storageHelper.persist(records);
  }

  /**
   * IDを指定して取得します。
   * @param id
   */
  async findById(id: string) {
    const records = await this.storageHelper.extract();
    return records.find((x) => x.id === id);
  }

  /**
   * 全件取得します。
   */
  async findAll() {
    return await this.storageHelper.extract();
  }

  /**
   * idを指定して削除します。
   * @param id
   */
  async deleteById(id: string) {
    const records = await this.storageHelper.extract();
    let index = -1;

    for (let i = 0; i < records.length; i++) {
      if (records[i].id === id) {
        index = i;
        break;
      }
    }

    if (index < 0) {
      return;
    }

    records.splice(index, 1);
    await this.storageHelper.persist(records);
  }
}

export { BookmarkRepository };
