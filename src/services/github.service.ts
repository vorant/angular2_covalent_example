import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {
  GITHUB_USER_API,
  GITHUB_USER_REPOSITORIES_API,
  GITHUB_REPO_CONTRIBUTORS_API,
  GITHUB_REPO_API,
  GITHUB_REPO_ISSUES
} from '../config/api.config';

import { GithubUser } from '../app/github-statistic/github-user.class';
import { GithubRepository } from '../app/github-statistic/github-repository.class';
import { GithubContributor } from '../app/github-statistic/github-contributor.class';
import { GithubIssue } from '../app/github-statistic/github-issue.class';

@Injectable()
export class GithubService {
  private githubUsers: string[] = [
    'jquery',
    'angular',
    'facebook',
    'twitter',
    'VKCOM',
    'twbs',
    'johnpapa',
    'd3',
    'lodash',
    'backbone',
    'Airbnb',
  ];

  constructor(private _http: Http,
              ) {}


  getUser (userName:string): Observable<GithubUser> {
    const url = GITHUB_USER_API.replace(':user', userName);

    return this._http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUsers():Observable<GithubUser> {
    let observableList:Observable<GithubUser>[] = [];

    this.githubUsers.forEach((userName:string) => {
      observableList.push(this.getUser(userName));
    });

    return Observable.merge(...observableList);
  }

  getRepositories(userName:string): Observable<GithubRepository[]> {
    const url = GITHUB_USER_REPOSITORIES_API.replace(':user', userName);

    return this._http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRepository(userName:string, repositoryName:string): Observable<GithubRepository> {
    const url = GITHUB_REPO_API.replace(':user', userName).replace(':repo', repositoryName);

    return this._http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getContributors(userName:string, repositoryName:string): Observable<GithubContributor[]> {
    const url = GITHUB_REPO_CONTRIBUTORS_API.replace(':user', userName).replace(':repo', repositoryName);

    return this._http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getIssues(userName:string, repositoryName:string): Observable<GithubIssue[]> {
    const url = GITHUB_REPO_ISSUES.replace(':user', userName).replace(':repo', repositoryName);

    return this._http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
