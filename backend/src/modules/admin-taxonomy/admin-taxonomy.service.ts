import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { LmsGroup } from '../../entity/LmsGroup';
import { Taxonomy } from '../../entity/Taxonomy';
import { AddTaxonomyDto, FetchTaxonomyDto } from './admin-taxonomy.dto';
import { Tools } from '../../common/tools/tools';
import { Group } from '../../entity/Group';

@Injectable()
export class TaxonomyService {
  entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly tools: Tools,
  ) { }

  public async createTaxonomy(taxonomyData: AddTaxonomyDto, currentUser): Promise<HttpStatus> {
    try {
      await this.connection.transaction(async (transactionalEntityManager) => {
        const { metaData, currentLmsGroupId } = taxonomyData;

        await this.tools.checkLmsAdminToUpdateLmsGroup(currentUser, currentLmsGroupId);
        await this.checkLmsGroupExisting(currentLmsGroupId);

        const taxonomiesByLms = await this.connection
          .getRepository(Taxonomy)
          .createQueryBuilder('taxonomy')
          .leftJoin('taxonomy.lmsGroup', 'lmsGroup')
          .where('lmsGroup.id = :id', { id: currentLmsGroupId })
          .getMany()

        const lmsGroup = new LmsGroup({ id: currentLmsGroupId })

        if (!taxonomiesByLms.length) {
          const taxonomiesWithLms = metaData.map(item => ({ ...item, lmsGroup }))
          const newTaxonomies = taxonomiesWithLms.map(item => new Taxonomy(item));
          await this.entityManager.save(newTaxonomies);

          return;
        }

        const taxonomiesForCreate = metaData.filter(item => !item.id)
        const taxonomiesForEdit = metaData.filter(item => taxonomiesByLms.find(taxonomy => taxonomy.id === item.id));
        const taxonomiesForDelete = taxonomiesByLms.filter(({ id: id1 }) => !metaData.some(({ id: id2 }) => id2 === id1));

        const newTaxonomiesForCreate = taxonomiesForCreate.map(item => new Taxonomy({ ...item, lmsGroup }));

        await transactionalEntityManager.save(newTaxonomiesForCreate);
        if (taxonomiesForDelete.length) { await transactionalEntityManager.delete(Taxonomy, taxonomiesForDelete); }
        if (taxonomiesForEdit.length) { await transactionalEntityManager.save(Taxonomy, taxonomiesForEdit); }
      });

      return HttpStatus.CREATED;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async getTaxonomy(query: FetchTaxonomyDto, currentUser): Promise<Taxonomy[]> {
    try {
      const { lmsGroupId, groupId } = query;

      if (lmsGroupId) {
        await this.tools.checkLmsAdminToUpdateLmsGroup(currentUser, lmsGroupId);
        await this.checkLmsGroupExisting(lmsGroupId);

        return this.connection
          .getRepository(Taxonomy)
          .createQueryBuilder('taxonomy')
          .leftJoin('taxonomy.lmsGroup', 'lmsGroup')
          .where('lmsGroup.id = :id', { id: lmsGroupId })
          .getMany()
      }

      if (!lmsGroupId && groupId) {
        const group = await this.connection
          .getRepository(Group)
          .createQueryBuilder('groups')
          .innerJoinAndSelect('groups.organisation', 'organisation')
          .innerJoinAndSelect('organisation.lmsGroup', 'lmsGroup')
          .where('groups.id = :id', { id: groupId })
          .getOne()

        const { lmsGroup } = group.organisation;

        return this.connection
          .getRepository(Taxonomy)
          .createQueryBuilder('taxonomy')
          .leftJoin('taxonomy.lmsGroup', 'lmsGroup')
          .where('lmsGroup.id = :id', { id: lmsGroup.id })
          .getMany()
      }

    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async checkLmsGroupExisting(lmsGroupId: number) {
    const lmsGroup = await this.connection
      .getRepository(LmsGroup)
      .createQueryBuilder('lmsGroup')
      .where('lmsGroup.id = :id', { id: lmsGroupId })
      .getOne()

    if (!lmsGroup) {
      throw new NotFoundException('LMS group is not found');
    }
  }

}