import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { Web3service }        from '../../providers/web3service/web3service';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import moment from 'moment';

import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import  { ViewaddressmodalPage } from '../viewaddressmodal/viewaddressmodal';
import { SharedlistsPage } from '../sharedlists/sharedlists';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SqliteProvider,Web3service]
})
export class HomePage {

  observable:Observable<String>;
  observer:Observer<String>;
  private subject = new Subject<any>();
  
  constructor(
    public navCtrl: NavController,
    public sq:SqliteProvider,
    public web3:Web3service,
    public alertCtrl:AlertController,
    public modalCtrl: ModalController,
    public toastCtrl:ToastController
  ) {

    // console.warn(this.web3.get());

    //to create contract for user address this.web3.contractcreate('contract.sol','0x65De584139871151d17Ec6A70619eBd6cD50E3e7','0xe7eef1e341f69c5120a89a4df3ba1c3f66360a4eeeb99c228ab80b460e75505a');//"Hello Console!"//4326456255760057600642401462415876547643681 secure
    //this.web3.contractcreate('contract.sol','0x65De584139871151d17Ec6A70619eBd6cD50E3e7','0xe7eef1e341f69c5120a89a4df3ba1c3f66360a4eeeb99c228ab80b460e75505a');//"Hello Console!"//4326456255760057600642401462415876547643681 secure
    
  }

  ionViewDidLoad(){
    // this.sq.getTodoListTable().then(
    //   (res)=>{
    //     res = JSON.stringify(res);
    //     alert(res);
    //   },
    //   (err)=>{
    //     alert("err:"+JSON.stringify(err));
    //   }
    // );

    // this.web3.atestPromise()
    // .then(res=>{
    //   console.log(res);
    // },fail=>{
    //   console.error(fail);
    // })
    // .catch(d=>{
    //   console.warn(d);
    // });

    //this.observerFun();
    this.sq.getListOfTables().then(
      (d)=>{console.log(d)},
      (e)=>{console.log(e)}
    ).catch(e=>{console.log(e)});
  }

  observerFun() {
    this.observable = new Observable((observer:Observer<string>)=>{
      this.observer = observer;
    });
    this.observable.subscribe(this.handleData,this.handleError,this.handleComplete);
    this.observer.next('2');
    this.observer.next('3');
    this.observer.next('4');
    this.observer.complete();
    this.observer.next('6');
    this.observer.complete();
  }
  handleData(data) {
    // console.log("data\n"+JSON.stringify(data));
  }
  handleError() {
    // console.log("error");
  }
  handleComplete() {
    // console.log("complete");
  }

  myaddress() {
    const pModal = this.modalCtrl.create(ViewaddressmodalPage,{
      user:'u1',
      address:'ah'
    });
    pModal.present();
  }

  sharedetails() {
    this.alertCtrl.create({
      title:'Enter contract address',
      inputs:[
        {
          name:'contractaddress',
          placeholder:'Type contract address'
        },
        {
          name:'uniqueaddress',
          placeholder:'Type unique key address'
        },
      ],
      buttons:[
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let contract = data.contractaddress;
            let unique = data.uniqueaddress;
            if(contract=="" || contract==null){
              this.toastCtrl.create({
                message:'Both address field is required',
                duration:1500,
                position:'top'
              }).present();
            }else{
              //console.log(data.contractaddress+"\n"+data.uniqueaddress);
              this.web3.saveShareDetails(data);
            }
          }
        }
      ]
    }).present();
  }

  sharedlists(){
    this.navCtrl.setRoot(SharedlistsPage,{
      user:'u11',
      address:'asdf'
    });
  }
}
