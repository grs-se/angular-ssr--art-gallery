export interface CategoryToCreate {
  id?: number;
  name?: string;
  description?: string;
}

export class MetadataFormValues implements CategoryToCreate {
  id? = 1;
  name? = '';
  description? = '';

  constructor(init?: MetadataFormValues) {
    Object.assign(this, init);
  }
}
