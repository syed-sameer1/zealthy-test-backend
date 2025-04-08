// seeder.service.ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentsEntity } from './modules/database/entities/components.entity';
import { PagesEntity } from './modules/database/entities/pages.entity';
import { PageComponentsEntity } from './modules/database/entities/pageComponents.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {

  constructor(
    @InjectRepository(ComponentsEntity)
    private readonly componentRepo: Repository<ComponentsEntity>,
    @InjectRepository(PagesEntity)
    private readonly pageRepo: Repository<PagesEntity>,
    @InjectRepository(PageComponentsEntity)
    private readonly pageComponentRepo: Repository<PageComponentsEntity>
  ) {}

  async onApplicationBootstrap() {
    await this.seedComponentsAndPages();
  }

  private async seedComponentsAndPages() {
    const existingComponents = await this.componentRepo.find();

    if (existingComponents.length > 0) {
      return;
    }

    const components = this.componentRepo.create([
      { name: 'about_me' },
      { name: 'address' },
      { name: 'birthdate' }
    ]);

    await this.componentRepo.save(components);

    const pages = this.pageRepo.create([
      { pageNumber: 2 },
      { pageNumber: 3 }
    ]);

    await this.pageRepo.save(pages);

    const savedPages = await this.pageRepo.find();
    const savedComponents = await this.componentRepo.find();

    const pageComponents = [
      {
        page: savedPages.find(p => p.pageNumber === 2),
        component: savedComponents.find(c => c.name === 'about_me')
      },
      {
        page: savedPages.find(p => p.pageNumber === 2),
        component: savedComponents.find(c => c.name === 'address')
      },
      {
        page: savedPages.find(p => p.pageNumber === 3),
        component: savedComponents.find(c => c.name === 'birthdate')
      }
    ];

    await this.pageComponentRepo.save(pageComponents);
  }
}
