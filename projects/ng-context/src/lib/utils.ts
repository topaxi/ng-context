export const byName = <T>(name: T) => (o: { name: T }) => o.name === name;
