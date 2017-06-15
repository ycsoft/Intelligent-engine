import { Injectable } from '@angular/core';
import { ResourceParams, Resource, ResourceAction, ResourceMethod } from 'ngx-resource';
import { Result } from 'app/beans/result';
import { RestClient } from 'app/services/rest-client.service';

@Injectable()
@ResourceParams({
  url: '/search'
})
export class SearchService extends RestClient {

  @ResourceAction({
    path: '/?keywords={!keywords}'
  })
  search: ResourceMethod<{ keywords: any }, Result>;
}
