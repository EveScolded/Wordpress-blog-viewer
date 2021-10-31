export interface WordpressPost {
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded: {
    "wp:featuredmedia": {
      media_details: {
        sizes: {
          full: {
            source_url: string;
          };
        };
      };
    }[];
  };
}
