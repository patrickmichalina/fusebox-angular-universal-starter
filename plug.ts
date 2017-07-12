// import * as fb from 'fuse-box/core/file';

export class TestPluginClass  {
  public test: RegExp = /app-routing.module.ts/;

  constructor() { 
    console.log('started');
  };
  public transform(file: any) {
    console.log('trasnform@!!!!!');
    file.loadContents();
    file.contents = file.contents.replace(/loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm, 'asdasdasdasdasdad');
  }
  transformGroup?(file: File): any {
      console.log('group');
  }

}

export const TestPlugin = () => new TestPluginClass();
