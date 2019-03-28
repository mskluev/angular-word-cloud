import { NgModule } from '@angular/core';
import { ExampleNg6LibComponent } from './example-ng6-lib.component';
import { FooComponent } from './foo/foo.component';
import { WorldCloudComponent } from './world-cloud/world-cloud.component';

@NgModule({
    declarations: [ExampleNg6LibComponent, FooComponent, WorldCloudComponent],
    imports: [],
    exports: [ExampleNg6LibComponent, FooComponent, WorldCloudComponent]
})
export class ExampleNg6LibModule {}
