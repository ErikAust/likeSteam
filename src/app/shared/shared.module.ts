import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import { SearchActionPipe } from './pipes/search-action.pipe';
import { SearchPricePipe } from './pipes/search-price.pipe';

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot()
    ],
    exports: [HttpClientModule, QuillModule, SearchActionPipe, SearchPricePipe],
    declarations: [SearchActionPipe, SearchPricePipe]
})
export class SharedModule {
}
