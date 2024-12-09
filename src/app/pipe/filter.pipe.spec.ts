import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all items if no filter is provided', () => {
    const notes = [
      { title: 'Note 1', description: 'Description of note 1' },
      { title: 'Note 2', description: 'Description of note 2' },
    ];
    expect(pipe.transform(notes, '')).toEqual(notes);
  });

  it('should return filtered items based on title', () => {
    const notes = [
      { title: 'Note 1', description: 'Description of note 1' },
      { title: 'Note 2', description: 'Description of note 2' },
    ];
    const filteredNotes = pipe.transform(notes, 'Note 1');
    expect(filteredNotes.length).toBe(1);
    expect(filteredNotes[0].title).toBe('Note 1');
  });

  it('should return filtered items based on description', () => {
    const notes = [
      { title: 'Note 1', description: 'Description of note 1' },
      { title: 'Note 2', description: 'Description of note 2' },
    ];
    const filteredNotes = pipe.transform(notes, 'Description of note 2');
    expect(filteredNotes.length).toBe(1);
    expect(filteredNotes[0].description).toBe('Description of note 2');
  });

  it('should return an empty array if no matches are found', () => {
    const notes = [
      { title: 'Note 1', description: 'Description of note 1' },
      { title: 'Note 2', description: 'Description of note 2' },
    ];
    const filteredNotes = pipe.transform(notes, 'non-existing');
    expect(filteredNotes.length).toBe(0);
  });

  it('should be case-insensitive', () => {
    const notes = [
      { title: 'Note 1', description: 'Description of note 1' },
      { title: 'Note 2', description: 'Description of note 2' },
    ];
    const filteredNotes = pipe.transform(notes, 'note 1');
    expect(filteredNotes.length).toBe(1);
    expect(filteredNotes[0].title).toBe('Note 1');
  });
});
