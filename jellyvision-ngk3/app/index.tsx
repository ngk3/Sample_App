import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { fetchUserContributions } from '../services/github';
import TableComponent from '@/components/Table';
import { RepoData } from '../classes/RepoData';
import ResponsiveInput from '@/components/ResponsiveInput';

const userRepoColumns = [
  "Repository Name",
  "Commits",
  "Issue Comments",
  "PR",
  "PR Review",
  "PR Review Comment",
  "PR Review Thread",
  "Push Event",
  "Most Freq"
]

const userDataTranslation = {
  "Repository Name": (data: RepoData) =>
    data.repoName,
  "Commits": (data: RepoData) => data.recentEvents.get("CommitCommentEvent"),
  "Issue Comments": (data: RepoData) => data.recentEvents.get("IssueCommentEvent"),
  "PR": (data: RepoData) => data.recentEvents.get("PullRequestEvent"),
  "PR Review": (data: RepoData) => data.recentEvents.get("PullRequestReviewEvent"),
  "PR Review Comment": (data: RepoData) => data.recentEvents.get("PullRequestReviewCommentEvent"),
  "PR Review Thread": (data: RepoData) => data.recentEvents.get("PullRequestReviewThreadEvent"),
  "Push Event": (data: RepoData) => data.recentEvents.get("PushEvent"),
  "Most Freq": (data: RepoData) => data.getTopFrequencies(3)
}

export default function UserRepoScreen() {
  const [user, setUser] = useState('ge0ffrey');
  const [userContributionInfo, setUserContributionInfo] = useState<RepoData[]>();

  async function updateUserContributions() {
    if (user) {
      const userContributions = await fetchUserContributions(user);
      const repoData: Map<string, RepoData> = new Map();

      for (const uc of userContributions) {
        const repoId = uc.repo.id;
        const repoName = uc.repo.name;
        !repoData.has(repoId) && repoData.set(repoId, new RepoData(repoId, repoName));

        const foundRepoData = repoData.get(repoId);
        if (foundRepoData) {
          foundRepoData.addEvent(uc.type);
        }
      }

      setUserContributionInfo(Array.from(repoData.values()));
    }
  };

  return (
    <View>
      <View>
        <ResponsiveInput placeholder='Enter Github User' value={user} onChangeText={val => setUser(val)} onSubmitEditing={updateUserContributions} />
        <View style={style.btn}>
          <Button title="Search" onPress={updateUserContributions} />
        </View>
      </View>

      <TableComponent
        columns={userRepoColumns}
        data={userContributionInfo}
        display={userDataTranslation}
      />
    </View>
  )
}

const style = StyleSheet.create({
  btn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 50,
  }
})