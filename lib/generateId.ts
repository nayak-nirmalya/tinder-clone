const generateId = (id1: string, id2: string) =>
  id1 > id2 ? id1 + id2 : id2 + id1;

export default generateId;
