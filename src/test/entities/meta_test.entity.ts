import { Expose, Transform } from 'class-transformer';

export class Meta {
  @Expose()
  @Transform((e) => {
    if (e.value) {
      return e.value;
    } else {
      return null;
    }
  })
  key?: string;

  @Expose()
  @Transform((e) => {
    if (e.value) {
      return e.value;
    } else {
      return null;
    }
  })
  value?: string;
}
