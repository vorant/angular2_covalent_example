import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdLoadingService, TdMediaService } from '@covalent/core';


import { GithubRepository } from '../github-repository.class';
import { GithubUser } from '../github-user.class';
import { GithubContributor } from '../github-contributor.class';
import { GithubIssue } from '../github-issue.class';
import { GithubService } from '../../../services';

@Component({
  selector: 'qs-github-repository',
  templateUrl: 'github-repository.component.html',
  styleUrls: ['github-repository.component.scss']
})
export class GithubRepositoryComponent implements OnInit, AfterViewInit {
  repository: GithubRepository;
  contributors: GithubContributor[];
  issues: GithubIssue[];
  forks: any[];

  view: any[] = [100, 400];

  colorSchemeDark: any = {
    domain: ['#5E35B1', '#0277BD', '#00695C', '#558B2F', '#9E9D24'],
  };


  constructor(
    private _route: ActivatedRoute,
    private _githubService: GithubService,
    private _loadingService: TdLoadingService,
    public media: TdMediaService
  ) {

  }

  ngOnInit(){}

  ngAfterViewInit() {
    this.media.broadcast();

    this._loadingService.register('loader');
    this._loadingService.register('contributors');
    this._loadingService.register('issues');

    this._route.params.subscribe((params: {repository: string, user: string}) => {
      this.showRepository(params.user, params.repository);
      this.showContributors(params.user, params.repository);
      this.showIssues(params.user, params.repository);
    });
  }

  showRepository(user: string, repository:string):void {
    this._githubService.getRepository(user, repository).subscribe(
      (repository:GithubRepository) => {
        this.repository = repository;

        this.forks = [{
            name: 'Forks',
            value: repository.forks,
          },
          {
            name: 'Open Issues',
            value: repository.open_issues,
          },
          {
            name: 'Watchers',
            value: repository.watchers_count,
          },
          {
            name: 'Subscribers',
            value: repository.subscribers_count,
          }];

        this._loadingService.resolve('loader');
      },
      error => {}
    )
  }

  showContributors(user: string, repository:string):void {
    this._githubService.getContributors(user, repository).subscribe(
      (contributors:GithubContributor[]) => {
        this.contributors = contributors;

        this._loadingService.resolve('contributors');
      },
      error => {}
    )
  }


  showIssues(user: string, repository:string):void {
    this._githubService.getIssues(user, repository).subscribe(
      (issues:GithubIssue[]) => {
        this.issues = issues;

        this._loadingService.resolve('issues');
      },
      error => {}
    )
  }

}
