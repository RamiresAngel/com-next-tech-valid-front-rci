import { CancelacionesModule } from './cancelaciones.module';

describe('CancelacionesModule', () => {
  let cancelacionesModule: CancelacionesModule;

  beforeEach(() => {
    cancelacionesModule = new CancelacionesModule();
  });

  it('should create an instance', () => {
    expect(cancelacionesModule).toBeTruthy();
  });
});
