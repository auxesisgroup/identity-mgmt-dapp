import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PanelTables } from './paneltables';

@NgModule({
  declarations: [
    PanelTables,
  ],
  imports: [
    IonicPageModule.forChild(PanelTables),
  ],
})
export class PanelTablesPageModule {}
