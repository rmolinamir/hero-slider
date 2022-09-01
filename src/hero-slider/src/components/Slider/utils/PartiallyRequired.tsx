export type PartiallyRequired<
  Type,
  UnrequiredKey extends keyof Type
> = Required<Omit<Type, UnrequiredKey>> & Pick<Type, UnrequiredKey>;
