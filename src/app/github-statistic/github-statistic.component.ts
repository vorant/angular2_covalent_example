import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { TdLoadingService, TdMediaService } from '@covalent/core';
import { Router, ActivatedRoute } from '@angular/router';


import { ItemsService, UsersService, ProductsService, GithubService } from '../../services';

import { GithubUser } from './github-user.class';
import { GithubRepository } from './github-repository.class';

@Component({
  selector: 'qs-github-statistic',
  templateUrl: './github-statistic.component.html',
  styleUrls: ['./github-statistic.component.scss'],
  viewProviders: [ ItemsService, UsersService, ProductsService, GithubService ],
})
export class GithubStatisticComponent implements OnInit, AfterViewInit {

  githubUsers: GithubUser[] = [];

  constructor(private _titleService: Title,
              private _githubService: GithubService,
              public media: TdMediaService) {

  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this._titleService.setTitle( 'Github repositories' );

    this._githubService.getUsers().subscribe(
      (user: GithubUser ) => {
        this.githubUsers.push(user);
      },
      (error: Error) => {

      }
    )
  }

  ngOnInit(): void {

  }


}
