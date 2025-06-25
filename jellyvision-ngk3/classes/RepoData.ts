export enum repoEvent {
  "CommitCommentEvent" = "CommitCommentEvent",
  "IssueCommentEvent" = "IssueCommentEvent",
  "PullRequestEvent" = "PullRequestEvent",
  "PullRequestReviewEvent" = "PullRequestReviewEvent",
  "PullRequestReviewCommentEvent" = "PullRequestReviewCommentEvent",
  "PullRequestReviewThreadEvent" = "PullRequestReviewThreadEvent",
  "PushEvent" = "PushEvent"
}

export type repoEventType = `${repoEvent}`;

export class RepoData {
  repoId: string;
  repoName: string;
  owner: boolean;
  recentEvents: Map<repoEventType, number>;

  constructor(repoId: string, repoName: string, owner: boolean) {
    this.repoId = repoId;
    this.repoName = repoName;
    this.owner = owner;
    this.recentEvents = new Map();
  }

  addEvent(eventType: repoEventType) {
    !this.recentEvents.has(eventType) && this.recentEvents.set(eventType, 0);
    const eventVal: number | undefined = this.recentEvents.get(eventType);
    if (eventVal !== undefined) {
      this.recentEvents.set(eventType, eventVal + 1);
    }
  }

  getTopFrequencies(topFreq: number): repoEventType[][] {
    const topFrequencies: number[] = Array.from(this.recentEvents.values()).sort((a, b) => b - a);

    const returningRepoEvents: repoEventType[][] = [];
    for (let i = 0; i < topFrequencies.length && i < topFreq; i++) {
      const currFreq: number = topFrequencies[0];
      const currEvents: repoEventType[] = [];
      for (const reEve of Object.values(repoEvent)) {
        if (this.recentEvents.get(reEve) === currFreq) {
          currEvents.push(reEve);
        }
      }
      currEvents.sort();
      returningRepoEvents.push(currEvents);
    }

    return returningRepoEvents;
  }
}