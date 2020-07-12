import { FASTElement, customElement, attr, html, observable, when, repeat } from '@microsoft/fast-element';
import { fetchRepoData, GitHubReposResponse, GitHubRepo } from './scripts/get-repo-data';

@customElement({ name: 'the-app', template: appTemplate })
export class App extends FASTElement {
  @attr heading: string = 'repos';
  @observable ready: boolean = false;
  @observable data: GitHubReposResponse;

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  async loadData() {
    const data = await fetchRepoData();
    this.data = data;
    console.log(data);
    this.ready = true;
  }
}

function repoTemplate(x: App) {
  return html<App>`
    ${repeat(x => x.data, html<GitHubRepo>`
      <p>${x => x.name}</p>
    `}
  `
} 