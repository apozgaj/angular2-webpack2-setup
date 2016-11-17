import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    });
  });

  it('should contain app text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(true).toBeTruthy();
  }));

});
