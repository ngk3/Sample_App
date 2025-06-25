
/**
 * API call to fetch a specific user's Github contributions
 * @param user 
 * @returns 
 */
export async function fetchUserContributions(user: string) {
  //ge0ffrey
  try {
    const results = await fetch(
      `https://api.github.com/users/${user}/events/public`,
      {
        method: "GET",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const jsonResults = await results.json();
    return jsonResults;
  } catch (err) {
    //DevMode && console.error(err);
    throw new Error("Failed to fetch User Contributions");
  }
}

/**
 * API call to check the owner of a repository
 * @param user 
 * @param repo 
 * @returns 
 */
export async function checkOwnerRepository(user: string, repo: string) {
  try {
    const results = await fetch(
      `https://api.github.com/repos/${user}/${repo}`,
      {
        method: "GET",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const jsonResults = await results.json();
    return jsonResults;
  } catch (err) {
    throw new Error("Failed to check Repo Owner");
  }
}
