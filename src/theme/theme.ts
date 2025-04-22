
export interface AppTheme {
  colors: {
    header: string;
    aside: string;
    main: string;
  };
}

export const lightTheme: AppTheme = {
  colors: {
    header: '#83C5BE',
    aside: '#006D77',
    main: '#FFDDD2',
  }
};

export const darkTheme: AppTheme = {
  colors: {
    header: '#3C3836',
    aside: '#504945',
    main: '#FBF1C7',     
  }
}; 