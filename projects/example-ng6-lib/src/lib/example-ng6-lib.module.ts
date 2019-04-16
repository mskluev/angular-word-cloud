import { NgModule } from '@angular/core';
import { ExampleNg6LibComponent } from './example-ng6-lib.component';
import { FooComponent } from './foo/foo.component';
import { WorldCloudComponent } from './world-cloud/world-cloud.component';
import { ForceGraphComponent } from './force-graph/force-graph.component';

@NgModule({
    declarations: [ExampleNg6LibComponent, FooComponent, WorldCloudComponent, ForceGraphComponent],
    imports: [],
    exports: [ExampleNg6LibComponent, FooComponent, WorldCloudComponent, ForceGraphComponent]
})
export class ExampleNg6LibModule {}
