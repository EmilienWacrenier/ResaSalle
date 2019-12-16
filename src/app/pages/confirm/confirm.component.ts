import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  token : string;

  constructor(private activatedRoute: ActivatedRoute, private confirmAccountService: ConfirmService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token
      console.log(this.token);
    });
    this.confirmAccount(this.token);
  }

  confirmAccount(token) {
    this.confirmAccountService
    .setToken(token)
    .subscribe(data => this.handleSuccess(data), error => this.handleError(error))
  }

  handleSuccess(data) {
    console.log('La confirmation du compte a faite avec succès', data);
  }

  handleError(error) {
    console.error('Il n\'arrive pas à envoyé la donnée au back', error);
  }
}
