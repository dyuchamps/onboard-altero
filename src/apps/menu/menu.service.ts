import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {
  menuRepo: MenuRepository;
  constructor() {
    this.menuRepo = new MenuRepository();
  }

  async findOne(id: string) {
    return this.menuRepo.findOne(id);
  }

  async findAll() {
    return this.menuRepo.findAll();
  }

  async create(menu: string) {
    return this.menuRepo.create(menu);
  }
}
