export const isHasProblem = (object: any): object is HasProblemInterface => {
  return !!object.problem;
};

export interface HasProblemInterface {
  problem: string;
}
