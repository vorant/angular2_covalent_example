import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdLoadingService, TdMediaService } from '@covalent/core';

import { GithubRepository } from '../github-repository.class';
import { GithubUser } from '../github-user.class';
import { GithubService } from '../../../services';

@Component({
  selector: 'qs-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.scss']
})
export class GithubUserComponent implements OnInit, AfterViewInit {

  githubRepositories: GithubRepository[];

  constructor(
    private _route: ActivatedRoute,
    private _githubService: GithubService,
    private _loadingService: TdLoadingService,
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this._route.params.subscribe((params: {user: string}) => {
      this._loadingService.register('lloader');
      this.githubRepositories = [];
      this.showRepositories(params.user);
    });
  }

  showRepositories(login: string):void {

    this._githubService.getRepositories(login).subscribe(
      (repositories: GithubRepository[] ) => {
        this.githubRepositories = repositories;


        setTimeout(()=>{
          this._loadingService.resolve('lloader');
        }, 1000);

      },
      (error: Error) => {

      }
    )
  }

}
