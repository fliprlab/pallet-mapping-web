interface IGetActiveState {
  matchPath?: string;
  location: string;
  match: boolean;
}

export const getActiveState = ({
  matchPath,
  location,
  match,
}: IGetActiveState) => {
  if (matchPath) {
    return matchPath === location ? true : false;
  } else {
    return match;
  }
};
