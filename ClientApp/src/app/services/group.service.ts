export class GroupService{
  static groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K) : any
  {
    return list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);
  }
}
