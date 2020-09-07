import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [...materialModules, CommonModule],
  exports: materialModules,
})
export class MaterialModule {}
