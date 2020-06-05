# multi-range-slider
slider component for Angular 2+

# Motivating use-case
I needed a slider that could be used to choose choose a list of probabilities that always add up to 1.  
I could have used a text input or slider for each probability and link it up so that changing one would
update the others, but that's a fairly clunky interaction.   This approach isn't perfect, but I think
it's better...


## Installation

To add the slider to your Angular project:
```
npm install --save multi-range-slider
```

Once installed, add the slider to your `app.module.ts`:
```typescript
import { MultiRangeSliderModule } from 'multi-range-slider';

...

@NgModule({
   ...
   imports: [
     ...
     MultiRangeSliderModule,
    ...
   ],
   ...
})
export class AppModule {}
```

## Sample usage

Now you can use the slider component in your app components, for example in `app.component.ts`:
```typescript


@Component({...})
export class AppComponent {
  count = 5;
  variants = [];
  public colors: any = ['#d8d8d8', '#83db8e', '#30d6c5', '#81bbe4',
                        '#869bcc', '#d69dce', '#bd78a2', '#c66561',
                        '#c66561', '#f2ad47', '#ffd54f'];

  ngOnInit() {
    for(let i = 0; i < this.count; i++){
        this.variants.push({value : 100/this.count});
    }
  }
}
```

And in template file `app.component.html`:
```html
<app-multi-range-slider [variants]="variants" [prop]="'value'" [colorList]="colors"></app-multi-range-slider>

<div *ngFor="let variant of variants; let i = index;">
 Variant {{i+1}} : &nbsp; {{variant.value}}%
</div>
```

## Sample App to test
```
ng serve multiRangeSliderTest
```

# Demo

[Demo Link](https://stackblitz.com/edit/angular-tpwn5x)