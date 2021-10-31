import { WordpressPost } from "../model/WordpressPost";

export default class Wordpress {
  domain;

  constructor(domain) {
    this.domain = domain;
  }

  public async getPosts(): Promise<WordpressPost[]> {
    const response = await fetch(this.domain + "/wp-json/wp/v2/posts?_embed");
    const posts = response.json();
    return posts;
  }
}
