import { readFile, writeFile } from 'fs/promises';

export class MenuRepository {
  async findOne(id: string) {
    const menu = await readFile('./menu.json', 'utf-8');
    const response = JSON.parse(menu);

    return response[id];
  }

  async findAll() {
    const menu = await readFile('./menu.json', 'utf-8');
    const response = JSON.parse(menu);

    return response;
  }

  async create(menu: string) {
    const menuList = await readFile('./menu.json', 'utf-8');
    const response = JSON.parse(menuList);

    const id = Math.random().toString(36).substr(2, 9);
    response[id] = { id, menu };

    return writeFile('./menu.json', JSON.stringify(response, null, 2));
  }
}
